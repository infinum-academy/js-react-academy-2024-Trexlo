import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import { colors } from "./foundations/colors";
import { fonts, fontWeights, textStyles } from "./foundations/font-typings";

const theme = extendTheme({
    styles: {
        global: {
          body: {
            bg: 'darkPurple',
          },
        },
      },
    components:{
        
    },
    colors,
    fonts,
    textStyles,
    fontWeights
})

export default theme;
