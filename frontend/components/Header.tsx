import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Logo from "../../public/x2";
import { useRouter } from "next/router";
import { shorten } from "../utils/networkHelpers";
const Header = () => {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="200px"
        height="75px"
        alignItems={"center "}
      >
        <Box>
          <Link onClick={() => router.push("/")}>
            <Logo height={50} />
          </Link>
        </Box>
        <Box display="flex" textAlign="right">
          {router.route == "/" ? (
            <Button
              onClick={() => router.push("/overview")}
              fontSize="14px"
              lineHeight="17px"
              variant="solid"
              textAlign="center"
              mr="24px"
            >
              App
            </Button>
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;
