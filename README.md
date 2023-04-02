# ZK reputation dark wallet

Marketplace with private reputations for the sellers. Sellers of assets hold their reputation with their reputation dark wallet offchain.
Circuits for the two main proofs were written with Risc0, and the onchain marketplace is deployed on Aleph Zero testnet.

## How to use it

### Front-end

```
cd front-end && yarn
```

Please install `yarn` if it is not already done.

To build the front-end:
```
yarn
```

To run:
```
yarn
```

### Backend

Go in the `marketplace` folder and then:

To build the contract:

```
cargo contract build --release
```

To run the CLI prover, go to `proof-1` folder and then:
```
cargo run --features "prove" --release
```
