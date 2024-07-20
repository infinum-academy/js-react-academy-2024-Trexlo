import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
    baseStyle:{
        height: "52px",
        width: "144px",
        padding: "19px",
        borderRadius: "full",
        bg: "white",
        color: "purple",
        textStyle: "button"
    },
    variants:{
        navigationButton:{
            height: "44px",
            width: "140px",
            borderRadius: "full",
            bg: "darkPurple",
            color: "white",
            textStyle: "title.regular"
        },
        navigationButtonActive:{
            height: "44px",
            width: "140px",
            borderRadius: "full",
            bg: "purple",
            color: "white",
            textStyle: "title.bold"
        },
    }
});

export default Button;