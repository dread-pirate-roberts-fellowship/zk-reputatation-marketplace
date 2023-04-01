import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Item } from "../components/Item";
import { myListedItems, transactionItems } from "../utils/helpers";

const UserProfile: NextPage = () => {
  return (
    <Box
      w="100%"
      flex="1"
      display="flex"
      flexDir={"column"}
      border="1px"
      borderColor="#f0f0f0"
    >
      <Box
        flexDir={"row"}
        overflowX="scroll"
        display={"flex"}
        justifyContent="flex-start"
        backgroundColor={"green"}
      >
        <Heading>My listed Items</Heading>
        {myListedItems.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </Box>
      <Box
        flexDir={"row"}
        flexWrap="wrap"
        display={"flex"}
        justifyContent="space-between"
      >
        <Heading>My transaction history</Heading>
        {transactionItems.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

/*      <Box
flexDirection="row"
display="flex"
marginY="1"
padding="20px"
flexDir={"column"}
justifyContent={"space-between"}
alignItems="center"
>
<Box
  sx={{
    position: "sticky",
    top: "0",
  }}
  background="white"
  width="100%"
>
  <Box flexDir={"row"} display="flex" flex="1">
    <Box alignItems={"center"} display={"flex"}>
      <Heading>
        {user.username} (#{user.id})
      </Heading>
    </Box>
  </Box>
  <Box flexDir={"column"} width="250px">
    <Text textAlign={"right"}>Max APY:</Text>
    <Text textAlign={"right"}>Risk:</Text>
  </Box>
  <Box flexDir={"column"} marginLeft="5px">
    <Text fontWeight={"bold"}>{user.reputationQuality * 100}%</Text>
    <Text fontWeight={"bold"}>{user.reputationQuantity}</Text>
  </Box>
</Box>
<Box flexDir={"row"} display="flex" padding="20px">
  <Box>
    <Heading size="md">Address</Heading>
    <Text>{user.address}</Text>
  </Box>
</Box>
</Box>*/

export default UserProfile;
