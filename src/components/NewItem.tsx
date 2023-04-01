import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const AddItemForm = () => {
  const [item_name, setItemName] = useState("");
  const handleItemNameChange = (e: any) => setItemName(e.target.value);
  const isItemError = item_name === "";

  const [item_price, setItemPrice] = useState("");
  const handleItemPriceChange = (e: any) => setItemPrice(e.target.value);
  const isPriceError = item_price === "";

  const [item_description, setItemDescription] = useState("");
  const handleItemDescriptionChange = (e: any) =>
    setItemDescription(e.target.value);
  const isDescriptionError = item_description === "";

  const [item_picture_url, setItemPictureUrl] = useState("");
  const handleItemPictureUrlChange = (e: any) =>
    setItemPictureUrl(e.target.value);
  const isPictureUrlError = item_picture_url === "";
  return (
    <form>
      <FormControl isRequired isInvalid={isItemError}>
        <FormLabel>Item Name</FormLabel>
        <Input
          value={item_name}
          placeholder="Your item's name"
          onChange={handleItemNameChange}
        />
        <FormErrorMessage>Item Name is required</FormErrorMessage>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={isDescriptionError}>
        <FormLabel>Item Description</FormLabel>
        <Input
          value={item_description}
          placeholder="Your item's description"
          onChange={handleItemDescriptionChange}
        />
        <FormErrorMessage>Item Description is required</FormErrorMessage>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={isPictureUrlError}>
        <FormLabel>Item Picture</FormLabel>
        <Input
          value={item_picture_url}
          placeholder="URL to your item's picture"
          onChange={handleItemPictureUrlChange}
        />
        <FormHelperText>
          Insert a URL to an image of what you are selling.
        </FormHelperText>
        <FormErrorMessage>Item Picture is required</FormErrorMessage>
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={isPriceError}>
        <FormLabel>Item Price</FormLabel>
        <Input
          value={item_price}
          placeholder="Your item's price"
          onChange={handleItemPriceChange}
        />
        <FormHelperText>
          Insert a URL to an image of what you are selling.
        </FormHelperText>
        <FormErrorMessage>Item Price is required</FormErrorMessage>
      </FormControl>
    </form>
  );
};

export const NewItemButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}></Button>
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
            <Button mr={3} onClick={onClose}>
              Save Item
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close Without Saving
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
