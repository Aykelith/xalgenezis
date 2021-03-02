//= Structures & Data
// Own
import GridOffsetName from "../data/OffsetName";
import Breakpoint from "../data/Breakpoints";

export default (
  index: number,
  width: number,
  breakpoint?: Breakpoint
): string => {
  return `.${GridOffsetName}-${breakpoint ? `${breakpoint}-` : ""}${index} {
    margin-left: ${width}%;
  }`;
};
