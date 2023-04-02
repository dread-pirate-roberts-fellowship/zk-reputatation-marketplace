import axios from "axios";

const pinata_jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZjIyNDczMS1kYTQyLTQwNGUtOGZiYS1lMjlmZDQ3Y2Y1MDciLCJlbWFpbCI6Ind5aGFpbmVzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNGE4NWE1NTUxMjg0NDgzYWUzZiIsInNjb3BlZEtleVNlY3JldCI6ImMyMzJlNTYxY2Q2NmFiZWQxMGJiNDVjMjQ0MGU2M2MxNTIxMWI0ODUxMjYxYzQ2OWNhYjBiYzQzMzNjZGJmY2UiLCJpYXQiOjE2ODAzNzkwOTZ9.mVF3h5gtgryDN2fdrsiIZ7DTSqDrQzNAB2cO5qLjnRk";

export const doSave = async (content: object) => {
  var data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "testing",
      keyvalues: content,
    },
    pinataContent: content,
  });

  let config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + pinata_jwt,
    },
    data: data,
  };

  const res = await axios(config);

  console.log(res.data);

  const ipfs_hash = res.data.IpfsHash;
};
export const doFetch = async (hash: string) => {
  let config = {
    method: "get",
    url: "https://gateway.pinata.cloud/ipfs/" + hash,
  };

  const res = await axios(config);
  console.log(res.data);

  return res.data;
};
