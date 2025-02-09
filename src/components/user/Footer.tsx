/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode, Element } from "@craftjs/core";
import {
  Center,
  Container,
  ColorInput,
  NumberInput,
  Stack,
} from "@mantine/core";
import React from "react";
import { Text } from "./Text";
import { ResizeableWrapper } from "../common/ResizeableWrapper";

const FooterSettings = () => {
  const {
    actions: { setProp },
    background,
    padding,
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <Stack gap="sm">
      <ColorInput
        label="Background Color"
        value={background}
        onChange={(color) =>
          setProp((props: any) => (props.background = color))
        }
      />
      <NumberInput
        label="Padding"
        value={padding}
        onChange={(value) => setProp((props: any) => (props.padding = value))}
        min={0}
        max={100}
      />
    </Stack>
  );
};

export const Footer = ({
  background = "#fff",
  padding = 20,
}: {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
}) => {
  return (
    <ResizeableWrapper>
      <footer
        style={{
          background,
          padding: `${padding}px`,
          width: "100%",
          borderTop: "1px solid #ddd",
          marginTop: "auto",
        }}
      >
        <Container>
          <Center>
            <Element id="footer-text" is={Text} canvas text="Footer" />
          </Center>
        </Container>
      </footer>
    </ResizeableWrapper>
  );
};

Footer.craft = {
  props: {
    background: "#fff",
    padding: 20,
  },
  related: {
    settings: FooterSettings,
  },
};
