import { themes } from "@/config";
import styled from "styled-components";

const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

const Wrapper = styled.div`
  color: ${themes.main};
  text-align: center;
`;

export function LoadingDot() {
  return (
    <Wrapper>
      <Dots>Loading</Dots>
    </Wrapper>
  );
}
