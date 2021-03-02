//= Structures & Data
// Own
import Breakpoints from "./Breakpoints";
import ThemeProps from "../../../data/ThemeProps";

interface GridThemeProps extends ThemeProps {
  theme: ThemeProps["theme"] & {
    grid: {
      columns?: number;

      breakpoints: {
        [Breakpoints.SM]: string;
        [Breakpoints.MD]: string;
        [Breakpoints.LG]: string;
        [Breakpoints.XL]: string;
        [Breakpoints.XXL]: string;
      };

      gridContainerWidths: {
        [Breakpoints.SM]: string;
        [Breakpoints.MD]: string;
        [Breakpoints.LG]: string;
        [Breakpoints.XL]: string;
        [Breakpoints.XXL]: string;
      };
    };
  };
}

export default GridThemeProps;
