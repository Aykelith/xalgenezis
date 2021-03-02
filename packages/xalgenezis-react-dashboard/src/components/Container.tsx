//= Functions & Modules
// Pacakges
import styled from "styled-components";

import { ContainerProps } from "../data/ContainerProps";

function getAlignItems(props: ContainerProps) {
  if (props.vertical) {
    if (props.childrenHorizontalAlign == "start") return "flex-start";
    else if (props.childrenHorizontalAlign == "end") return "flex-end";
    else if (props.childrenHorizontalAlign == "center") return "center";
  } else {
    if (props.childrenVerticalAlign == "start") return "flex-start";
    else if (props.childrenVerticalAlign == "end") return "flex-end";
    else if (props.childrenVerticalAlign == "center") return "center";
    if (props.stretchChildren) return "stretch";
  }

  return "normal";
}

function getJustifyContent(props: ContainerProps) {
  if (props.childrenSpaceBetween) return "space-between";
  else if (props.childrenSpaceAround) return "space-around";
  else if (props.childrenSpaceEvenly) return "space-evenly";

  if (props.vertical) {
    if (props.childrenVerticalAlign == "start") return "flex-start";
    else if (props.childrenVerticalAlign == "end") return "flex-end";
    else if (props.childrenVerticalAlign == "center") return "center";
    if (props.stretchChildren) return "stretch";
  } else {
    if (props.childrenHorizontalAlign == "start") return "flex-start";
    else if (props.childrenHorizontalAlign == "end") return "flex-end";
    else if (props.childrenHorizontalAlign == "center") return "center";
  }

  return "normal";
}

export default styled.div`
  display: flex;
  flex-direction: ${(props: ContainerProps) =>
    props.vertical ? "column" : "row"};
  align-items: ${(props: ContainerProps) => getAlignItems(props)};
  justify-content: ${(props: ContainerProps) => getJustifyContent(props)};
`;
