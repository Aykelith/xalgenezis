//= Functions & Modules
// Pacakges
import styled, { css } from "styled-components";

import { ButtonProps } from "../data/ButtonProps";

function getButtonSize(props: ButtonProps) {
  if (props.small) return "small";
  else if (props.big) return "big";
  return "normal";
}

export const style = css`
  cursor: pointer;
  border-width: 0;

  font-weight: ${(props: ButtonProps) => props.theme.button.fontWeight};
  font-family: ${(props: ButtonProps) =>
    props.theme.button.fontFamily || props.theme.fontFamily};

  font-size: ${(props: ButtonProps) =>
    props.theme.button[getButtonSize(props)].fontSize};

  padding: ${(props: ButtonProps) =>
    props.theme.button[getButtonSize(props)].padding};

  border-radius: ${(props: ButtonProps) =>
    props.theme.button[getButtonSize(props)].borderRadius};
`;

export default styled.button`
  ${style}
`;
