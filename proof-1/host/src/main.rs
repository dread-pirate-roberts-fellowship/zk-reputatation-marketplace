use methods::{REPUTATION_ELF, REPUTATION_ID};

extern crate alloc;

use alloc::vec::Vec;
use risc0_zkvm::{prove::Prover, serde::to_vec};

use clap::Parser;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    // TODO: extract this into a common struct
    // and use `add_input_u8_slice` once.

    // public inputs
    commitment: Vec<u8>,

    min_reputation: u32,

    // private inputs
    _private_key: Option<Vec<u8>>,

    nullifier: Vec<u8>,

    reputation_score: u32,
}

// use risc0_zkvm::serde::{from_slice, to_vec};

fn main() {
    let mut prover = Prover::new(REPUTATION_ELF).expect(
        "Prover should be constructed from valid method source code and corresponding method ID",
    );

    let args = Args::parse();

    prover.add_input_u8_slice(&args.commitment);
    prover.add_input_u32_slice(&to_vec(&args.min_reputation).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&args._private_key).expect("should be serializable"));
    prover.add_input_u8_slice(&args.nullifier);
    prover.add_input_u32_slice(&to_vec(&args.reputation_score).expect("should be serializable"));

    // Run prover & generate receipt
    let receipt = prover.run()
        .expect("Code should be provable unless it 1) had an error or 2) overflowed the cycle limit. See `embed_methods_with_options` for information on adjusting maximum cycle count.");

    // Optional: Verify receipt to confirm that recipients will also be able to verify your receipt
    receipt.verify(&REPUTATION_ID).expect(
        "Code you have proven should successfully verify; did you specify the correct method ID?",
    );

    // TODO: Use subxt to submit a transaction on chain
    println!("receipt: {:?}", receipt);
}

// let mut prover =
// Prover::new(REVIEW_ELF).expect("Prover should be constructed from valid ELF binary");

// // Next we send a & b to the guest
