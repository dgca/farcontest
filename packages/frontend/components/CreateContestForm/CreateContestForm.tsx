import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Divider,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

import { DotDivider } from "../DotDivider/DotDivider";

import { toOrdinal } from "@/utils/toOrdinal";

export function CreateContestForm() {
  const [prizeCount, setPrizeCount] = useState(1);

  return (
    <VStack alignItems="stretch">
      <Box
        bg="white"
        border="2px solid black"
        borderRadius={16}
        px={8}
        pt={6}
        pb={8}
        boxShadow="0px 8px 12px rgba(0,0,0,0.1)"
      >
        <Heading fontSize="2xl">Create Contest</Heading>

        <DotDivider mt={4} mb={6} />

        <VStack gap={6} alignItems="stretch">
          <FormControl>
            <FormLabel>Contest Name</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea />
          </FormControl>

          <FormControl>
            <FormLabel>Submission Guidelines</FormLabel>
            <Textarea />
            <FormHelperText>
              Instructions shown in the frame where contestants submit entries
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>End Date & Time</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </FormControl>

          <Divider />

          <Heading size="md">Prizes</Heading>

          {[...Array(prizeCount)].map((_, index) => {
            return (
              <Box
                border="1px solid rgba(0, 0, 0, 0.1)"
                p={4}
                borderRadius={8}
                key={index}
              >
                <VStack gap={4} alignItems="stretch">
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      defaultValue={`${toOrdinal(index + 1)} place`}
                    />
                  </FormControl>
                  <HStack alignItems="flex-start">
                    <FormControl>
                      <FormLabel>Amount</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    {index === 0 && (
                      <FormControl>
                        <FormLabel>Token</FormLabel>
                        <Input type="text" placeholder="e.g. USDC or ETH" />
                        <FormHelperText>
                          This token will apply to all prizes
                        </FormHelperText>
                      </FormControl>
                    )}
                  </HStack>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea />
                  </FormControl>
                  {index !== 0 && index === prizeCount - 1 && (
                    <HStack justifyContent="flex-end">
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => {
                          setPrizeCount(prizeCount - 1);
                        }}
                      >
                        Remove
                      </Button>
                    </HStack>
                  )}
                </VStack>
              </Box>
            );
          })}

          <Button
            onClick={() => {
              setPrizeCount(prizeCount + 1);
            }}
          >
            Add Prize
          </Button>

          <Divider />

          <Button colorScheme="purple">Create Contest</Button>
        </VStack>
      </Box>
    </VStack>
  );
}
