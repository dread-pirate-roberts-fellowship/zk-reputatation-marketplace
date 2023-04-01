export interface itemType {
  sellerAddress: string;
  reputationQuantity: number;
  reputationQuality: number;
  price: number;
  name: string;
  long_desc: string;
  pic: string;
}

export interface userType {
  id: number;
  username: string;
  address: string;
  reputationQuantity: number;
  reputationQuality: number;
  items: itemType[];
}