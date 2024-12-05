import React from "react";
import { Card, Image, Badge, Group } from "@mantine/core";
import { Node, useNode, Element } from "@craftjs/core";
import { Text } from "./Text";
import { Button } from "./Button";
import { getSelectedStyle } from "./utils";

export const CardTop = ({ children }: { children: React.ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(ref);
        }
      }}
      className="text-only"
    >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    // Only accept Text
    canMoveIn: (incomingNodes: Node[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
};

export const CardBottom = ({ children }: { children: React.ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNodes: Node[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Button),
  },
};

export const EditableCard = () => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        ...getSelectedStyle(selected),
      }}
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Element id="text" is={CardTop} canvas>
        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>
      </Element>

      <Element id="buttons" is={CardBottom} canvas>
        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Element>
    </Card>
  );
};
