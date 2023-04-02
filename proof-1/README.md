# Proof-1

Seller has to submit a proof that they have a dark wallet with a reputation > x. To do that we check whether the commitment to a dark wallet is part of a valid merkle root, the commitment was constructed of a valid nullifier and reputation score.
On top we check that the reputation_score > min_reputation.
