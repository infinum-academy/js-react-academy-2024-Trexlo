import { border, defineStyleConfig } from "@chakra-ui/react";
import { textStyles } from "../foundations/font-typings";

const navigationButtonBase = {
    height: "44px",
    width: "140px",
}
const buttonPrimaryColors = {
    background:"purple",
    color:"white",
}
const buttonSecondaryColors = {
    color:"purple",
    background:"white",
    border:"2px solid",
    borderColor:"purple"
}
const Button = defineStyleConfig({
    baseStyle:{
        height: "52px",
        width: "144px",
        padding: "19px",
        borderRadius: "full",
        bg: "white",
        color: "purple",
        ...textStyles.button,
    },
    variants:{
        baseButton:{
            ...textStyles.button,
        },
        modalButtonPrimary:{
            ...buttonPrimaryColors,
            _hover: {
                ...buttonSecondaryColors,
            }
        },
        modalButtonSecondary:{
            ...buttonSecondaryColors,
            _hover: {
                ...buttonPrimaryColors,
            }
        },
        navigationButton:{
            ...navigationButtonBase,
            bg: "darkPurple",
            color: "white",
            ...textStyles.title.regular,
        },
        navigationButtonActive:{
            ...navigationButtonBase,
            ...buttonPrimaryColors,
            ...textStyles.title.bold,
        },
    },
    defaultProps:{
        variant:"baseButton"
    }
});

export default Button;