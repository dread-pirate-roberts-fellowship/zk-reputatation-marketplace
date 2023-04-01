#![cfg_attr(not(feature = "std"), no_std)]


pub use self::user::{
    User,
};

#[ink::contract]
pub mod user {

    /// User Profile 
    #[ink(storage)]
    pub struct User {
        account_id: AccountId,
        reputation: u32, 
    }

    impl User {
        /// Initializes the user info
        #[ink(constructor)]
        pub fn new(user_account: AccountId) -> Self {
            Self { account_id: user_account, reputation: 5 }
        }


        /// Returns the current state.
        #[ink(message)]
        pub fn get_reputation(&self) -> u32 {
            self.reputation
        }
    }
}


