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
  Icon,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { Item } from "../components/Item";
import { myListedItems, transactionItems } from "../utils/helpers";

const UserProfile: NextPage = () => {
  return (
    <Box
      w="100%"
      flex="1"
      display="flex"
      flexDir={"column"}
      boxShadow={"dark-lg"}
      padding="30px"
    >
      <Box
        flexDir={"row"}
        display="flex"
        width="100%"
        justifyContent={"space-between"}
      >
        <Box flexDir={"row"} display="flex">
          <Icon as={MdPerson} w={10} h={10} marginRight="10px" />
          <Heading>Your profile</Heading>
        </Box>
        <Box>
          <Button>List new item</Button>
        </Box>
      </Box>
      <Box padding="10px">
        {/* <Heading size={"md"}>My listed Items</Heading>
        <Box
          flexDir={"row"}
          overflowX="scroll"
          display={"flex"}
          justifyContent="flex-start"
        >
          {myListedItems.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </Box> */}
        <Heading size={"md"} marginTop="10px">
          Your transaction history
        </Heading>
        <Box
          flexDir={"row"}
          overflowX="scroll"
          display={"flex"}
          justifyContent="space-between"
        >
          {transactionItems.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </Box>
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
