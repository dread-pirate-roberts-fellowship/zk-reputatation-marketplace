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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { users } from "../../../utils/helpers";

function AddItemForm() {
  const [item_name, setItemName] = useState('')
  const handleItemNameChange = (e) => setItemName(e.target.value)
  const isItemError = item_name === ''

  const [item_price, setItemPrice] = useState('')
  const handleItemPriceChange = (e) => setItemPrice(e.target.value)
  const isPriceError = item_price === ''

  const [item_description, setItemDescription] = useState('')
  const handleItemDescriptionChange = (e) => setItemDescription(e.target.value)
  const isDescriptionError = item_description === ''

  const [item_picture_url, setItemPictureUrl] = useState('')
  const handleItemPictureUrlChange = (e) => setItemPictureUrl(e.target.value)
  const isPictureUrlError = item_picture_url === ''
  return (
    <form>
      <FormControl isRequired isInvalid={isItemError} >
        <FormLabel>Item Name</FormLabel>
        <Input value={item_name} placeholder="Your item's name" onChange={handleItemNameChange} />
        <FormErrorMessage>Item Name is required</FormErrorMessage>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={isDescriptionError}>
        <FormLabel>Item Description</FormLabel>
        <Input value={item_description} placeholder="Your item's description" onChange={handleItemDescriptionChange} />
        <FormErrorMessage>Item Description is required</FormErrorMessage>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={isPictureUrlError}>
        <FormLabel>Item Picture</FormLabel>
        <Input value={item_picture_url} placeholder="URL to your item's picture" onChange={handleItemPictureUrlChange} />
        <FormHelperText>Insert a URL to an image of what you are selling.</FormHelperText>
        <FormErrorMessage>Item Picture is required</FormErrorMessage>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={isPriceError}>
        <FormLabel>Item Price</FormLabel>
        <Input value={item_price} placeholder="Your item's price" onChange={handleItemPriceChange} />
        <FormHelperText>Insert a URL to an image of what you are selling.</FormHelperText>
        <FormErrorMessage>Item Price is required</FormErrorMessage>
      </FormControl>
    </form>
  );
}

function ButtonBox() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box flexDir={"row"} display="flex" padding="20px">
      <Box>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Item to Sell</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              I am some content. If I were real content, you would know.

              <AddItemForm />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Save Item
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Close Without Saving
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

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
              <Text fontWeight={"bold"}>{user.reputationQuality * 100}%</Text>
              <Text fontWeight={"bold"}>{user.reputationQuantity}</Text>
            </Box>
          </Box>
          <ButtonBox />
        </Box>
      </Box>
    );
  } else {
    return <Text>User could not be found</Text>;
  }
};

export default userProfile;
