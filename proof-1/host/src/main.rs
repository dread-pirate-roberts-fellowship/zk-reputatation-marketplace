// TODO: Update the name of the method loaded by the prover. E.g., if the method is `multiply`, replace `METHOD_NAME_ID` with `MULTIPLY_ID` and replace `METHOD_NAME_PATH` with `MULTIPLY_PATH`
use methods::{REPUTATION_ID, REPUTATION_ELF};

extern crate alloc;

use alloc::{vec, vec::Vec};
use risc0_zkvm::{
    serde::{from_slice, to_vec},
    prove::Prover,
};
// use factors_methods::{MULTIPLY_ELF, MULTIPLY_ID};
// use risc0_zkvm::{prove::Prover, serde::to_vec};


// use risc0_zkvm::serde::{from_slice, to_vec};

fn main() {
    // Make the prover.
    // let method_code = std::fs::read(REPUTATION_ELF)
    //     .expect("Method code should be present at the specified path; did you use the correct *_PATH constant?");
    let mut prover = Prover::new(REPUTATION_ELF).expect(
        "Prover should be constructed from valid method source code and corresponding method ID",
    );

    let a: Vec<u8> = vec![0,1,2,3,4,5];
    let b: u64 = 7;
    let c: Vec<u8> = vec![0,1,2,3,4,5];
    let d: Vec<u8> = vec![0,1,2,3,4,5];
    let e: u64 = 9;
    

    prover.add_input_u32_slice(&to_vec(&a).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&b).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&c).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&d).expect("should be serializable"));
    prover.add_input_u32_slice(&to_vec(&e).expect("should be serializable"));


    // Run prover & generate receipt
    let receipt = prover.run()
        .expect("Code should be provable unless it 1) had an error or 2) overflowed the cycle limit. See `embed_methods_with_options` for information on adjusting maximum cycle count.");

    // Optional: Verify receipt to confirm that recipients will also be able to verify your receipt
    receipt.verify(&REPUTATION_ID).expect(
        "Code you have proven should successfully verify; did you specify the correct method ID?",
    );

    // let ink_risk0_verifier = InkRisk0Verifier::new(MULTIPLY_ID.into());
    // assert!(ink_risk0_verifier.verify(journal, seal).is_ok());


    // TODO: Implement code for transmitting or serializing the receipt for other parties to verify here

    println!("Done.");

}


// let mut prover =
// Prover::new(MULTIPLY_ELF).expect("Prover should be constructed from valid ELF binary");

// // Next we send a & b to the guest
