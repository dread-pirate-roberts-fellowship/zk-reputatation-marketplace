#![no_main]
#![no_std]

use risc0_zkvm::guest::env;

risc0_zkvm::guest::entry!(main);
use risc0_zkvm::sha::{Impl, Sha256};

use serde::{Deserialize, Serialize};



type Hash = [u8; 32];
type Nullifier = Hash;
type Commitment = Hash;
type ReputationScore = u32;
type ReputationChange = i8;



#[derive(Debug, Serialize, Deserialize)]
pub struct Output {
    pub reputation_change: ReputationChange,
    pub old_nullifier: Nullifier,
    pub new_commitment: Commitment,
}


pub fn main() {
    // Public inputes:
    // For now reputation change is unencrypted
    let reputation_change: ReputationChange = env::read();
    let old_nullifier: Nullifier = env::read();
    let new_commitment: Commitment = env::read();

    // Private inputes:
    // For now no private key for decryption of reputation change
    let old_reputation_score: ReputationScore = env::read();
    let new_nullifier: Nullifier = env::read();
    let mut new_nullifier = new_nullifier.to_vec();

    let new_reputation_score = i64::from(old_reputation_score) + i64::from(reputation_change);
    if new_reputation_score > i64::from(u32::max_value()) {
        u32::max_value()
    } else {
        u32::try_from(new_reputation_score).unwrap_or(0)
    };

    new_nullifier.extend(new_reputation_score.to_le_bytes());

    let sha = Impl::hash_bytes(&new_nullifier.as_slice());

    if sha.as_bytes() != new_commitment.as_slice() {
        panic!("commitment not according to nullifier and rep_score")
    }

    let output = Output {
        reputation_change: reputation_change,
        old_nullifier: old_nullifier,
        new_commitment: new_commitment
    };

    env::commit(&output);

}
