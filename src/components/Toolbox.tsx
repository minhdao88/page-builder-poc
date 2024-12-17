/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Stack, Accordion } from "@mantine/core";
import { Element, useEditor } from "@craftjs/core";
import {
  IconLayout2,
  IconRectangle,
  IconTextResize,
  IconBox,
  IconLayoutNavbar,
  IconLayoutBottombar,
  IconPhoto,
  IconQuestionMark,
} from "@tabler/icons-react";
import { Container } from "./user/Container";
import { EditableCard } from "./user/Card";
import { Button } from "./user/Button";
import { Text } from "./user/Text";
import { Header } from "./user/Header";
import { Footer } from "./user/Footer";
import { Hero } from "./user/Hero";
import { Image } from "./user/Image";
import { FAQ } from './user/FAQ';

const ToolboxItem = ({ icon, label, onClick, ref }: any) => (
  <div
    ref={ref}
    className="tool-button flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Accordion defaultValue="layout">
      {/* Layout Components */}
      <Accordion.Item value="layout">
        <Accordion.Control icon={<IconLayout2 size={20} />}>
          Layout
        </Accordion.Control>
        <Accordion.Panel>
          <Stack gap="xs">
            <ToolboxItem
              icon={<IconLayoutNavbar size={20} />}
              label="Header"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(
                    ref,
                    <Header
                      brandName="Your Brand"
                      logoUrl=""
                      logoWidth={40}
                      logoHeight={40}
                    />
                  );
                }
              }}
            />
            <ToolboxItem
              icon={<IconLayoutBottombar size={20} />}
              label="Footer"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <Footer />);
                }
              }}
            />
            <ToolboxItem
              icon={<IconBox size={20} />}
              label="Container"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(
                    ref,
                    <Element is={Container} padding={20} canvas />
                  );
                }
              }}
            />
            <ToolboxItem
              icon={<IconBox size={20} />}
              label="Card"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <EditableCard />);
                }
              }}
            />
            <ToolboxItem
              icon={<IconBox size={20} />}
              label="Hero Section"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <Hero />);
                }
              }}
            />
            <ToolboxItem
              icon={<IconQuestionMark size={20} />}
              label="FAQ"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <FAQ />);
                }
              }}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>

      {/* Basic Elements */}
      <Accordion.Item value="elements">
        <Accordion.Control icon={<IconTextResize size={20} />}>
          Basic Elements
        </Accordion.Control>
        <Accordion.Panel>
          <Stack gap="xs">
            <ToolboxItem
              icon={<IconRectangle size={20} />}
              label="Button"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <Button>New button</Button>);
                }
              }}
            />
            <ToolboxItem
              icon={<IconTextResize size={20} />}
              label="Text"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <Text text='Hello world'/>);
                }
              }}
            />
            <ToolboxItem
              icon={<IconPhoto size={20} />}
              label="Image"
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  connectors.create(ref, <Image alt="Image" />);
                }
              }}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
