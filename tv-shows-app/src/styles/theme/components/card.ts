import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy"

const helpers = createMultiStyleConfigHelpers(cardAnatomy.keys)

const Card = helpers.defineMultiStyleConfig({
  baseStyle:{
    container:{
      overflow:"hidden",
      color:"purple",
      borderRadius:"cardRadius",
    },
    header:{
      padding: 0,
    },
    body:{

    },
    footer:{

    }
  },
  variants: {
    smallCard: {
        container:{
          width:"240px",
          height:"375px",
        },
        header:{
          height:"300px",
        },
        body:{
          padding:"18px 0 0 18px",
          textStyle:"subtitle.bold",
          lineHeight:1,
          display:"flex",
          flexDir:"column",
          gap:"8px"
        }
    },
    smallCardMobile: {
      container:{
        width:"90vw",
        height:"90vh",
      },
      header:{
        height:"90%",
      },
      body:{
        padding:"0 18px 0 18px",
        textStyle:"subtitle.bold",
        alignItems:"center",
        lineHeight:1,
        display:"flex",
        flexDir:"row",
        justifyContent:"space-between",
        gap:"8px"
      }
    },
    detailsCard: {
      container:{
        width:"100%",
        height:"600px",
      },
      header:{
        height:"440px",
      },
      body:{
        padding:"40px",
        textStyle:"headline",
        lineHeight:1,
        display:"grid",
        gridTemplateColumns: "50% 50%",
        gap:"8px"
      }
    },    
    detailsCardMobile: {
      container:{
        width:"100%",
        height:"90vh",
      },
      header:{
        height:"70%",
      },
      body:{
        padding:"24px 24px 0 24px",
        textStyle:"subtitle.bold",
        alignItems:"start",
        lineHeight:1,
        display:"flex",
        flexDir:"column",
        gap:"17px"
      }
    },
  },
});

export default Card;