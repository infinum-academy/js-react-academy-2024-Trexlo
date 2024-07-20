import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy"

const helpers = createMultiStyleConfigHelpers(inputAnatomy.keys)

const Input = helpers.defineMultiStyleConfig({
  variants: {
    authInput: {
        field:{
            height:"56px",
            color:"white",
            backgroundColor:"purple",
            border:"solid 2px white",
            borderRadius:"authInputRadius",
            textStyle: "smallCaption.regular",
            _placeholder:{
                opacity:1,
                textStyle: "smallCaption.regular",
                color:"inherit"
            }
        },
        addon:{
            color:"blue",
            height:"200px"
        },
        element:{
            height:"24px",
            width:"24px",
            margin:"16px 6px 16px 24px"
        }
    },
  },
});

export default Input;