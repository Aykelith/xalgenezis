//= Structures & Data
// Own
import ThemeProps from "../data/ThemeProps";
import Breakpoint from "../data/Breakpoints";

export default (breakpoint: Breakpoint, props: ThemeProps): string => {
  return `@media (min-width: ${props.theme.grid.breakpoints[breakpoint]})`;
};
