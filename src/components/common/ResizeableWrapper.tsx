/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNode } from "@craftjs/core";
import { ResizableBox } from "react-resizable";

export const ResizeableWrapper = ({
  children,
  width,
  height,
  style = {},
}: any) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));
  const [isResizing, setIsResizing] = React.useState(false);
  const [maxConstraints, setMaxConstraints] = React.useState<[number, number]>([
    2000, 2000,
  ]);
  const editorRef = React.useRef<HTMLElement | null>(null);

  // Get editor dimensions once on mount and on window resize
  React.useEffect(() => {
    const updateConstraints = () => {
      const editor = document.getElementById("craftjs-editor");
      if (editor) {
        editorRef.current = editor;
        setMaxConstraints([editor.clientWidth - 10, editor.clientHeight - 10]);
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const getHandleStyles = (handleAxis: string) => {
    const isCorner = handleAxis.length === 2;
    const baseStyles = {
      position: "absolute" as const,
      backgroundColor: "white",
      border: "1px solid rgb(0, 121, 242)",
      zIndex: 10,
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      transition: "all 0.2s ease",
      cursor: "move",
      display: selected ? "block" : "none",
    };

    if (isCorner) {
      return {
        ...baseStyles,
        [handleAxis.includes("n") ? "top" : "bottom"]: "-4px",
        [handleAxis.includes("w") ? "left" : "right"]: "-4px",
        cursor: `${handleAxis}-resize`,
      };
    }
    
    if (handleAxis === "n" || handleAxis === "s") {
      return {
        ...baseStyles,
        top: handleAxis === "s" ? '0' : 'auto',
        left: "50%",
        transform: "translate(-50%, -50%)",
        cursor: "ns-resize",
      };
    }
    if (handleAxis === "e" || handleAxis === "w") {
      return {
        ...baseStyles,
        left: handleAxis === 'e' ? '0' : '100%',
        top: "50%",
        transform: "translate(-50%, -50%)",
        cursor: "ew-resize",
      };
    }
  };

  if (!editorRef.current) return null;
  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(isResizing ? ref : drag(ref));
        }
      }}
      style={{ position: "relative", ...style }}
    >
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[50, 50]} // Minimum size
        maxConstraints={maxConstraints}
        onResizeStart={(e) => {
          e.stopPropagation();
          setIsResizing(true);
          setProp((props: any) => (props.isResizing = true));
        }}
        onResize={(e, { size }) => {
          e.stopPropagation();
          setProp((props: any) => {
            props.width = size.width;
            props.height = size.height;
          });
        }}
        onResizeStop={(e, { size }) => {
          e.stopPropagation();
          setIsResizing(false);
          setProp((props: any) => {
            props.width = size.width;
            props.height = size.height;
            props.isResizing = false;
          });
        }}
        resizeHandles={["se", "e", "s", "sw", "w", "nw", "n", "ne"]}
        handle={
          selected
            ? (h, ref) => (
                <div
                  ref={ref}
                  className={`resize-handle resize-handle-${h}`}
                  style={getHandleStyles(h)}
                />
              )
            : undefined
        }
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: selected ? "1px solid #1a73e8" : "none",
          }}
        >
          {children}
        </div>
      </ResizableBox>
    </div>
  );
};
