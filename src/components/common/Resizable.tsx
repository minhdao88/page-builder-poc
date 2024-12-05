/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from "@craftjs/core";
import { Box } from "@mantine/core";
import { ReactNode } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface ResizableProps {
  children: ReactNode;
  minWidth?: number;
  minHeight?: number;
}

export const Resizable = ({
  children,
  minWidth = 50,
  minHeight = 50,
}: ResizableProps) => {
  const {
    selected,
    actions: { setProp },
    nodeWidth,
    nodeHeight,
  } = useNode((node) => ({
    nodeWidth: node.data.props.width,
    nodeHeight: node.data.props.height,
    selected: node.events.selected,
  }));

  const onResize = (
    e: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    setProp((props: any) => {
      props.width = size.width;
      props.height = size.height;
    });
  };

  return (
    <Box style={{ position: "relative" }}>
      {selected ? (
        <ResizableBox
          width={nodeWidth}
          height={nodeHeight}
          minConstraints={[minWidth, minHeight]}
          onResize={onResize}
          resizeHandles={["sw", "se", "nw", "ne", "w", "e", "n", "s"]}
          handle={(handleAxis, ref) => (
            <div
              ref={ref}
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                background: "#1c7ed6",
                borderRadius: "50%",
                ...getHandleStyles(handleAxis),
              }}
            />
          )}
        >
          <div style={{ width: "100%", height: "100%" }}>{children}</div>
        </ResizableBox>
      ) : (
        <div style={{ width: nodeWidth, height: nodeHeight }}>{children}</div>
      )}
    </Box>
  );
};

// Helper function to position handles
const getHandleStyles = (handleAxis: string): React.CSSProperties => {
  const styles: { [key: string]: React.CSSProperties } = {
    sw: { bottom: -5, left: -5, cursor: "sw-resize" },
    se: { bottom: -5, right: -5, cursor: "se-resize" },
    nw: { top: -5, left: -5, cursor: "nw-resize" },
    ne: { top: -5, right: -5, cursor: "ne-resize" },
    w: {
      left: -5,
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "w-resize",
    },
    e: {
      right: -5,
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "e-resize",
    },
    n: {
      top: -5,
      left: "50%",
      transform: "translateX(-50%)",
      cursor: "n-resize",
    },
    s: {
      bottom: -5,
      left: "50%",
      transform: "translateX(-50%)",
      cursor: "s-resize",
    },
  };
  return styles[handleAxis] || {};
};
