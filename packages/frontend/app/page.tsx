"use client";
import { Container } from "@chakra-ui/react";

import { CreateContestForm } from "@/components/CreateContestForm/CreateContestForm";

export default function Home() {
  return (
    <Container maxW="container.lg">
      <CreateContestForm />
    </Container>
  );
}
