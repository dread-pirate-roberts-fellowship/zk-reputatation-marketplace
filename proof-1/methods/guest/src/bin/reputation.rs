#![no_main]
#![no_std]

extern crate alloc;

risc0_zkvm::guest::entry!(main);

use risc0_zkvm::guest::env;
use risc0_zkvm::sha::{Impl, Sha256};

use serde::{Deserialize, Serialize};
use alloc::vec::Vec;


/// TODO
#[derive(Debug, Serialize, Deserialize)]
pub struct Output {
    pub commitment: Vec<u8>,
    pub min_reputation: u32,
}

pub fn main() {
    // public inputs
    let commitment: Vec<u8> = env::read();
    let min_reputation: u32 = env::read();

    // private inputs
    let _p_key: Vec<u8>  = env::read();
    let mut nullifier: Vec<u8>  = env::read();
    let reputation_score: u32 = env::read();


    let mut x = reputation_score.to_le_bytes().to_vec();
    nullifier.append(&mut x);

    let sha = Impl::hash_bytes(&nullifier.as_slice());

    if sha.as_bytes() != commitment.as_slice() {
        panic!("commitment not according to nullifier and rep_score")
    }

    // TODO: check if the private key belongs to the public key

    if reputation_score < min_reputation {
        panic!("Reputation score too small")
    };

    // TODO check whether commitment part of the merkle tree

    let output = Output {
        commitment: commitment,
        min_reputation: min_reputation,
    };

    env::commit(&output);
}
