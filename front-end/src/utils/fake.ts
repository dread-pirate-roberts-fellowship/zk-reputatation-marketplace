import { createContext, Dispatch } from "react";
import { itemType } from "./types";
const hashes = [
  {
    ipfsHash: "bafkreie5yt45kytthcqdhmvqdq25jsex4aszbcrjbqa4tsxftr3zwjcjdq",
    status: "bought",
    reputationQuantity: 1000,
    reputationQuality: 3,
  },
  {
    ipfsHash: "bafkreia3bfjxrendtjloz57sngpyug3hhkexxpgr55kabprrzdtgss4wai",
    status: "open",
    reputationQuantity: 500,
    reputationQuality: 5,
  },
  {
    ipfsHash: "bafkreiasvlbmgxbbue7aiygig4ovkbl2aflymoycf33yw4cmz4tdxjt2xa",
    status: "open",
    reputationQuantity: 1000,
    reputationQuality: 4,
  },
  {
    ipfsHash: "bafkreiaqum5j5qcsoszrpgdrsrp4zbxxs3odf3qlzcz6e7d44o6y4p37ue",
    status: "open",
    reputationQuantity: 1000,
    reputationQuality: 1,
  },
  {
    ipfsHash: "bafkreia6ze72wflu4rnyzignqfb5lahzz552svz4lnzc4lkxdtolljg634",
    status: "receivedReview",
    review: "3",
    reputationQuantity: 10000,
    reputationQuality: 1,
  },
  {
    ipfsHash: "bafkreieuvz7to4qxzsr4phkxpha4pnn2mxdl5ctctsb56uf3k5z73v4qhq",
    status: "reviewExpired",
    reputationQuantity: 1000,
    reputationQuality: 1,
  },
  {
    ipfsHash: "bafkreignlmswobsryz7xnezkrlkpaambmuyxvemh5yzgibzz34kw2mfroe",
    status: "open",
    reputationQuantity: 1000,
    reputationQuality: 1,
  },
  {
    ipfsHash: "bafkreicxelvnxye332ccaftgl7dwesv5ktx75h4hwzniztjoifryumgrkm",
    status: "gaveReview",
    review: "3",
    reputationQuantity: 1000,
    reputationQuality: 1,
  },
];

export async function getItems() {
  return hashes.map((hash) => hash.ipfsHash);
}
export async function getStatusAndReputation(ipfsId: string, item: itemType) {
  const tmpItem = hashes.find((tmp) => tmp.ipfsHash == ipfsId);
  return {
    ...item,
    status: tmpItem?.status,
    review: tmpItem?.review,
    reputationQuantity: tmpItem?.reputationQuantity,
    reputationQuality: tmpItem?.reputationQuality,
  };
}

export const FakeItemContext = createContext([] as itemType[]);
export const FakeItemDispatchContext = createContext(
  {} as Dispatch<{ type: string; value: itemType | itemType[] }>
);
