#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod marketplace {

    // TODO: use Poseidon2
    use risc0_zkvm::sha::{Digest, Impl, Sha256};

    use ink::{
        prelude::{collections::BTreeSet, string::String, vec::Vec},
        storage::Mapping,
        LangError,
    };

    use ink_risc0_verifier::InkRisc0VerifierRef;

    type ItemId = u32;
    type Reputation = u32;
    // type ReputationChange = i8;
    type Price = u128;
    type Nullifier = Vec<u8>;

    #[ink(storage)]
    pub struct Marketplace {
        items: Mapping<ItemId, Item>,
        // Only one open sale per account id is allowed.
        // The account ids are pseudonomous.
        ongoing_sales: Mapping<AccountId, Sale>,
        // A nullifier is a just a temp private key
        spent_nullifiers: Mapping<Nullifier, bool>,
        // Sellers commit to new nullifiers
        // Commitments are to hash(nullifier_new + reputation_score)
        commitments: BTreeSet<Hash>,
        last_item_id: ItemId,
        risc0_verifier_1: InkRisc0VerifierRef,
        risc0_verifier_2: InkRisc0VerifierRef,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(Debug, scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub enum SaleStatus {
        /// The sale has been opened.
        Open { price: Price },
        /// The item has been purchased, but no review published yet.
        FundsTransfered { buyer_id: AccountId },
        /// Item purchased, review published.
        Closed {
            // TODO: actually use encryption
            encrypted_reputation_change: Vec<u8>,
        },
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(Debug, scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Sale {
        item_id: ItemId,
        status: SaleStatus,
        seller_id: AccountId,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(Debug, scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Item {
        account_owner: AccountId, // Temporary address
        name: String,
        description: Vec<u8>,
    }

    /// Event emitted when an iten is put on sale
    #[ink(event)]
    pub struct ItemOnsale {
        seller_id: AccountId,
    }

    /// Event emitted when an iten is bought
    #[ink(event)]
    pub struct ItemBought {
        seller_id: AccountId,
    }

    // TODO
    const PROOF_1: [u32; 8] = [0; 8];
    const PROOF_2: [u32; 8] = [0; 8];

    impl Marketplace {
        /// Constructor that initializes the marketplace
        #[ink(constructor)]
        pub fn new(version: u32, ink_risc0_verifier_code_hash: Hash) -> Self {
            let total_balance = Self::env().balance();
            let salt = version.to_le_bytes();
            let risc0_verifier_1 = InkRisc0VerifierRef::new(PROOF_1)
                .endowment(total_balance / 4)
                .code_hash(ink_risc0_verifier_code_hash)
                .salt_bytes(salt)
                .instantiate();
            let risc0_verifier_2 = InkRisc0VerifierRef::new(PROOF_2)
                .endowment(total_balance / 4)
                .code_hash(ink_risc0_verifier_code_hash)
                .salt_bytes(salt)
                .instantiate();
            Self {
                items: Mapping::new(),
                ongoing_sales: Mapping::new(),
                spent_nullifiers: Mapping::new(),
                commitments: BTreeSet::new(),
                last_item_id: ItemId::default(),
                risc0_verifier_1,
                risc0_verifier_2,
            }
        }

        /// Register new seller
        #[ink(message)]
        pub fn register_seller(&mut self, nullifier: Nullifier) {
            // TODO: make nullifier private
            // zkProof that reputation_score in the
            // commitment (hash(nullifier + reputation_score))
            // is zero. And the commitment is constructed this way.
            let reputation = Reputation::default();
            let mut bytes = nullifier;
            bytes.extend(reputation.to_le_bytes());

            // TODO: extract the convertion into a util fn
            let boxed = Impl::hash_bytes(&bytes);
            let unboxed = *boxed;
            let as_array: [u8; 32] = unboxed.into();
            let as_hash: Hash = as_array.into();

            self.commitments.insert(as_hash);
        }

        /// Put new item on sale.
        #[ink(message)]
        pub fn put_item_on_sale(
            &mut self,
            item: Item,
            price: Price,
            zk_proof: [u32; 8],
        ) -> Result<ItemId, LangError> {
            let caller = self.env().caller();

            if self.ongoing_sales.get(&caller).is_some() {
                // TODO: proper error types
                return Err(LangError::CouldNotReadInput);
            }

            let _zk_proof = Digest::from(zk_proof);
            // TODO: verify zk_proof
            // abort if nullifier was spent

            let item_id = self.last_item_id;
            self.last_item_id += 1;

            let ongoing_sale = Sale {
                status: SaleStatus::Open { price },
                item_id,
                seller_id: caller,
            };

            self.ongoing_sales.insert(caller, &ongoing_sale);
            self.items.insert(item_id, &item);

            self.env().emit_event(ItemOnsale { seller_id: caller });
            Ok(item_id)
        }

        #[ink(message)]
        pub fn buy_item(&mut self, _item_id: ItemId) -> Result<(), LangError> {
            let caller = self.env().caller();
            // TODO: check balance of account
            // check the sale status
            self.env().emit_event(ItemBought { seller_id: caller });
            Ok(())
        }

        #[ink(message)]
        pub fn give_seller_review(
            &mut self,
            seller_id: AccountId,
            encrypted_reputation_change: Vec<u8>,
        ) -> Result<(), LangError> {
            let caller = self.env().caller();

            match self.ongoing_sales.get(&seller_id) {
                Some(mut sale) => match sale.status {
                    SaleStatus::FundsTransfered { buyer_id } if buyer_id == caller => {
                        sale.status = SaleStatus::Closed {
                            encrypted_reputation_change,
                        };
                        self.ongoing_sales.insert(seller_id, &sale);
                    }
                    _ => return Err(LangError::CouldNotReadInput),
                },
                _ => return Err(LangError::CouldNotReadInput),
            }

            self.env().emit_event(ItemBought { seller_id });
            Ok(())
        }

        #[ink(message)]
        pub fn update_seller_reputation(
            &mut self,
            _old_nullifier: Nullifier,
            new_commitment: Hash,
            review_proof: [u32; 8],
        ) -> Result<(), LangError> {
            let _review_proof = Digest::from(review_proof);

            // TODO: check review_proof using proof-2
            // Nullify the old commitment

            // TODO: Change the reputation

            self.commitments.insert(new_commitment);

            Ok(())
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        // #[ink::test]
        // fn it_works() {
        //     let mut _marketplace = Marketplace::new();
        //     // TODO
        // }
    }

    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    ///
    /// When running these you need to make sure that you:
    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    /// - Are running a Substrate node which contains `pallet-contracts` in the background
    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// A helper function used for calling contract messages.
        use ink_e2e::build_message;

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can upload and instantiate the contract using its default constructor.
        #[ink_e2e::test]
        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = MarketplaceRef::default();

            // When
            let contract_account_id = client
                .instantiate("marketplace", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.get());
            let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            Ok(())
        }

        /// We test that we can read and write a value from the on-chain contract contract.
        #[ink_e2e::test]
        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = MarketplaceRef::new(false);
            let contract_account_id = client
                .instantiate("marketplace", &ink_e2e::bob(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            let get = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            // When
            let flip = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.flip());
            let _flip_result = client
                .call(&ink_e2e::bob(), flip, 0, None)
                .await
                .expect("flip failed");

            // Then
            let get = build_message::<MarketplaceRef>(contract_account_id.clone())
                .call(|marketplace| marketplace.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
