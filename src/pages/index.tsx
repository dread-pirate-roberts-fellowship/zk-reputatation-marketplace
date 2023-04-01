import { Box } from "@chakra-ui/react";
import { Item } from "../components/Item";
import { items } from "../utils/helpers";
import { itemType } from "../utils/types";

export default function Home() {
  return (
    <Box
      flexDir={"row"}
      flexWrap="wrap"
      display={"flex"}
      justifyContent="space-between"
    >
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </Box>
  );
}
