// TODO: Rename this file to change the name of this method from METHOD_NAME

#![no_main]
#![no_std]  // std support is experimental, but you can remove this to try it

extern crate alloc;

risc0_zkvm::guest::entry!(main);

use risc0_zkvm::guest::env;
use serde::{Deserialize, Serialize};
use alloc::vec::Vec;


type Hash = Vec<u8>;

/// Public journal values that will be committed by the image crop method.
#[derive(Debug, Serialize, Deserialize)]
pub struct Output {
    pub commitment: Vec<u8>,
    pub min_reputation: u64,
}



pub fn main() {
    // proof that a certain


    //public inputs
    let commitment: Hash = env::read();
    let min_reputation: u64 = env::read();

    //private inputs
    let p_key: Vec<u8> = env::read();
    let reputation_score: u64 = env::read();

    // check if commitment = public_key(p_key) + reputation score

    //check if the private key belongs to the public key
    if reputation_score < min_reputation{
        panic!("Reputation score too small")
    };


    let output = Output {
        commitment: commitment,
        min_reputation: min_reputation,
    };
    env::commit(&output);


}
