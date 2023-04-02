import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdStar, MdStarOutline } from "react-icons/md";
import { itemType } from "../utils/types";

export const Item = ({ item }: { item: itemType }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [review, setReview] = useState(0);
  const [hoveredReview, setHoveredReview] = useState(0);

  return (
    <Box
      boxShadow={"2xl"}
      margin="5"
      maxW="300px"
      onClick={() => {
        item.status == "open" && router.push("/items/" + item.name);
      }}
      cursor={item.status == "open" ? "pointer" : "default"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review purchase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {[1, 2, 3, 4, 5].map((index) => (
              <Icon
                as={
                  (hoveredReview == 0 && review >= index) ||
                  hoveredReview >= index
                    ? MdStar
                    : MdStarOutline
                }
                h={7}
                w={7}
                onMouseEnter={() => setHoveredReview(index)}
                onMouseLeave={() => setHoveredReview(0)}
                onClick={() => setReview(index)}
                cursor="pointer"
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button>Review</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {item.status == "sold" ||
      item.status == "receivedReview" ||
      item.status == "reviewExpired" ? (
        <Text marginBottom={"5px"}>Sold:</Text>
      ) : (
        (item.status == "bought" || item.status == "gaveReview") && (
          <Text marginBottom={"5px"}>Bought:</Text>
        )
      )}
      <Image
        src={item.pic}
        alt="token"
        display={"flex"}
        flex="1"
        objectFit={"cover"}
      />
      <Box
        flexDir={"row"}
        justifyContent="space-between"
        display="flex"
        padding="10px"
        alignItems={"center"}
      >
        <Box flexDir={"column"} display="flex" flex="1">
          <Text fontSize={"2xl"}>{item.name}</Text>
          <Text>Price: ${item.price}</Text>
        </Box>
      </Box>
      <Box
        padding="10px"
        flexDir={"row"}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize="12px" noOfLines={3} width="200px">
          {item.long_desc}
        </Text>
      </Box>
      {item.status == "bought" ? (
        <>
          <Divider />
          <Box
            padding="10px"
            flexDir={"row"}
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button onClick={onOpen}>Review now</Button>
          </Box>
        </>
      ) : item.status == "sold" ? (
        <>
          <Divider />
          <Box
            padding="10px"
            flexDir={"row"}
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>
              Please wait for the buyer to review before claiming your funds.
              They have 10 days for this.
            </Text>
          </Box>
        </>
      ) : item.status == "gaveReview" ? (
        <>
          <Divider />
          <Box
            padding="10px"
            flexDir={"column"}
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text marginBottom={"5px"}>You gave:</Text>
            <Box display="flex" flexDir={"row"} marginBottom={"5px"}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Icon
                  as={item.review! >= index ? MdStar : MdStarOutline}
                  h={5}
                  w={5}
                />
              ))}
            </Box>
          </Box>
        </>
      ) : item.status == "receivedReview" ? (
        <>
          <Divider />
          <Box
            padding="10px"
            flexDir={"column"}
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text marginBottom={"5px"}>You received:</Text>
            <Box display="flex" flexDir={"row"} marginBottom={"5px"}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Icon
                  as={item.review! >= index ? MdStar : MdStarOutline}
                  h={5}
                  w={5}
                />
              ))}
            </Box>
            <Button onClick={() => {}}>Claim your funds</Button>
          </Box>
        </>
      ) : (
        item.status == "reviewExpired" && (
          <>
            <Divider />
            <Box
              padding="10px"
              flexDir={"column"}
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text marginBottom={"5px"}>The review time expired.</Text>
              <Button onClick={() => {}}>Claim your funds</Button>
            </Box>
          </>
        )
      )}
    </Box>
  );
};
