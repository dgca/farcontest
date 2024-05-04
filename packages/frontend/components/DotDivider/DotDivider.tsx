"use client";
import { Box, HStack, StackProps } from "@chakra-ui/react";

export function DotDivider(props: StackProps) {
  return (
    <HStack {...props}>
      <Box w={2} h={2} bg="#7F61C6" borderRadius="full" />
      <Box w={2} h={2} bg="#58BC82" borderRadius="full" />
      <Box w={2} h={2} bg="#5CA5FF" borderRadius="full" />
      <Box w={2} h={2} bg="#FFABDC" borderRadius="full" />
    </HStack>
  );
}
