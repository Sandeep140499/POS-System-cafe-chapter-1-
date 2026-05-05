import type { PaletteOptions } from "@mui/material/styles";
import { colors } from "./colors";

export const palette: PaletteOptions = {
  mode: "light",
  primary: {
    light: "#d8845c",
    main: "#c86030",
    dark: "#a8502a",
  },
  secondary: {
    light: colors.secondary[3],
    main: colors.secondary[4],
    dark: colors.secondary[6],
  },
  success: {
    light: colors.success[3],
    main: colors.success[5],
    dark: colors.success[7],
  },
  info: {
    light: colors.info[3],
    main: colors.info[5],
    dark: colors.info[7],
  },
  warning: {
    light: colors.warning[3],
    main: colors.warning[5],
    dark: colors.warning[7],
  },
  error: {
    light: colors.error[3],
    main: colors.error[5],
    dark: colors.error[7],
  },
  background: {
    default: "#f5f3ef",
    paper: "#ffffff",
  },
  text: {
    primary: "#1c1c1c",
    secondary: "#6b6b6b",
    disabled: "#9EA0AB",
  },
  divider: "#eae7e2",
};
