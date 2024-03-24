/** @jsxImportSource frog/jsx */
import React from "react";
import { propsToStyles } from "@/lib/styles";

export const Box = ({
  children,
  fill = false,
  align = 'flex-start',
  justify = 'flex-start',
  direction = 'vertical',
  ...props
}: {
  children: React.ReactNode;
  fill?: boolean;
  align?: 'flex-start' | 'flex-end' | 'center';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  direction?: 'vertical' | 'horizontal';
  [_: string]: any;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: fill ? '100%' : undefined,
        flex: fill ? '1 1 0' : undefined,
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        ...propsToStyles(props),
      }}
    >
      {children}
    </div>
  )
};