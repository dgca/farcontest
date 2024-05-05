"use client";
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToggle } from "usehooks-ts";

import { DotDivider } from "../DotDivider/DotDivider";
import { QRCodeModal } from "../QRCodeModal/QRCodeModal";

import { parseFormData, useCreateContest } from "@/dataHooks/useCreateContest";
import { usePinataAuth } from "@/dataHooks/usePinataAuth";
import { toOrdinal } from "@/utils/toOrdinal";

const FORM_NAME = "create-contest-form";

export function CreateContestForm() {
  const [prizeCount, setPrizeCount] = useState(1);
  const { mutate: createContest } = useCreateContest();
  const toast = useToast();

  const pinataAuth = usePinataAuth();
  const [isLoginModalOpen, toggleIsLoginModalOpen] = useToggle(false);
  console.log({ pinataAuth });

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

        <VStack
          gap={6}
          alignItems="stretch"
          as="form"
          id={FORM_NAME}
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const parsed = parseFormData(formData);
            await createContest(parsed, {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Your contest has been created",
                  status: "success",
                  duration: 3000,
                });
                (e.target as HTMLFormElement).reset();
              },
              onError: () => {
                toast({
                  title: "Error",
                  description: "Something went wrong, please try again",
                  status: "error",
                  duration: 3000,
                });
              },
            });
          }}
        >
          <input type="hidden" name="creator_fid" value="6969" />

          <FormControl>
            <FormLabel>Contest Name</FormLabel>
            <Input type="text" name="contest_name" required />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" required />
          </FormControl>

          <FormControl>
            <FormLabel>End Date & Time</FormLabel>
            <Input
              required
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              name="date_time"
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
                      required
                      type="text"
                      defaultValue={`${toOrdinal(index + 1)} place`}
                      name={`prize_name_${index}`}
                    />
                  </FormControl>
                  <HStack alignItems="flex-start">
                    <FormControl>
                      <FormLabel>Amount</FormLabel>
                      <Input type="text" name={`prize_amount_${index}`} />
                    </FormControl>
                    {index === 0 && (
                      <FormControl>
                        <FormLabel>Token</FormLabel>
                        <Input
                          required
                          type="text"
                          placeholder="e.g. USDC or ETH"
                          name={`prize_token`}
                        />
                        <FormHelperText>
                          This token will apply to all prizes
                        </FormHelperText>
                      </FormControl>
                    )}
                  </HStack>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea name={`prize_description_${index}`} />
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

          <VStack alignItems="stretch">
            {pinataAuth.userAuthStatus !== "logged-in" && (
              <>
                <Button
                  colorScheme="purple"
                  type="button"
                  onClick={() => {
                    pinataAuth.handleLogin();
                    toggleIsLoginModalOpen();
                  }}
                >
                  Login w/ Farcaster
                </Button>
                {isLoginModalOpen && pinataAuth.deepLinkUrl && (
                  <QRCodeModal
                    onClose={() => {
                      toggleIsLoginModalOpen();
                      pinataAuth.handleCancel();
                    }}
                    deepLinkUrl={pinataAuth.deepLinkUrl}
                  />
                )}
              </>
            )}

            <Button
              colorScheme="blue"
              type="submit"
              form={FORM_NAME}
              isDisabled={pinataAuth.userAuthStatus !== "logged-in"}
            >
              Create Contest
            </Button>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
}
