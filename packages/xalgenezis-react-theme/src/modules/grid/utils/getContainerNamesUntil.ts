//= Structures & Data
// Own
import GridContainerName from "../data/GridContainerName";
import Breakpoint from "../data/Breakpoints";
import BreakpointsValues from "../data/BreakpointsValues";

export default (breakpoint?: Breakpoint): string => {
  let names = `.${GridContainerName}`;

  for (let i = 0, length = BreakpointsValues.length; i < length; ++i) {
    names += `, .${GridContainerName}-${BreakpointsValues[i]}`;

    if (BreakpointsValues[i] === breakpoint) break;
  }

  if (breakpoint === undefined) names += `, .${GridContainerName}-fluid`;

  return names;
};
