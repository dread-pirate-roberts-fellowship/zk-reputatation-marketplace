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

const pinata_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZjIyNDczMS1kYTQyLTQwNGUtOGZiYS1lMjlmZDQ3Y2Y1MDciLCJlbWFpbCI6Ind5aGFpbmVzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNGE4NWE1NTUxMjg0NDgzYWUzZiIsInNjb3BlZEtleVNlY3JldCI6ImMyMzJlNTYxY2Q2NmFiZWQxMGJiNDVjMjQ0MGU2M2MxNTIxMWI0ODUxMjYxYzQ2OWNhYjBiYzQzMzNjZGJmY2UiLCJpYXQiOjE2ODAzNzkwOTZ9.mVF3h5gtgryDN2fdrsiIZ7DTSqDrQzNAB2cO5qLjnRk";

const AddItemForm = (props) => {
  const axios = require('axios');

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

  const doSave = async () => {
    var data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": "testing",
        "keyvalues": {
          "item_name": item_name,
          "item_price": item_price, 
          "item_description": item_description,
          "item_picture_url": item_picture_url
        }
      },
      "pinataContent": {
        "item_name": item_name,
        "item_price": item_price,
        "item_description": item_description,
        "item_picture_url": item_picture_url
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': "Bearer " + pinata_jwt
      },
      data : data
    };
    
    const res = await axios(config);
    
    console.log(res.data);

    const ipfs_hash = res.data.IpfsHash;
    props.doClose();
  }

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
      <Button mr={3} onClick={doSave}>
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
            I am some content. If I were real content, you would know.
            <AddItemForm doClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
