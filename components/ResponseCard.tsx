import { Divider, Group, Stack, Text } from "@mantine/core";
import { IconChefHat } from "@tabler/icons-react";
import styles from "../styles/ResponseCard.module.css";

const ResponseCard = ({ response }: { response: string }) => {
  return (
    <Stack gap={4}>
      <Divider
        my="xs"
        color="#E38B29"
        label={
          <Group gap={4}>
            <IconChefHat size={18} />
            <Text c="#E38B29" fz={18} fw={600}>
              chef.ai
            </Text>
          </Group>
        }
        labelPosition="left"
      />
      <pre className={styles.preformatted}>{response.trim()}</pre>
    </Stack>
  );
};

export default ResponseCard;
