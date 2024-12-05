import { Modal, Divider } from "@mantine/core";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import {
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
} from "./user";

interface PreviewModalProps {
  opened: boolean;
  onClose: () => void;
}

export const PreviewModal = ({ opened, onClose }: PreviewModalProps) => {
  const { query } = useEditor();
  const json = query.serialize();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen
      title="Preview"
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Divider mb="md" />
      <Editor
        enabled={false}
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
        <Frame data={json}>
          {!json && <Element is={Container} padding={5} canvas />}
        </Frame>
      </Editor>
    </Modal>
  );
};
