"use client";

import { Divider, Grid } from "@mantine/core";
import { Topbar } from "./Topbar";
import { Toolbox } from "./Toolbox";
import { CardBottom, CardTop, EditableCard } from "./user/Card";
import { Text } from "./user/Text";
import { Container } from "./user/Container";
import { Button } from "./user/Button";
import { Editor, Element, Frame } from "@craftjs/core";
import { SettingsPanel } from "./SettingsPanel";
import { Header } from "./user/Header";
import { Footer } from "./user/Footer";
import { Hero } from "./user/Hero";
import { Image } from "./user/Image";
import { FAQ } from "./user/FAQ";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { PreviewModal } from "./PreviewModal";

const PageEditor = () => {
  const [json, setJson] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const saved = localStorage.getItem("page-editor");
    if (saved) {
      setJson(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col h-screen">
      <Editor
        resolver={{
          EditableCard,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          Header,
          Footer,
          Hero,
          Image,
          FAQ,
        }}
      >
        <Topbar onPreview={open} />
        <Divider />
        <Grid
          grow
          gutter={0}
          styles={{
            root: {
              height: "100%",
            },
            inner: {
              height: "100%",
            },
          }}
        >
          <Grid.Col span={2} style={{ borderRight: "1px solid #e9ecef" }}>
            <Toolbox />
          </Grid.Col>
          <Grid.Col span={8} style={{ height: "100%" }} p="md" data-cy="craftjs-editor">
            <Frame data={json}>
              <Element is={Container} padding={5} canvas editable={false} />
            </Frame>
          </Grid.Col>
          <Grid.Col
            span={2}
            p="sm"
            style={{ borderLeft: "1px solid #e9ecef", height: "100%" }}
          >
            <SettingsPanel />
          </Grid.Col>
        </Grid>
        <PreviewModal opened={opened} onClose={close} />
      </Editor>
    </div>
  );
};

export default PageEditor;
