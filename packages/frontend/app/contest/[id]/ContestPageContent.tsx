"use client";
import { Box, VStack, Heading, HStack, Text } from "@chakra-ui/react";

import { DotDivider } from "@/components/DotDivider/DotDivider";
import { SingleEntry } from "@/components/SingleEntry/SingleEntry";
import { useGetContest } from "@/dataHooks/useGetContest";
import { useGetEntriesForContest } from "@/dataHooks/useGetEntriesForContest";

export function ContestPageContent({ contestId }: { contestId: string }) {
  const { data, isLoading } = useGetContest(contestId);
  const contestData = data?.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prizesData = contestData?.prizes as Array<any> | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const winnersData = contestData?.winners as Array<any> | undefined;

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
            <Text>{isLoading ? "—" : contestData?.deadline}</Text>
          </VStack>

          <VStack alignItems="stretch" gap={1}>
            <Heading fontSize="lg">Prizes:</Heading>
            {prizesData?.map(({ name, amount, description }, i) => (
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
            {winnersData?.map(({ name, amount, description }, i) => (
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

      <Heading size="lg" mb={4} mt={8}>
        Entries
      </Heading>

      <Entries contestId={contestId} />
    </VStack>
  );
}

function Entries({ contestId }: { contestId: string }) {
  const entries = useGetEntriesForContest(contestId);
  return (
    <VStack alignItems="stretch" gap={4}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {entries.data?.data.map((entry: any) => (
        <SingleEntry
          key={entry.id}
          id={entry.id}
          creator_fid={entry.creator_fid}
          content={entry.content}
          votes={entry.votes}
        />
      ))}
    </VStack>
  );
}
