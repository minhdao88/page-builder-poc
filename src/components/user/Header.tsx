/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Container,
  Group,
  Stack,
  ColorInput,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useNode, Element } from "@craftjs/core";
import { Text } from "./Text";
import { Image } from "./Image";
import { ImageSettings } from "./Image";
import { getSelectedStyle } from "./utils";

const HeaderSettings = () => {
  const {
    actions: { setProp },
    background,
    padding,
    brandName,
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    brandName: node.data.props.brandName,
  }));

  return (
    <Stack>
      <TextInput
        label="Brand Name"
        value={brandName}
        onChange={(e) =>
          setProp((props: any) => (props.brandName = e.target.value))
        }
      />
      <ImageSettings />
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
      />
    </Stack>
  );
};

export const Header = ({
  background = "#ffffff",
  padding = 10,
  brandName = "Your Brand",
  logoUrl = "",
  logoWidth = 40,
  logoHeight = 40,
  children,
}: {
  background?: string;
  padding?: number;
  brandName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <header
      style={{
        background,
        padding: `${padding}px`,
        borderBottom: "1px solid #e9ecef",
        ...getSelectedStyle(selected),
      }}
      ref={(ref: HTMLElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <Container size="lg">
        <Group justify="space-between" h="100%">
          <Group>
            <Element
              is={Image}
              alt="Brand"
              id="logo"
              imageUrl={logoUrl}
              width={logoWidth}
              height={logoHeight}
            />
            <Element 
              is={Text} 
              size="xl" 
              fw={700} 
              id="brandName"
              text={brandName}
            />
          </Group>
          <Group>{children}</Group>
        </Group>
      </Container>
    </header>
  );
};

// Add Craft.js settings for the component
Header.craft = {
  related: {
    settings: HeaderSettings,
  },
};
