//= Structures & Data
// Own
import ThemeProps from "../data/ThemeProps";
import DefaultColumns from "../data/DefaultColumns";

export default (props: ThemeProps): number => {
  return props.theme.grid.columns || DefaultColumns;
};
