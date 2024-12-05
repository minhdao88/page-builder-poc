/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  ColorInput,
  Button as MantineButton,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useNode } from "@craftjs/core";
import { getSelectedStyle } from "./utils";

export const Button = (props: any) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <MantineButton
      {...props}
      style={{
        position: "relative",
        display: "inline-block",
        ...getSelectedStyle(selected),
      }}
      ref={(ref: HTMLButtonElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    />
  );
};
const ButtonSettings = () => {
  const {
    actions: { setProp },
    color,
    variant,
    size,
    children,
  } = useNode((node) => ({
    color: node.data.props.color,
    variant: node.data.props.variant,
    size: node.data.props.size,
    children: node.data.props.children,
  }));

  return (
    <Stack>
      <TextInput
        label="Button Text"
        value={children}
        onChange={(e) =>
          setProp((props: any) => (props.children = e.target.value))
        }
      />
      <ColorInput
        label="Color"
        value={color}
        onChange={(value) => setProp((props: any) => (props.color = value))}
      />
      <Select
        label="Variant"
        value={variant}
        onChange={(value) => setProp((props: any) => (props.variant = value))}
        data={[
          { value: "filled", label: "Filled" },
          { value: "light", label: "Light" },
          { value: "outline", label: "Outline" },
          { value: "subtle", label: "Subtle" },
        ]}
      />
      <Select
        label="Size"
        value={size}
        onChange={(value) => setProp((props: any) => (props.size = value))}
        data={[
          { value: "xs", label: "Extra Small" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra Large" },
        ]}
      />
    </Stack>
  );
};

// Add Craft.js settings
Button.craft = {
  related: {
    settings: ButtonSettings,
  },
};
