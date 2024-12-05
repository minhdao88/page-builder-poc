import React from "react";
import { Switch, Button, Flex, Group, Title } from "@mantine/core";
import { useEditor } from "@craftjs/core";
import {
  IconResize,
  IconDeviceFloppy,
} from "@tabler/icons-react";

export const Topbar = () => {
  const [saved, setSaved] = React.useState(false);
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const handleSave = () => {
    const json = query.serialize();
    localStorage.setItem("page-editor", JSON.stringify(json));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Flex p={"sm"} align="center" justify="space-between">
      <Flex align="center">
        <IconResize size={32} style={{ marginRight: "8px" }} />
        <Title order={3}>Page Builder</Title>
      </Flex>
      <Group>
        <Switch
          checked={enabled}
          onChange={(ev) =>
            actions.setOptions(
              (options) => (options.enabled = ev.target.checked)
            )
          }
          label="Enable editing"
        />
        <Button
          size="sm"
          leftSection={<IconDeviceFloppy size={16} />}
          onClick={handleSave}
        >
          {saved ? "Saved" : "Save"}
        </Button>
      </Group>
    </Flex>
  );
};
