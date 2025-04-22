import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "@styles/globals.css";

//TODO: see https://mui.com/material-ui/customization/theming/?srsltid=AfmBOooZGbk-wGVI5I9dFe5td5nT_VW7WFmYehXgyv7gFQvNu16L_DBD#css-theme-variables
// and https://mui.com/material-ui/customization/default-theme/

//TODO: FONT (voir nextjs doc)

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "var(--tonic)",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
