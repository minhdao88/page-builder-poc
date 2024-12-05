/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from "@craftjs/core";
import React from "react";
import { getSelectedStyle } from "./utils";
import { ColorInput, NumberInput, Paper, Stack } from "@mantine/core";

interface ContainerProps {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
}

const ContainerSettings = () => {
  const {
    actions: { setProp },
    background,
    padding,
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <Stack>
      <ColorInput
        label="Background"
        value={background}
        onChange={(color) => setProp((props: any) => (props.background = color))}
      />
      <NumberInput
        label="Padding"
        value={padding}
        onChange={(val) => setProp((props: any) => (props.padding = val))}
        min={0}
        max={100}
      />
    </Stack>
  );
};

export const Container = ({
  background = "transparent",
  padding = 20,
  children,
}: ContainerProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <Paper
      ref={(ref: HTMLDivElement | null) => {
        if (ref) connect(drag(ref));
      }}
      shadow="none"
      style={{
        background,
        padding,
        position: "relative",
        ...getSelectedStyle(selected),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {children}
      </div>
    </Paper>
  );
};

Container.craft = {
  props: {
    background: "transparent",
    padding: 20,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};
