//= Typescript
import { ThemeProps } from "./ThemeProps";

export interface ButtonProps extends ThemeProps {
  small?: boolean;
  big?: boolean;
  normal?: boolean;

  theme: ThemeProps["theme"] & {
    button: {
      fontWeight: string;
      fontFamily?: string;
      small: {
        fontSize: string;
        padding: string;
        borderRadius: string;
      };
      normal: {
        fontSize: string;
        padding: string;
        borderRadius: string;
      };
      big: {
        fontSize: string;
        padding: string;
        borderRadius: string;
      };
    };
  };
}
