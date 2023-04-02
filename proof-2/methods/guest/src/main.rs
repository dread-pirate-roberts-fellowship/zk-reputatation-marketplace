// Copyright 2023 RISC Zero, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#![no_main]
#![no_std]

use risc0_zkvm::guest::env;

risc0_zkvm::guest::entry!(main);

type Hash = [u8; 32];
type Nullifier = Hash;
type Commitment = Hash;
type ReputationScore = u64;



/// Public journal values that will be committed by the image crop method.
#[derive(Debug, Serialize, Deserialize)]
pub struct Output {
    pub reputation_change: Vec<u8>,
    pub old_nullifier: u64,
    pub new_commitment: u64,
}


pub fn main() {
    // Public inputes:
    // For now reputation change is unencrypted
    let reputation_change: i8 = env::read();
    let old_nullifier: Nullifier = env::read();
    let new_commitment: Commitment = env::read();

    // Private inputes:
    // For now no private key for decryption of reputation change
    let old_reputation_score: ReputationScore = env::read();
    let new_nullifier: Nullifier = env::read();

    // TODO:
    // New reputation score = Old_reputation_score + decrypt(encrypted_reputation)
    let new_reputation_score = old_reputation_score + reputation_change;

    let mut x = new_reputation_score.to_le_bytes().to_vec();
    new_nullifier.append(&mut x);

    let sha = Impl::hash_bytes(&new_nullifier.as_slice());

    if sha.as_bytes() != new_commitment.as_slice() {
        panic!("commitment not according to nullifier and rep_score")
    }

    // commitment_new= hash(nullifier+new_reputation_score)
    todo!();
    env::commit(&42);
}
