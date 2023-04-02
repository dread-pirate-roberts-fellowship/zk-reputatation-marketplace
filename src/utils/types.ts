export interface itemType {
  reputationQuantity: number;
  reputationQuality: number;
  price: number;
  name: string;
  long_desc: string;
  pic: string;
  status:
    | "open"
    | "bought"
    | "sold"
    | "gaveReview"
    | "receivedReview"
    | "reviewExpired";
  review?: number;
}
