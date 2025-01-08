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
import { ResizeableWrapper } from "../common/ResizeableWrapper";

interface ButtonProps {
  width?: number;
  height?: number;
  color?: string;
  variant?: string;
  size?: string;
  text?: React.ReactNode;
  style?: React.CSSProperties;
  bounds?: string | HTMLElement;
}

export const Button = ({ width, height, style, ...props }: ButtonProps) => {
  return (
    <ResizeableWrapper width={width} height={height} style={style}>
      <MantineButton
        {...props}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {props.text}
      </MantineButton>
    </ResizeableWrapper>
  );
};

export const ButtonSettings = () => {
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
        onChange={(e) => setProp((props: any) => (props.children = e.target.value))}
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

Button.craft = {
  props: {
    width: 200,
    height: 40,
    style: {},
    color: "",
    variant: "filled",
    size: "md",
    children: "Button",
  },
  related: {
    settings: ButtonSettings,
  },
  rules: {
    canDrag: () => {
      return false;
    },
  },
};
