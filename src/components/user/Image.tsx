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
  } = useNode((node) => ({
    selected: node.events.selected,
    imageUrl: node.data.props.imageUrl,
  }));

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <Paper
        shadow="none"
        radius="none"
        style={{
          width,
          height,
          position: "relative",
          overflow: "hidden",
          ...style,
          ...getSelectedStyle(selected),
        }}
      >
        {(imageUrl || initialImageUrl) ? (
          <MantineImage
            src={imageUrl || initialImageUrl}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3f4f6",
              color: "#9ca3af",
            }}
          >
            Drop image here
          </div>
        )}
      </Paper>
    </div>
  );
};

Image.craft = {
  props: {
    imageUrl: "",
    width: 400,
    height: 400,
    alt: "Image",
  },
  related: {
    settings: ImageSettings,
  },
};
