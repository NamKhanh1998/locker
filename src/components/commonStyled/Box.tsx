import styled from "styled-components";
import { background, border, layout, position, space } from "styled-system";
import { BoxProps } from "./type";

const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export default Box;
