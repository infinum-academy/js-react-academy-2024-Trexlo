import { defineStyleConfig } from "@chakra-ui/react";
import { textStyles } from "../foundations/font-typings";

const navigationButtonBase = {
    height: "44px",
    width: "140px",
    borderRadius: "full",
}

const Button = defineStyleConfig({
    baseStyle:{
        height: "52px",
        width: "144px",
        padding: "19px",
        borderRadius: "full",
        bg: "white",
        color: "purple",
        ...textStyles.button
    },
    variants:{
        navigationButton:{
            ...navigationButtonBase,
            bg: "darkPurple",
            color: "white",
            ...textStyles.title.regular,
        },
        navigationButtonActive:{
            ...navigationButtonBase,
            bg: "purple",
            color: "white",
            ...textStyles.title.bold,
        },
    }
});

export default Button;