/** @jsxImportSource frog/jsx */
import React from "react";
import { propsToStyles } from "@/lib/styles";

export const Text = ({
  size = 24,
  align = 'left',
  weight = 400,
  children,
  ...props
}: {
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center' | 'right';
  weight?: number;
  [_: string]: any;
}) => (
  <p
    style={{
      textAlign: align,
      fontSize: `${size}px`,
      fontWeight: weight,
      fontFamily: 'Radio Canada',
      ...propsToStyles(props),
    }}
  >
    {children}
  </p>
);