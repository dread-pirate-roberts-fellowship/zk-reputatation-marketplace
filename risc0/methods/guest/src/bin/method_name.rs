// TODO: Rename this file to change the name of this method from METHOD_NAME

#![no_main]
#![no_std]  // std support is experimental, but you can remove this to try it

risc0_zkvm::guest::entry!(main);

pub fn main() {
    // proof that a certain 


    //public inputs
    let commitment: xx = env::read();
    let min_reputation: xx = env::read();

    //private inputs
    let p_key: xx = env::read();
    let reputation_score: xx = env::read();

    // check if commitment = public_key(p_key) + reputation score



    //check if the private key belongs to the public key
    if (reputation_score < min_reputation){
        panic!("Reputation score too small")
    }

    // TOOD check that the commitment is part of the merkle tree

    env::commit(&true);

    

}
