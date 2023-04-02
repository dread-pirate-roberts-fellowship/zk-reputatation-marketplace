# a0-marketplace

The first ever marketplace with private reputations. Sellers of assets hold their reputation with their reputation dark wallet offchain.
Circuits for the two main proofs were written with Risc0, and the onchain marketplace is deployed on Aleph Zero testnet.

## How to use it

### Risc0 verifier as an ink! pallet

Go in the contract folder and then : 

To build the contract:

```
cargo contract build --release
```

To test:
```
cargo test --features "prove" --release
```

### Front-end

```
cd front-end && yarn
```

Please install yarn if it is not already done. 

To build the front-end:
```
yarn
```

To run:
```
yarn
```
