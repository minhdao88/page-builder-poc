import React from "react";
import { useNode } from "@craftjs/core";
import { ResizeHandle } from "../ResizeHandle";
import { getSelectedStyle } from "../utils";

export interface ResizableProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

interface ResizableWrapperProps {
  children: React.ReactNode;
  minWidth?: number;
  minHeight?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  onResize?: (
    width: number,
    height: number,
    style: React.CSSProperties
  ) => void;
}

export function ResizableWrapper<T extends ResizableProps>({
  children,
  defaultWidth = 120,
  defaultHeight = 40,
  onResize,
}: ResizableWrapperProps) {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
    id,
    style,
  } = useNode((node) => ({
    selected: node.events.selected,
    id: node.id,
    style: node.data.props.style,
  }));

  const [initialLeft, setInitialLeft] = React.useState(0);
  const [initialTop, setInitialTop] = React.useState(0);

  React.useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      setInitialLeft(rect.left);
      setInitialTop(rect.top);
    }
  }, [id]);

  const handleResize = (
    newWidth: number,
    newHeight: number,
    newLeft: number,
    newTop: number
  ) => {
    setProp((props: T) => {
      props.width = newWidth;
      props.height = newHeight;
      props.style = {
        ...props.style,
        transform: `translate(${newLeft - initialLeft}px, ${
          newTop - initialTop
        }px)`,
      };
    });

    onResize?.(newWidth, newHeight, {
      transform: `translate(${newLeft - initialLeft}px, ${
        newTop - initialTop
      }px)`,
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
          width: defaultWidth,
          height: defaultHeight,
          position: "relative",
          ...getSelectedStyle(selected),
        }}
      >
        {children}
      </div>
      {selected && <ResizeHandle onResize={handleResize} />}
    </div>
  );
}
