//= Functions & Modules
// Own
import getContainerNamesUntil from "../utils/getContainerNamesUntil";
import createMediaQuery from "../utils/createMediaQuery";
import getColumns from "../utils/getColumns";
import getColumnUnit from "../utils/getColumnUnit";
import getColumnsUtilArray from "../utils/getColumnsUtilArray";
import getColumnIndexStyle from "../utils/getColumnIndexStyle";
import getOffsetIndexStyle from "../utils/getOffsetIndexStyle";

//= Structures & Data
// Own
import GridThemeProps from "../data/GridThemeProps";
import Breakpoint from "../data/Breakpoints";
import BreakpointsValues from "../data/BreakpointsValues";
import GridColumnName from "../data/ColumnName";
import GridRowName from "../data/RowName";

function getColumnsStyle(
  columnsUtilArray: number[],
  breakpoint?: Breakpoint
): string {
  return columnsUtilArray
    .map(
      (width: number, index: number) =>
        `${getColumnIndexStyle(index + 1, width, breakpoint)}\n`
    )
    .join("\n");
}

function getOffsetsStyle(
  columnsUtilArray: number[],
  breakpoint?: Breakpoint
): string {
  return columnsUtilArray
    .map(
      (width: number, index: number) =>
        `${getOffsetIndexStyle(index + 1, width, breakpoint)}\n`
    )
    .join("\n");
}

function getMediaQueriesStyles(
  props: GridThemeProps,
  columnsUtilArray: number[]
): string {
  return BreakpointsValues.map(
    (breakpoint: Breakpoint) => `${createMediaQuery(breakpoint, props)} {
      ${getContainerNamesUntil(breakpoint)} {
        max-width: ${props.theme.grid.gridContainerWidths[breakpoint]}px;
      }

      ${getColumnsStyle(columnsUtilArray, breakpoint)}
      ${getOffsetsStyle(columnsUtilArray, breakpoint)}
    }`
  ).join("\n");
}

export default (props: GridThemeProps) => {
  const columns: number = getColumns(props);
  const columnUnit: number = getColumnUnit(columns);
  const columnsUtilArray: number[] = getColumnsUtilArray(columns, columnUnit);

  return `${getContainerNamesUntil()} {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
    }

    .${GridRowName} {
      display: flex;
      flex-wrap: wrap;

      > * {
        box-string: border-box;
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
      }
    }

    .${GridColumnName} {
      flex: 1 0 0%;
    }

    ${getColumnsStyle(columnsUtilArray)}
    ${getOffsetsStyle(columnsUtilArray)}
    ${getMediaQueriesStyles(props, columnsUtilArray)}
  `;
};
