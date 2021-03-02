//= Functions & Modules
import { createGlobalStyle } from "styled-components";

import { ThemeProps } from "../data/ThemeProps";

export default createGlobalStyle`
  .x-padding-small {
    padding: ${(props: ThemeProps) => props.theme.padding.small};
  }

.x-padding-normal {
    padding: ${(props: ThemeProps) => props.theme.padding.normal};
  }

.x-padding-big {
    padding: ${(props: ThemeProps) => props.theme.padding.big};
  }
`;
