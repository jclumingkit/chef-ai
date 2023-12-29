import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSoup } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setResponseList: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const RecipeInputForm = ({ setResponseList, setIsLoading }: Props) => {
  const [ingredientList, setIngredientList] = useState("");

  const generateRecipe = async () => {
    try {
      setIsLoading(true);
      if (!ingredientList) {
        return notifications.show({
          message: "Please input a list of ingredients.",
          color: "orange",
        });
      }
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientList }),
      });

      const data = await response.json();
      setResponseList((prev) => [data.messageContent, ...prev]);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return notifications.show({
        message: "Error generating recipe.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper bg="#FFD8A9" p="md" radius="lg">
      <Group justify="space-between">
        <Title order={2} mb="md" c="#E38B29">
          Time to Whip Up Delicious Creations!
        </Title>
      </Group>
      <Box>
        <Text c="#224B0C">Type your ingredients below:</Text>
        <Flex gap="xs">
          <TextInput
            style={{ flex: 1 }}
            placeholder="Banana, flour, sugar"
            value={ingredientList}
            onChange={(e) => setIngredientList(e.currentTarget.value)}
          />
          <Button
            color="#224B0C"
            leftSection={<IconSoup size={16} />}
            onClick={() => generateRecipe()}
          >
            Generate
          </Button>
        </Flex>
      </Box>
    </Paper>
  );
};

export default RecipeInputForm;
