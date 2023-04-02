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
import { useContext, useEffect, useState } from "react";
import { MdStar, MdStarOutline } from "react-icons/md";
import { FakeItemContext, FakeItemDispatchContext } from "../../utils/fake";

const ItemDetails: NextPage = () => {
  const toast = useToast();

  const dispatch = useContext(FakeItemDispatchContext);
  const items = useContext(FakeItemContext);
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
        boxShadow={"dark-lg"}
      >
        <Box
          minW="400px"
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
                {[1, 2, 3, 4, 5].map((index) => (
                  <Icon
                    as={
                      item.reputationQuality! >= index ? MdStar : MdStarOutline
                    }
                    h={5}
                    w={5}
                  />
                ))}
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
              <Button
                width={"200px"}
                onClick={() => {
                  dispatch({
                    type: "changedItem",
                    value: { ...item, status: "bought" },
                  });
                  router.push("/");
                  toast({
                    title: "Bought!",
                    description: "You are now a proud owner of " + item.name,
                    status: "success",
                    isClosable: true,
                  });
                }}
              >
                Buy
              </Button>
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

export default ItemDetails;
