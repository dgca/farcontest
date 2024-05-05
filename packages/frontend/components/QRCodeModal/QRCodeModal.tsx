import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";

export function QRCodeModal({
  onClose,
  deepLinkUrl,
}: {
  onClose: () => void;
  deepLinkUrl: string;
}) {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign in with Farcaster</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack justifyContent="center">
            <QRCode value={deepLinkUrl} />
            <Text
              mt={4}
              color="blue.500"
              as="a"
              href={deepLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                textDecoration: "underline",
              }}
            >
              I&apos;m using my phone
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button w="100%" colorScheme="blue" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
