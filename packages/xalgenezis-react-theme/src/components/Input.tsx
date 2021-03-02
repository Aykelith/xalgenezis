//= Functions & Modules
// Pacakges
import styled from "styled-components";

//= Structures & Data
import { InputProps } from "../data/InputProps";

function getPropStyle(
  props: InputProps,
  propName: "border" | "backgroundColor" | "color"
): string {
  if (props.status === "good")
    return (
      props.theme.input[propName].good || props.theme.input[propName].default
    );
  else if (props.status === "warning")
    return (
      props.theme.input[propName].warning || props.theme.input[propName].default
    );
  else if (props.status === "bad")
    return (
      props.theme.input[propName].bad || props.theme.input[propName].default
    );

  return props.theme.input[propName].default;
}

function getHoverPropStyle(
  props: InputProps,
  propName: "border" | "backgroundColor" | "color"
): string {
  if (!props.theme.input.hover) return "";

  if (props.status === "good")
    return (
      props.theme.input.hover[propName].good ||
      props.theme.input.hover[propName].default
    );
  else if (props.status === "warning")
    return (
      props.theme.input.hover[propName].warning ||
      props.theme.input.hover[propName].default
    );
  else if (props.status === "bad")
    return (
      props.theme.input.hover[propName].bad ||
      props.theme.input.hover[propName].default
    );

  return props.theme.input.hover[propName].default;
}

export default styled.input`
  border: ${(props: InputProps) => getPropStyle(props, "border")};
  background-color: ${(props: InputProps) =>
    getPropStyle(props, "backgroundColor")};
  color: ${(props: InputProps) => getPropStyle(props, "color")};

  border-radius: ${(props: InputProps) => props.theme.input.borderRadius};

  ${(props: InputProps) =>
    props.theme.input.boxShadow
      ? `box-shadow: ${props.theme.input.boxShadow};`
      : ""}

  ${(props: InputProps) => {
    if (props.theme.input.hover) {
      return `
        &:hover {  
          border: ${(props: InputProps) => getHoverPropStyle(props, "border")};
          background-color: ${(props: InputProps) =>
            getHoverPropStyle(props, "backgroundColor")};
          color: ${(props: InputProps) => getHoverPropStyle(props, "color")};
        }
      `;
    }

    return "";
  }}
`;
