# a0-marketplace

The first ever marketplace with private reputations. Sellers of assets hold their reputation with their reputation dark wallet offcahin.
Circuits for the two main proofs were written with Risc0, and the onchain marketplace is deployed on Aleph Zero testnet.

## How to use it

### Risc0 verifier as an ink! pallet

To build the contract:

```
cargo contract build --release
```

To test:
```
cargo test --features "prove" --release
```

### Front-end

Please install yarn before. 

To build the front-end:
```
yarn
```

To run:
```
yarn
```
