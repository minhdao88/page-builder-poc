/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from "@craftjs/core";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { TextInput, Select, Stack } from "@mantine/core";
import { getSelectedStyle } from './utils';
import { ResizeHandle } from './ResizeHandle';

interface TextProps {
  text: string;
  fontSize: number;
  fontWeight: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
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
    connectors: { connect, drag },
    hasSelectedNode,
    selected,
    actions: { setProp },
    id,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    selected: state.events.selected,
    id: state.id,
  }));

  const [editable, setEditable] = useState(false);
  const [initialLeft, setInitialLeft] = React.useState(0);
  const [initialTop, setInitialTop] = React.useState(0);

  useEffect(() => {
    if (!hasSelectedNode) {
      setEditable(false);
    }
  }, [hasSelectedNode]);

  React.useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      setInitialLeft(rect.left);
      setInitialTop(rect.top);
    }
  }, [id]);

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
      <div
        style={{
          width,
          height,
          position: "relative",
          ...getSelectedStyle(selected),
        }}
        onClick={() => setEditable(true)}
      >
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
        />
      </div>
      {selected && <ResizeHandle onResize={handleResize} />}
    </div>
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
};
