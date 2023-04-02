import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

//2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const colors = {
  colors: {
    primary: "#153e75",
  },
};

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
