"use client";
import { Box, VStack, Heading, HStack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

import { DotDivider } from "@/components/DotDivider/DotDivider";
import { useGetContest } from "@/dataHooks/useGetContest";

export default function Contest({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetContest(params.id);
  const contestData = data?.data[0];

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
        <VStack alignItems="stretch" gap={1}>
          <Heading fontSize="2xl">
            {isLoading ? "Loading..." : contestData?.name}
          </Heading>
          {!isLoading && <Text>Created by: {contestData?.creator_fid}</Text>}
        </VStack>

        <DotDivider my={4} />

        <VStack alignItems="stretch" gap={4}>
          <VStack alignItems="stretch" gap={1}>
            <Heading fontSize="lg">Description:</Heading>
            <Text>{isLoading ? "—" : contestData?.description}</Text>
          </VStack>

          <VStack alignItems="stretch" gap={1}>
            <Heading fontSize="lg">Deadline:</Heading>
            <Text>
              {isLoading
                ? "—"
                : format(contestData?.deadline, "yyyy-MM-dd @ p")}
            </Text>
          </VStack>

          <VStack alignItems="stretch" gap={1}>
            <Heading fontSize="lg">Prizes:</Heading>
            {contestData?.prizes.map(({ name, amount, description }, i) => (
              <VStack alignItems="stretch" gap={1} key={i}>
                <HStack>
                  <Text fontWeight="bold">{name}: </Text>
                  <Text>
                    {amount} {contestData?.prize_token}
                  </Text>
                </HStack>
                {!!description && <Text>{description}</Text>}
              </VStack>
            ))}
          </VStack>

          <VStack alignItems="stretch" gap={1}>
            <Heading fontSize="lg">Winners:</Heading>
            <Text>No winners selected</Text>
            {contestData?.winners?.map(({ name, amount, description }, i) => (
              <VStack alignItems="stretch" gap={1} key={i}>
                <HStack>
                  <Text fontWeight="bold">{name}: </Text>
                  <Text>
                    {amount} {contestData?.prize_token}
                  </Text>
                </HStack>
                {!!description && <Text>{description}</Text>}
              </VStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
}
