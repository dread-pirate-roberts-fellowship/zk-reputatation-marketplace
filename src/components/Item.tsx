import { Box, Button, Divider, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { itemType } from "../utils/types";

export const Item = ({ item }: { item: itemType }) => {
  const router = useRouter();
  return (
    <Box
      border="1px"
      borderColor="#f0f0f0"
      margin="5"
      maxW="300px"
      onClick={() => router.push("/items/" + item.name)}
      cursor="pointer"
    >
      <Image
        src={item.pic}
        alt="token"
        display={"flex"}
        flex="1"
        objectFit={"cover"}
      />
      <Box
        flexDir={"row"}
        justifyContent="space-between"
        display="flex"
        padding="10px"
        alignItems={"center"}
      >
        <Box flexDir={"column"} display="flex" flex="1">
          <Text fontSize={"2xl"}>{item.name}</Text>
          <Text>Price: ${item.price}</Text>
        </Box>
      </Box>
      <Box
        padding="10px"
        flexDir={"row"}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize="12px" noOfLines={3} width="200px">
          {item.long_desc}
        </Text>
      </Box>
    </Box>
  );
};
