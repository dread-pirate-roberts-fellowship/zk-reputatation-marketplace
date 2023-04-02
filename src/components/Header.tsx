import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  Icon,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useExtension } from "useink";

// import Logo from "../../public/x2";
import { useRouter } from "next/router";
import { shorten } from "../utils/networkHelpers";
import { MdPerson } from "react-icons/md";
const Header = () => {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();
  const { account, connect, disconnect } = useExtension();

  // useEffect(() => {
  //   if (account) {
  //     console.log("namein");
  //     // const ethProvider = new ethers.providers.JsonRpcProvider(
  //     //   NETWORKS[NetworkId.].rpcUrls[0],
  //     //   5
  //     // );
  //     // console.log("lol", address);

  //     // ethProvider.lookupAddress(address).then((name) => {
  //     //   console.log("namead", address.toLowerCase());
  //     //   console.log("name", name);
  //     //   if (name) setENSName(name);
  //     // });
  //   }
  // }, [account]);
  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        height="75px"
        alignItems={"center "}
      >
        <Box height="150px" width="150px" display="flex" alignItems={"center"}>
          <Link onClick={() => router.push("/")}>
            <img src="/logo.svg" alt="next" />
          </Link>
        </Box>
        <Box display="flex" textAlign="right">
          <IconButton
            icon={<Icon as={MdPerson} />}
            onClick={() => router.push("/profile")}
            aria-label={""}
          />
          {!account ? (
            <Button
              fontSize="14px"
              lineHeight="17px"
              colorScheme="green"
              variant="solid"
              onClick={() => {
                connect();
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              fontSize="14px"
              lineHeight="17px"
              colorScheme="green"
              variant="solid"
              onClick={disconnect}
            >
              {shorten(account.address)}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;
