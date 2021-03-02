//= Functions & Modules
// Own
import getGlobalTheme from "../modules/grid/utils/getGlobalTheme";
// Packages
import { createGlobalStyle } from "styled-components";

//= Structures & Data
// Own
import ThemeProps from "../data/ThemeProps";
import GridThemeProps from "../modules/grid/data/GridThemeProps";

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

  ${(props: GridThemeProps) => getGlobalTheme(props)}
`;
