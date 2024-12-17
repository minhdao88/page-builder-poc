/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from "@craftjs/core";
import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { TextInput, Select, Stack } from "@mantine/core";
import { ResizeableWrapper } from "../common/ResizeableWrapper";

interface TextProps {
  text: string;
  fontSize: number;
  fontWeight: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  bounds?: string | HTMLElement;
}

export const Text = ({
  text = "Text",
  fontSize = 16,
  fontWeight = 400,
  width = 200,
  height = 50,
  style = {},
}: TextProps) => {
  const {
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  return (
    <ResizeableWrapper width={width} height={height} style={style}>
      <ContentEditable
        disabled={!editable}
        html={text}
        style={{ 
          fontSize: `${fontSize}px`, 
          fontWeight,
          width: '100%',
          height: '100%',
        }}
        onChange={e => 
          setProp((props: any) => 
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")  
          )
        } 
        tagName="p"
        onClick={() => setEditable(true)}
      />
    </ResizeableWrapper>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    fontWeight,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
  }));

  return (
    <Stack>
      <TextInput
        label="Font size"
        type="number"
        value={fontSize}
        onChange={(e) => {
          setProp((props: any) => (props.fontSize = parseInt(e.target.value)));
        }}
      />
      <Select
        label="Font weight"
        value={fontWeight?.toString()}
        onChange={(value) => {
          setProp((props: any) => (props.fontWeight = parseInt(value || "400")));
        }}
        data={[
          { value: "300", label: "Light" },
          { value: "400", label: "Regular" },
          { value: "500", label: "Medium" },
          { value: "600", label: "Semi Bold" },
          { value: "700", label: "Bold" },
          { value: "800", label: "Extra Bold" },
        ]}
      />
    </Stack>
  );
};

Text.craft = {
  props: {
    text: "Text",
    fontSize: 16,
    fontWeight: 400,
    width: 200,
    height: 50,
    style: {},
  },
  related: {
    settings: TextSettings,
  },
  rules: {
    canDrag: () => {
      return false;
    },
  },
};
