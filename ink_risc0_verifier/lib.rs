#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod ink_risk0_verifier {
    use risc0_zkp::core::config::HashSuitePoseidon;
    use risc0_zkvm::Receipt;

    use scale::{Decode, Encode};
    use scale_info::{prelude::vec::Vec, TypeInfo};

    #[derive(Encode, Decode, PartialEq, Eq, Clone, TypeInfo)]
    pub enum Error {
        // Opaque error
        Invalid,
    }

    #[ink(storage)]
    pub struct InkRisk0Verifier {
        /// SHA-256 of the program binary
        image_id: [u32; 8],
    }

    impl InkRisk0Verifier {
        #[ink(constructor)]
        pub fn new(image_id: [u32; 8]) -> Self {
            Self { image_id }
        }

        #[ink(message)]
        pub fn verify_with_poseidon(&self, journal: Vec<u8>, seal: Vec<u32>) -> Result<(), Error> {
            Receipt::new(&journal, &seal)
                .verify_with_hash::<HashSuitePoseidon, _>(&self.image_id)
                .map_err(|_| Error::Invalid)
        }
    }

    // #[cfg(test)]
    // mod tests {
    //     /// Imports all the definitions from the outer scope so we can use them here.
    //     use factors_methods::{MULTIPLY_ELF, MULTIPLY_ID};
    //     use risc0_zkvm::{serde::to_vec, Prover};
    //     use super::*;

    //     /// We test a simple use case of our contract.
    //     #[ink::test]
    //     fn verify_password_checker() {
    //         let mut prover = Prover::new(MULTIPLY_ELF).unwrap();
    //         let a: u64 = 17;
    //         let b: u64 = 23;
    //         prover.add_input_u32_slice(&to_vec(&a).unwrap());
    //         prover.add_input_u32_slice(&to_vec(&b).unwrap());

    //         let receipt = prover.run().unwrap();
    //         let Receipt { journal, seal } = receipt;

    //         let ink_risk0_verifier = InkRisk0Verifier::new(MULTIPLY_ID.into());
    //         assert!(ink_risk0_verifier.verify_with_poseidon(journal, seal).is_ok());
    //     }
    // }
}
