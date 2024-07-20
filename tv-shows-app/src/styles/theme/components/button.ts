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
    }
});

export default Button;