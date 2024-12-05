import { useNode } from "@craftjs/core";
import { Center, Container } from "@mantine/core";
import React from "react";
import { getSelectedStyle } from "./utils";

export const Footer = ({
  background = "#fff",
  padding = 20,
}: {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <footer
      style={{
        background,
        padding: `${padding}px`,
        width: "100%",
        borderTop: "1px solid #ddd",
        marginTop: "auto",
        ...getSelectedStyle(selected),
      }}
      ref={(ref: HTMLElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <Container>
        <Center>Footer</Center>
      </Container>
    </footer>
  );
};
