import {
  Box,
  VStack,
  Heading,
  HStack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useCopyToClipboard } from "usehooks-ts";

type Props = {
  id: string;
  creator_fid: string;
  content: string;
  votes: { count: number }[];
};

export function SingleEntry({ id, creator_fid, content, votes }: Props) {
  const [_unused, copyToClipboard] = useCopyToClipboard();
  const toast = useToast();
  return (
    <Box
      bg="white"
      border="2px solid black"
      borderRadius={16}
      px={8}
      pt={6}
      pb={8}
      boxShadow="0px 8px 12px rgba(0,0,0,0.1)"
    >
      <VStack alignItems="stretch" gap={4}>
        <HStack justifyContent="space-between">
          <VStack alignItems="stretch" gap={1}>
            <Heading fontSize="lg">Created by:</Heading>
            <Text>{creator_fid}</Text>
          </VStack>
          <Button
            size="sm"
            onClick={() => {
              copyToClipboard(
                `${process.env.NEXT_PUBLIC_VERCEL_URL}/entry/${id}`
              );
              toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 1500,
                isClosable: true,
              });
            }}
          >
            Copy Frame Link
          </Button>
        </HStack>
        <VStack alignItems="stretch" gap={1}>
          <Heading fontSize="lg">Content:</Heading>
          <Text>{content}</Text>
        </VStack>
        <VStack alignItems="stretch" gap={1}>
          <Heading fontSize="lg">Votes:</Heading>
          <Text>{votes?.[0].count}</Text>
        </VStack>
      </VStack>
    </Box>
  );
}
