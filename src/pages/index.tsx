import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Item } from "../components/Item";
import { items } from "../utils/helpers";
import { itemType } from "../utils/types";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([] as itemType[]);
  useEffect(() => {}, []);
  if (!loading) {
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
  } else {
    return <Spinner />;
  }
}
