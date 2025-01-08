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
import { ResizeableWrapper } from "../common/ResizeableWrapper";

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
  return (
    <ResizeableWrapper>
      <Container
        size="lg"
        style={{
          background,
          padding: `${padding}px`,
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <Group justify="space-between" h="100%">
          <Group>
            <Element
              is={Image}
              alt="Brand"
              id="logo"
              imageUrl={logoUrl ?? "https://placehold.co/400"}
              width={logoWidth}
              height={logoHeight}
            />
            <Element
              is={Text}
              fontSize={24}
              fontWeight={700}
              id="brandName"
              text={brandName}
            />
          </Group>
          <Group>{children}</Group>
        </Group>
      </Container>
    </ResizeableWrapper>
  );
};

// Add Craft.js settings for the component
Header.craft = {
  related: {
    settings: HeaderSettings,
  },
};
