import React from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface ResizeHandleProps {
  onResize: (width: number, height: number, left: number, top: number) => void;
}

const cornerStyles: Record<Corner, string> = {
  "top-left": "top-0 left-0 cursor-nw-resize -translate-x-1/2 -translate-y-1/2",
  "top-right":
    "top-0 right-0 cursor-ne-resize translate-x-1/2 -translate-y-1/2",
  "bottom-left":
    "bottom-0 left-0 cursor-sw-resize -translate-x-1/2 translate-y-1/2",
  "bottom-right":
    "bottom-0 right-0 cursor-se-resize translate-x-1/2 translate-y-1/2",
};

export const ResizeHandle = ({ onResize }: ResizeHandleProps) => {
  const handleMouseDown = (corner: Corner) => (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.pageX;
    const startY = e.pageY;
    const element = e.currentTarget.parentElement?.firstElementChild;
    const rect = element?.getBoundingClientRect();
    if (!rect) return;

    // Get editor boundaries
    const editorElement = document.querySelector('[data-cy="craftjs-editor"]');
    const editorRect = editorElement?.getBoundingClientRect();
    if (!editorRect) return;

    const startWidth = rect.width;
    const startHeight = rect.height;
    const startLeft = rect.left;
    const startTop = rect.top;

    const handleMouseMove = (e: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;
      const deltaX = e.pageX - startX;
      const deltaY = e.pageY - startY;

      switch (corner) {
        case "top-left":
          newWidth = startWidth - deltaX;
          newHeight = startHeight - deltaY;
          newLeft = startLeft + deltaX;
          newTop = startTop + deltaY;
          break;
        case "top-right":
          newWidth = startWidth + deltaX;
          newHeight = startHeight - deltaY;
          newTop = startTop + deltaY;
          break;
        case "bottom-left":
          newWidth = startWidth - deltaX;
          newHeight = startHeight + deltaY;
          newLeft = startLeft + deltaX;
          break;
        case "bottom-right":
          newWidth = startWidth + deltaX;
          newHeight = startHeight + deltaY;
          break;
      }

      // Constrain to editor boundaries
      const rightBoundary = editorRect.right - 10; // Add some padding
      const bottomBoundary = editorRect.bottom - 10;
      const leftBoundary = editorRect.left + 10;
      const topBoundary = editorRect.top + 10;

      // Constrain width and position
      if (newLeft < leftBoundary) {
        newWidth += newLeft - leftBoundary;
        newLeft = leftBoundary;
      }
      if (newLeft + newWidth > rightBoundary) {
        newWidth = rightBoundary - newLeft;
      }

      // Constrain height and position
      if (newTop < topBoundary) {
        newHeight += newTop - topBoundary;
        newTop = topBoundary;
      }
      if (newTop + newHeight > bottomBoundary) {
        newHeight = bottomBoundary - newTop;
      }

      // Ensure minimum size
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(50, newHeight);

      onResize(newWidth, newHeight, newLeft, newTop);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {(Object.keys(cornerStyles) as Corner[]).map((corner) => (
        <div
          key={corner}
          onMouseDown={handleMouseDown(corner)}
          className={`absolute w-3 h-3 border-2 border-blue-500 bg-white rounded-full z-10 ${cornerStyles[corner]}`}
        />
      ))}
    </>
  );
};
