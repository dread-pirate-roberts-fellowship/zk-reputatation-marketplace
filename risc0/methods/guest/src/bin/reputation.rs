// TODO: Rename this file to change the name of this method from METHOD_NAME

#![no_main]
#![no_std]  // std support is experimental, but you can remove this to try it

extern crate alloc;

risc0_zkvm::guest::entry!(main);

use risc0_zkvm::guest::env;
use risc0_zkvm::sha::{Impl, Sha256};

use serde::{Deserialize, Serialize};
use alloc::{vec, vec::Vec};




/// Public journal values that will be committed by the image crop method.
#[derive(Debug, Serialize, Deserialize)]
pub struct Output {
    pub commitment: Vec<u8>,
    pub min_reputation: u64,
}



pub fn main() {
    // proof that a certain 


    //public inputs
    let commitment: Vec<u8> = env::read();
    let min_reputation: u64 = env::read();

    //private inputs
    let p_key: Vec<u8>  = env::read();
    let mut nullifier: Vec<u8>  = env::read();
    let reputation_score: u64 = env::read();

    let mut x = min_reputation.to_le_bytes().to_vec();
    x.append(&mut nullifier);

    let sha = Impl::hash_bytes(&x.as_slice());


    // check if commitment = hash(public_key(p_key) + reputation score)

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
