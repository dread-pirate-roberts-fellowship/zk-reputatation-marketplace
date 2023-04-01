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
import { items } from "../../utils/helpers";

const itemDetails: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const item = items.find((item) => item.name == name);
  if (item) {
    return (
      <Box
        w="100%"
        flex="1"
        display="flex"
        flexDir={"row"}
        border="1px"
        borderColor="#f0f0f0"
      >
        <Box backgroundColor="green">
          <Box
            minW="400px"
            backgroundColor="blue"
            sx={{
              position: "sticky",
              top: "0",
            }}
          >
            <Image
              src={item.pic}
              alt="token"
              width="100%"
              objectFit={"contain"}
            />
          </Box>
        </Box>
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
                <Heading>{item.name}</Heading>
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
              <Heading size="md">General</Heading>
              <Text>{item.long_desc}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <Text>Not found</Text>;
  }
};

export default itemDetails;
