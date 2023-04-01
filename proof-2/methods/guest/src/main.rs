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
    // commitment_new= hash(nullifier+new_reputation_score)
    todo!();
    env::commit(&42);
}
