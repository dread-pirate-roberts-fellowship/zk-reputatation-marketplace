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
import axios from "axios";
import { doSave } from "../utils/ipfs";

const AddItemForm = (props) => {
  const [item_name, setItemName] = useState(null);
  const handleItemNameChange = (e: any) => setItemName(e.target.value);
  const isItemError = item_name === "";

  const [item_price, setItemPrice] = useState(null);
  const handleItemPriceChange = (e: any) => setItemPrice(e.target.value);
  const isPriceError = item_price === "";

  const [item_description, setItemDescription] = useState(null);
  const handleItemDescriptionChange = (e: any) =>
    setItemDescription(e.target.value);
  const isDescriptionError = item_description === "";

  const [item_picture_url, setItemPictureUrl] = useState(null);
  const handleItemPictureUrlChange = (e: any) =>
    setItemPictureUrl(e.target.value);
  const isPictureUrlError = item_picture_url === "";

  return (
    <>
      <div>
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
      </div>
      <ModalFooter>
        <Button
          mr={3}
          onClick={() => {
            doSave({
              item_name: item_name,
              item_price: item_price,
              item_description: item_description,
              item_picture_url: item_picture_url,
            });
            props.doClose();
          }}
        >
          Save Item
        </Button>
        <Button variant="ghost" onClick={props.doClose}>
          Close Without Saving
        </Button>
      </ModalFooter>
    </>
  );
};

export const NewItemButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>New item</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item to Sell</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddItemForm doClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
