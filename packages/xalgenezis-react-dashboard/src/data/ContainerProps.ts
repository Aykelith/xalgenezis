//= Typescript
import { ThemeProps } from "./ThemeProps";

export interface ContainerProps extends ThemeProps {
  vertical?: boolean;
  horizontal?: boolean;
  childrenVerticalAlign: "start" | "end" | "center";
  childrenHorizontalAlign: "start" | "end" | "center";
  stretchChildren: boolean;
  childrenSpaceAround: boolean;
  childrenSpaceBetween: boolean;
  childrenSpaceEvenly: boolean;
}
