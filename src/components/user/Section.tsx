/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { Container } from "./Container";
import { Text, TextSettings } from "./Text";
import { Button, ButtonSettings } from "./Button";
import { Image, ImageSettings } from "./Image";
import { Column, ColumnSettings } from "./Column";
import { Row } from "./Row";

const componentMap = {
  Container,
  Column,
  Row,
  Text,
  Button,
  Image,
} as const;

// Map of settings components
const settingsMap = {
  Column: ColumnSettings,
  Text: TextSettings,
  Button: ButtonSettings,
  Image: ImageSettings,
} as const;

interface ComponentData {
  type: string;
  props: Record<string, any>;
  children?: ComponentData[];
}

interface SectionProps {
  data: ComponentData;
}

// Settings component that renders based on data type
const SectionSettings = () => {
  const {
    data,
    actions: { setProp },
  } = useNode((node) => ({
    data: node.data.props.data,
  }));

  console.log("section settings", data);

  const SettingsComponent = settingsMap[data.type as keyof typeof settingsMap];

  if (!SettingsComponent) {
    return <div>No settings available for {data.type}</div>;
  }

  const handleUpdate = (newProps: Partial<typeof data.props>) => {
    setProp((props: any) => {
      props.data = {
        ...props.data,
        props: {
          ...props.data.props,
          ...newProps,
        },
      };
    });
  };

  return <SettingsComponent {...data.props} onUpdate={handleUpdate} />;
};

export const Section = ({ data }: SectionProps) => {
  const { connectors } = useNode();

  const renderComponent = ({ type, props, children = [] }: ComponentData) => {
    const Component = componentMap[type];

    if (!Component) {
      console.warn(`Component ${type} not found`);
      return null;
    }

    const renderedChildren = children.map((child, index) => (
      <React.Fragment key={index}>{renderComponent(child)}</React.Fragment>
    ));

    return <Component {...props}>{renderedChildren}</Component>;
  };

  return (
    <section
      ref={(ref) => {
        if (ref) {
          connectors.connect(ref as HTMLElement);
        }
      }}
      style={{ padding: "20px" }}
    >
      <Element id="section" is={'div'} canvas>
        {data.children?.map((child, index) => (
          <React.Fragment key={index}>{renderComponent(child)}</React.Fragment>
        ))}
      </Element>
    </section>
  );
};

Section.craft = {
  props: {
    data: {} as ComponentData,
  },
  related: {
    settings: SectionSettings,
  },
};
