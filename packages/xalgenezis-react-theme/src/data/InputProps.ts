//= Typescript
import { ThemeProps } from "./ThemeProps";

export interface InputProps extends ThemeProps {
  status?: "good" | "warning" | "bad";

  theme: ThemeProps["theme"] & {
    input: {
      boxShadow?: string;
      borderRadius: string;

      border: {
        default: string;
        good?: string;
        warning?: string;
        bad?: string;
      };
      backgroundColor: {
        default: string;
        good?: string;
        warning?: string;
        bad?: string;
      };
      color: {
        default: string;
        good?: string;
        warning?: string;
        bad?: string;
      };
      hover?: {
        border: {
          default: string;
          good?: string;
          warning?: string;
          bad?: string;
        };
        backgroundColor: {
          default: string;
          good?: string;
          warning?: string;
          bad?: string;
        };
        color: {
          default: string;
          good?: string;
          warning?: string;
          bad?: string;
        };
      };
    };
  };
}
