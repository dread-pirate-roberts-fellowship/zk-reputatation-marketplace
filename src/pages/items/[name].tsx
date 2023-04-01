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
        <Box>
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
            width="100%"
            flexDir={"row"}
            display="flex"
            flex="1"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Heading>{item.name}</Heading>
          </Box>
          <Box
            flexDir={"row"}
            display="flex"
            alignItems={"center"}
            border="1px"
            borderColor="#f0f0f0"
            margin="10px"
            padding="10px"
            justifyContent={"space-between"}
            width="100%"
          >
            <Box>
              <Heading size="s">About the seller:</Heading>
            </Box>
            <Box flexDir={"row"} display="flex">
              <Box flexDir={"column"}>
                <Text textAlign={"right"}>Transaction Amount:</Text>
                <Text textAlign={"right"}>Reputation:</Text>
              </Box>
              <Box flexDir={"column"} marginLeft="5px">
                <Text fontWeight={"bold"}>{item.reputationQuantity}</Text>
                <Text
                  fontWeight={"bold"}
                  textColor={item.reputationQuality > 7 ? "green" : "orange"}
                >
                  {item.reputationQuality}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            flexDir={"row"}
            display="flex"
            width="100%"
            paddingX="60px"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box flexDir={"row"} display="flex" alignItems={"center"}>
              <Heading size="s" marginRight={"10px"}>
                Price:
              </Heading>
              <Heading size="2xl">${item.price}</Heading>
            </Box>
            <Box>
              <Button width={"200px"}>Buy</Button>
            </Box>
          </Box>
          <Box flexDir={"row"} display="flex" padding="20px">
            <Box>
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
