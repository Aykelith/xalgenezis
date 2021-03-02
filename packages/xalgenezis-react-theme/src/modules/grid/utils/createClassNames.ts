//= Structures & Data
// Own
import Breakpoint from "../data/Breakpoints";
import BreakpointsValues from "../data/BreakpointsValues";

export default (
  fieldName: string,
  props: {
    [Breakpoint.SM]?: number;
    [Breakpoint.MD]?: number;
    [Breakpoint.LG]?: number;
    [Breakpoint.XL]?: number;
    [Breakpoint.XXL]?: number;
    normal?: number;
  },
  hasDefault: boolean
): string => {
  let className = "";

  for (let i = 0, length = BreakpointsValues.length; i < length; ++i) {
    if (props[BreakpointsValues[i]]) {
      className += ` .${fieldName}-${BreakpointsValues[i]}-${
        props[BreakpointsValues[i]]
      }`;
    }
  }

  if (props.normal) className += ` .${fieldName}-${props.normal}`;
  if (hasDefault && className === "") className = `.${fieldName}`;

  return className;
};
