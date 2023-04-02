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

//use factors_methods::{MULTIPLY_ELF, MULTIPLY_ID};
// use risc0_zkvm::{
//     serde::{from_slice, to_vec},
//     Prover,
// };
use serde::{Deserialize, Serialize};

use risc0_zkvm::sha::{Impl, Sha256};



fn main() {

    let a: i8 = 0; // reputation change
    let b: [u8; 32] = Impl::hash_bytes(&[123]); // old nullifier
    let c: [u8; 32] = Impl::hash_bytes(&[1234]) // new commitment
    let d: u64 = 4; // old reputation score
    let e: [u8; 32] = Impl::hash_bytes(&[123]); // new nullifier

    // Multiply them inside the ZKP
    // First, we make the prover, loading the 'multiply' method
    let mut prover =
        Prover::new(MULTIPLY_ELF).expect("Prover should be constructed from valid ELF binary");

    prover.add_input_u32_slice(&to_vec(&a).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&b).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&c).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&d).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&e).expect("should be serializable"));


    // Run prover & generate receipt
    let receipt = prover.run().expect(
        "Code should be provable unless it had an error or exceeded the maximum cycle limit",
    );

    // Extract journal of receipt (i.e. output c, where c = a * b)
    // let c: u64 = from_slice(&receipt.journal).expect(
    //     "Journal output should deserialize into the same types (& order) that it was written",
    // );

    // Print an assertion
    //println!("I know the factors of {}, and I can prove it!", c);

    // Here is where one would send 'receipt' over the network...

    // Verify receipt, panic if it's wrong
    receipt.verify(&MULTIPLY_ID).expect(
        "Code you have proven should successfully verify; did you specify the correct image ID?",
    );
}
