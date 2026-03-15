"use client";

import { useEffect } from "react";

/**
 * MediaProtection
 * ===============
 * Prevents casual downloading/saving of images and videos.
 * - Disables right-click on media elements
 * - Blocks drag-and-drop saving
 * - Blocks long-press save on mobile
 * - Blocks Ctrl+S / Cmd+S
 *
 * Note: This deters casual users. It cannot stop someone
 * determined enough to use browser dev tools or screenshots.
 */
export function MediaProtection() {
  useEffect(() => {
    // Block right-click on images, videos, and canvas elements
    function handleContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      if (
        tag === "img" ||
        tag === "video" ||
        tag === "canvas" ||
        tag === "iframe" ||
        target.closest("canvas") ||
        target.closest("video") ||
        target.closest(".gallery-item")
      ) {
        e.preventDefault();
      }
    }

    // Block dragging images
    function handleDragStart(e: DragEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === "img") {
        e.preventDefault();
      }
    }

    // Block Ctrl+S / Cmd+S page save
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
