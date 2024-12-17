/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode, Element } from "@craftjs/core";
import {
  ColorInput,
  Container,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { Text } from "./Text";
import { Button } from "./Button";
import { Image, ImageSettings } from "./Image";
import { ResizeableWrapper } from "../common/ResizeableWrapper";

export const Hero = ({
  title = "Welcome to our platform",
  description = "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.",
  buttonText = "Learn more",
  buttonColor = "blue",
  imageUrl = "",
  imagePosition = "right",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonColor?: string;
  background?: string;
  padding?: number;
  imageUrl?: string;
  imagePosition?: "left" | "right";
}) => {
  return (
    <ResizeableWrapper>
      <Container size="lg">
        <div
          style={{
            display: "flex",
            flexDirection: imagePosition === "left" ? "row-reverse" : "row",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Stack style={{ flex: 1 }} gap="xl">
            <Element
              is={Text}
              fontWeight={700}
              fontSize={32}
              id="title"
              text={title}
              canvas
            />
            <Element
              is={Text}
              fontWeight={600}
              fontSize={16}
              id="description"
              text={description}
              canvas
            />
            <Group mt="xl">
              <Element
                is={Button}
                size="lg"
                color={buttonColor}
                id="button"
                canvas
              >
                {buttonText}
              </Element>
            </Group>
          </Stack>

          <div style={{ flex: 1 }}>
            {imageUrl ? (
              <Element
                is={Image}
                imageUrl={imageUrl}
                alt="Hero"
                id="image"
                canvas
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <Element
                is={Image}
                imageUrl={"https://placehold.co/400"}
                alt="Hero"
                id="image"
                canvas
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      </Container>
    </ResizeableWrapper>
  );
};
const HeroSettings = () => {
  const {
    actions: { setProp },
    title,
    description,
    buttonText,
    imagePosition,
    background,
    padding,
  } = useNode((node) => ({
    title: node.data.props.title,
    description: node.data.props.description,
    buttonText: node.data.props.buttonText,
    imagePosition: node.data.props.imagePosition,
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <Stack>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) =>
          setProp((props: any) => (props.title = e.target.value))
        }
      />
      <TextInput
        label="Description"
        value={description}
        onChange={(e) =>
          setProp((props: any) => (props.description = e.target.value))
        }
      />
      <TextInput
        label="Button Text"
        value={buttonText}
        onChange={(e) =>
          setProp((props: any) => (props.buttonText = e.target.value))
        }
      />
      <Select
        label="Image Position"
        value={imagePosition}
        onChange={(value) =>
          setProp((props: any) => (props.imagePosition = value))
        }
        data={[
          { value: "right", label: "Right" },
          { value: "left", label: "Left" },
        ]}
      />
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
      <ImageSettings />
    </Stack>
  );
};

// Add Craft.js settings
Hero.craft = {
  related: {
    settings: HeroSettings,
  },
};
