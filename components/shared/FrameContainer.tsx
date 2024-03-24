/** @jsxImportSource frog/jsx */
import React from "react";

export const FrameContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        background: "white",
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      {children}
    </div>
  )
};