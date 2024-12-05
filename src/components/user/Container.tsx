/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, useNode } from "@craftjs/core";
import React from "react";
import { getSelectedStyle } from "./utils";
import { ColorInput, NumberInput, Paper, Stack } from "@mantine/core";

interface ContainerProps {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  editable?: boolean;
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
        onChange={(color) =>
          setProp((props: any) => (props.background = color))
        }
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
  editable = true,
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
        if (ref) {
          connect(drag(ref));
        }
      }}
      shadow="none"
      radius="none"
      style={{
        background,
        padding,
        position: "relative",
        ...getSelectedStyle(editable && selected),
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
    editable: true,
  },
  related: {
    settings: ContainerSettings,
  },
};
