//= Structures & Data
// Own
import ColumnName from "../data/ColumnName";
import Breakpoint from "../data/Breakpoints";

export default (
  index: number,
  width: number,
  breakpoint?: Breakpoint
): string => {
  return `.${ColumnName}-${breakpoint ? `${breakpoint}-` : ""}${index} {
    flex: 0 0 auto;
    width: ${width}%;
  }`;
};
