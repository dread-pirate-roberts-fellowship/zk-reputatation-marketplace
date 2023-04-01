#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod marketplace {

    use ink::{
        env::{
            call::{build_call, Call, ExecutionInput, Selector},
            debug_println, CallFlags, DefaultEnvironment,
        },
        prelude::{collections::BTreeMap, string::String, vec::Vec, string::ToString},
        storage::{Lazy, Mapping},
        LangError,
    };

    #[ink(storage)]
    pub struct Marketplace {
        /// List of all users.
        users: Vec<UserProfile>,
        /// List of all assets.
        assets: Vec<Asset>,
        current_sale: Sale,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(Debug, scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Sale {
        status: String, //Write like an enum after 
        prize: u32,
        asset_id: u32,
        //seller_reputation - pending reputation to add in a way 
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(Debug, scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct UserProfile {
        account_id: AccountId, 
        reputation: u32,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(Debug, scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Asset {
        id: u32,
        account_owner: AccountId, // No direct account, can be offuscated
        name: String,
        description: Vec<u8>,
        purchasable: bool,
    }

    impl Marketplace {
        /// Constructor that initializes the marketplace
        #[ink(constructor)]
        pub fn new(assets_list: Vec<Asset>, users_list: Vec<UserProfile>, ) -> Self {
            let init_sale = Sale {
                status: "Closed".to_string(),
                prize: 0,
                asset_id : 10
            };
            let mk = Self {
                users: Vec::new(),
                assets: assets_list,
                current_sale: init_sale
            };
            mk
        }

        pub fn new_sale(mut self, asset_to_sell: Asset) -> Self {
            let new_sale = Sale {
                status: "OnGoing".to_string(),
                prize: 0,
                asset_id: asset_to_sell.id,
            };
            self.current_sale = new_sale;
            self
        }

        /// Modify Item on Sale 
        pub fn put_asset_on_sale(mut self, mut asset: Asset) -> Self  {
            if !asset.purchasable {
                asset.purchasable = true;
                let ongoing_sale = Sale {
                   status: "OnGoing".to_string(), 
                   prize: 0, 
                   asset_id: asset.id
                };
                self.current_sale = ongoing_sale;
                // Verify the proof of reputation
                // Put nft in the contract, and set the price
                // ybort abort if nullifier was spent
            }
            self
        }

        #[ink(message)]
        pub fn buy_asset(&mut self, asset: Asset, account: AccountId, price: u32) {
            // check balance of account, compare to price
            // transfer of the account Id to the asset
        }

        #[ink(message)]
        pub fn give_seller_review(&mut self, seller: AccountId, reputation_given: u32) {
            //TBD
        }

        #[ink(message)]
        pub fn update_seller_reputation(&mut self, sale: Sale, seller_account: AccountId) {
            //TBD
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let marketplace = Marketplace::default();
            assert_eq!(marketplace.get(), false);
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            let mut marketplace = Marketplace::new(false);
            assert_eq!(marketplace.get(), false);
            marketplace.flip();
            assert_eq!(marketplace.get(), true);
        }
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
