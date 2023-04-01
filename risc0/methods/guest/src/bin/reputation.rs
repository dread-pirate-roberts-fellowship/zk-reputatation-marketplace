// TODO: Rename this file to change the name of this method from METHOD_NAME

#![no_main]
#![no_std]  // std support is experimental, but you can remove this to try it

risc0_zkvm::guest::entry!(main);

/// Public journal values that will be committed by the image crop method.
#[derive(Debug, Serialize, Deserialize)]
pub struct Output {
    pub commitment: String,
    pub min_reputation: u64,
}



pub fn main() {
    // proof that a certain 


    //public inputs
    let commitment: String = env::read();
    let min_reputation: u64 = env::read();

    //private inputs
    let p_key: String = env::read();
    let reputation_score: u64 = env::read();

    // check if commitment = public_key(p_key) + reputation score

    //check if the private key belongs to the public key
    if (reputation_score < min_reputation){
        panic!("Reputation score too small")
    }


    let output = Output {
        commitment: commitment,
        min_reputation: min_reputation,
    }
    // TOOD check that the commitment is part of the merkle tree
    env::commit(&output);
    

}
