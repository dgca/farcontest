import { Container } from "@chakra-ui/react";

import { CreateContestForm } from "@/components/CreateContestForm/CreateContestForm";
import { Layout } from "@/components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Container maxW="container.lg">
        <CreateContestForm />
      </Container>
    </Layout>
  );
}
