/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Image as MantineImage,
  Stack,
  FileButton,
  Button,
  NumberInput,
  Group,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useNode } from "@craftjs/core";
import React from "react";
import { ResizeableWrapper } from "../common/ResizeableWrapper";

export const ImageSettings = () => {
  const {
    actions: { setProp },
    imageUrl,
    width,
    height,
  } = useNode((node) => ({
    imageUrl: node.data.props.imageUrl,
    width: node.data.props.width,
    height: node.data.props.height,
  }));

  return (
    <Stack gap="sm">
      <Group>
        <FileButton
          onChange={(file) => {
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setProp((props: any) => (props.imageUrl = imageUrl));
            }
          }}
          accept="image/png,image/jpeg,image/gif"
        >
          {(props) => (
            <Button
              variant="light"
              size="sm"
              leftSection={<IconUpload size={14} />}
              {...props}
            >
              {imageUrl ? "Change Image" : "Upload Image"}
            </Button>
          )}
        </FileButton>
      </Group>

      <NumberInput
        label="Width"
        value={typeof width === "number" ? width : 400}
        onChange={(val) => setProp((props: any) => (props.width = val))}
      />

      <NumberInput
        label="Height"
        value={typeof height === "number" ? height : 400}
        onChange={(val) => setProp((props: any) => (props.height = val))}
      />
    </Stack>
  );
};

interface ImageProps {
  imageUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const Image = ({
  imageUrl,
  alt,
  width = 200,
  height = 200,
  style = {},
}: ImageProps) => {
  return (
    <ResizeableWrapper width={width} height={height} style={style}>
      <MantineImage
        src={imageUrl}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </ResizeableWrapper>
  );
};

Image.craft = {
  props: {
    imageUrl: "https://placehold.co/400",
    alt: "Random image",
    width: 200,
    height: 200,
    style: {},
    bounds: undefined,
  },
  related: {
    settings: ImageSettings,
  },
};

Image.craft = {
  props: {
    imageUrl: "https://placehold.co/400",
    alt: "Random image",
    width: 200,
    height: 200,
    style: {},
    bounds: undefined,
  },
  related: {
    settings: ImageSettings,
  },
  rules: {
    canDrag: () => {
      return false;
    },
  },
};
