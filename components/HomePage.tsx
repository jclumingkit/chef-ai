import {
  Container,
  LoadingOverlay,
  ScrollArea,
  Space,
  Stack,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import RecipeInputForm from "./RecipeInputForm";
import ResponseCard from "./ResponseCard";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseList, setResponseList] = useLocalStorage<string[]>({
    key: "response-list",
    defaultValue: [],
  });
  // const [responseList, setResponseList] = useState<string[]>([]);

  return (
    <Container bg="#FDEEDC" p="md" mih="100vh" fluid>
      <Space h="lg" />
      <Stack mx="auto" maw={600} pos="relative">
        <LoadingOverlay overlayProps={{ blur: 2 }} visible={isLoading} />
        <RecipeInputForm
          setResponseList={setResponseList}
          setIsLoading={setIsLoading}
        />
        {responseList.length > 0 && (
          <ScrollArea h={720}>
            <Stack>
              {responseList.map((response, idx) => (
                <ResponseCard
                  key={`response-card-${idx}`}
                  response={response}
                />
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
