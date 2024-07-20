import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import { colors } from "./foundations/colors";
import { fonts, fontWeights, textStyles } from "./foundations/font-typings";
import { radii } from "./foundations/radius";
import Input from "./components/input";
import Button from "./components/button";
import { styles } from "./styles";

const theme = extendTheme({
    styles,
    components:{
        Input,
        Button
    },
    colors,
    fonts,
    textStyles,
    fontWeights,
    radii
})
export default theme;