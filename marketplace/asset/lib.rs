#![cfg_attr(not(feature = "std"), no_std)]

pub use self::asset::{
    Asset,
};

#[ink::contract]
pub mod asset {
    
    /// Asset to sale 
    #[ink(storage)]
    pub struct Asset {
        account_owner: AccountId, // No direct account, can be offuscated 
        price: u32,
        purchasable: bool
    }


    impl Asset {
        /// Initialize the asset
        #[ink(constructor)]
        pub fn new(account: AccountId) -> Self {
            Self { account_owner: account, price: 0, purchasable: true }
        }


        #[ink(message)]
        pub fn sell_asset(&mut self, new_account: AccountId, new_price: u32) {
            self.account_owner=new_account;
            self.price= new_price; 
            self.purchasable=false;
        }

    }

}
