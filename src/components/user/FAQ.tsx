/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextInput,
  Textarea,
  Button,
  ColorInput,
  NumberInput,
} from "@mantine/core";
import { useNode } from "@craftjs/core";
import { Accordion, Stack } from "@mantine/core";
import { ResizeableWrapper } from "../common/ResizeableWrapper";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  background?: string;
  padding?: number;
}

export const FAQSettings = () => {
  const {
    actions: { setProp },
    items,
    background,
    padding,
  } = useNode((node) => ({
    items: node.data.props.items,
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <Stack>
      {items?.map((item: FAQItem, index: number) => (
        <Stack key={index} gap="xs">
          <TextInput
            label={`Question ${index + 1}`}
            value={item.question}
            onChange={(e) =>
              setProp((props: any) => {
                props.items[index].question = e.target.value;
              })
            }
          />
          <Textarea
            label={`Answer ${index + 1}`}
            value={item.answer}
            onChange={(e) =>
              setProp((props: any) => {
                props.items[index].answer = e.target.value;
              })
            }
            minRows={2}
          />
        </Stack>
      ))}
      <Button
        variant="light"
        onClick={() =>
          setProp((props: any) => {
            props.items = [
              ...(props.items || []),
              { question: "New Question", answer: "New Answer" },
            ];
          })
        }
      >
        Add Question
      </Button>
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

export const FAQ = ({
  items = [
    {
      question: "What is this?",
      answer:
        "This is a FAQ component that helps you display frequently asked questions.",
    },
  ],
  background = "transparent",
  padding = 20,
}: FAQProps) => {

  return (
    <ResizeableWrapper style={{ padding: padding, background: background }}>
      <Accordion variant="separated">
        {items.map((item, index) => (
          <Accordion.Item key={index} value={`item-${index}`}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </ResizeableWrapper>
  );
};

FAQ.craft = {
  props: {
    items: [
      {
        question: "What is this?",
        answer:
          "This is a FAQ component that helps you display frequently asked questions.",
      },
      {
        question: "How do I add more questions?",
        answer:
          "You can add more questions in the settings panel when this component is selected.",
      },
    ],
    background: "transparent",
    padding: 20,
  },
  related: {
    settings: FAQSettings,
  },
};
