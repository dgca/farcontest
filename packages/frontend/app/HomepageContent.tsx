"use client";
import { Container } from "@chakra-ui/react";

import { CreateContestForm } from "@/components/CreateContestForm/CreateContestForm";

export function HomepageContent() {
  return (
    <Container maxW="container.lg">
      <CreateContestForm />
    </Container>
  );
}
