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
import { users } from "../../../utils/helpers";

const userProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = users.find((user) => user.id == id);
  
  if (user) {
    return (
      <Box
        w="100%"
        flex="1"
        display="flex"
        flexDir={"row"}
        border="1px"
        borderColor="#f0f0f0"
      >
        <Box
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
                <Heading>{user.username} (#{user.id})</Heading>
              </Box>
            </Box>
            <Box flexDir={"column"} width="250px">
              <Text textAlign={"right"}>Max APY:</Text>
              <Text textAlign={"right"}>Risk:</Text>
            </Box>
            <Box flexDir={"column"} marginLeft="5px">
              <Text fontWeight={"bold"}>{item.reputationQuality * 100}%</Text>
              <Text fontWeight={"bold"}>{item.reputationQuantity}</Text>
            </Box>
          </Box>
          <Box flexDir={"row"} display="flex" padding="20px">
            <Box>
              <Heading size="md">Address</Heading>
              <Text>{item.address}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <Text>User could not be found</Text>;
  }
};

export default userProfile;
