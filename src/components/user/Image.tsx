/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Image as MantineImage,
  Stack,
  FileButton,
  Button,
  NumberInput,
  Group,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useNode } from "@craftjs/core";
import { getSelectedStyle } from "./utils";
import { ResizeHandle } from './ResizeHandle';
import React from 'react';

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
  width?: number;
  height?: number;
  alt?: string;
  style?: React.CSSProperties;
}

export const Image = ({
  imageUrl: initialImageUrl = "",
  width = 400,
  height = 400,
  alt = "Image",
  style = {},
}: ImageProps) => {
  const {
    connectors: { connect, drag },
    selected,
    imageUrl,
    actions: { setProp },
    id,
  } = useNode((node) => ({
    selected: node.events.selected,
    imageUrl: node.data.props.imageUrl,
    id: node.id,
  }));

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

  // Store initial position on mount
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
      <Paper
        shadow="none"
        radius="none"
        style={{
          width,
          height,
          position: "relative",
          overflow: "hidden",
          ...getSelectedStyle(selected),
        }}
      >
        {(imageUrl || initialImageUrl) ? (
          <MantineImage
            src={imageUrl || initialImageUrl}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            Drop image here
          </div>
        )}
      </Paper>
      {selected && <ResizeHandle onResize={handleResize} />}
    </div>
  );
};

Image.craft = {
  props: {
    imageUrl: "",
    width: 400,
    height: 400,
    alt: "Image",
    style: {},
  },
  related: {
    settings: ImageSettings,
  },
};
