import { Box, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import x, { useContract } from "useink";
import { Item } from "../components/Item";
import { itemType } from "../utils/types";
import metadata from "../../marketplace/target/ink/marketplace.json";
import { FakeItemContext } from "../utils/fake";

const address = "nif";

export default function Home() {
  const items = useContext(FakeItemContext);
  return (
    <Box
      flexDir={"row"}
      flexWrap="wrap"
      display={"flex"}
      justifyContent="space-between"
    >
      {items
        .filter((item) => item.status == "open")
        .map((item, index) => (
          <Box maxW="300px">
            <Item item={item} key={index} />
          </Box>
        ))}
    </Box>
  );
}
