import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#00ff00",
    },
    secondary: {
      main: "#ff0000",
    },
  },
};

export const theme = createTheme(themeOptions);
