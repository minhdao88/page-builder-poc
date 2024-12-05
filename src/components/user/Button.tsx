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
import { ResizeHandle } from './ResizeHandle';

interface ButtonProps {
  width?: number;
  height?: number;
  color?: string;
  variant?: string;
  size?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Button = ({
  width = 120,
  height = 40,
  style = {},
  ...props
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
    id,
  } = useNode((node) => ({
    selected: node.events.selected,
    id: node.id,
  }));

  const [initialLeft, setInitialLeft] = React.useState(0);
  const [initialTop, setInitialTop] = React.useState(0);

  React.useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      setInitialLeft(rect.left);
      setInitialTop(rect.top);
    }
  }, [id]);

  const handleResize = (newWidth: number, newHeight: number, newLeft: number, newTop: number) => {
    setProp((props: any) => {
      props.width = newWidth;
      props.height = newHeight;
      props.style = {
        ...props.style,
        transform: `translate(${newLeft - initialLeft}px, ${newTop - initialTop}px)`,
      };
    });
  };

  return (
    <div
      id={id}
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className="relative w-fit h-fit"
      style={style}
    >
      <div
        style={{
          width,
          height,
          position: "relative",
          ...getSelectedStyle(selected),
        }}
      >
        <MantineButton
          {...props}
          style={{
            width: '100%',
            height: '100%',
            position: "relative",
          }}
        >
          {props.children}
        </MantineButton>
      </div>
      {selected && <ResizeHandle onResize={handleResize} />}
    </div>
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
    width: 120,
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
};
