import { useEditor } from "@craftjs/core";
import { Box, Button, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });
  console.log('selected', selected);
  return selected ? (
    <Box mt={2} px={2} py={2}>
      <Box pb={2}>
        <Text variant="heading" fw={"bold"} fz={"h4"}>
          {selected.name} settings
        </Text>
      </Box>
      <Box py="xs">
        {selected.settings && React.createElement(selected.settings)}
      </Box>
      {selected.isDeletable && (
        <Button
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={() => {
            actions.delete(selected.id);
          }}
        >
          Delete
        </Button>
      )}
    </Box>
  ) : null;
};
