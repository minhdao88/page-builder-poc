/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from "@craftjs/core";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { TextInput } from "@mantine/core";
import { getSelectedStyle } from './utils';

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <TextInput
      value={fontSize}
      label="Font size"
      onChange={(e) => {
        setProp((props: any) => (props.fontSize = e.target.value));
      }}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Text = (props: any) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    fontSize,
    fontWeight,
    text,
    selected,
    actions: { setProp },
  } = useNode((state) => {
    return {
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
    fontSize: state.data.props.fontSize,
    fontWeight: state.data.props.fontWeight,
    text: state.data.props.text,
    selected: state.events.selected,
  }});
  
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!hasSelectedNode) {
      setEditable(false);
    }
  }, [hasSelectedNode]);

  return (
    <div
      {...props}
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        position: 'relative',
        ...getSelectedStyle(selected),
      }}
      onClick={() => setEditable(true)}
    >
      <ContentEditable
        disabled={!editable}
        html={text}
        style={{ fontSize: `${fontSize}px`, fontWeight: `${fontWeight}px` }}
        onChange={e => 
          setProp((props: any) => 
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")  
          )
        } 
        tagName="p"
      />
    </div>
  );
};

Text.craft = {
  // props: {
  //   text: '',
  //   fontSize: '16'
  // },
  related: {
    settings: TextSettings,
  },
};
