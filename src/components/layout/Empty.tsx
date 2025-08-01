import { LayoutProps } from "@/models";
import React from "react";

export const Empty = (props: LayoutProps) => {
  return <>{props.children}</>;
};
