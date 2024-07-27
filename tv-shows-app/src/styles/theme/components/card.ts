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
          aspectRatio:240/375,
          width:"100%",
        },
        header:{
          height:300 * 100 / 375+"%",
        },
        body:{
          padding:`${1800/240}% 0 0 ${1800/240}%`,
          textStyle:"subtitle.bold",
          lineHeight:1,
          display:"flex",
          flexDir:"column",
          gap:"8px"
        }
    },
    smallCardMobile: {
      container:{
        width:"100%",
        height:"100%",
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
    profileCard: {
      container:{
        width:"100%",
        flexGrow:1,
        bg:"darkPurple",
        alignItems:"center",
        justifyContent:"center",
      },
      header:{
        textAlign:"center",
        height:"fit-content",
      },
      footer:{
        margin:5,
        mt:"39px",
        width:["75%", "75%", "600px"],
        aspectRatio:[1,1,6/4],
        rounded:20,
        bg:"purple",
        alignItems:"center",
        justifyContent:"center",
        padding:5,
        display:"flex",
        flexDir:"column",
        border:"2px dashed",
        borderColor:"darkPurple",
        _hover:{
          border:"2px solid",
          borderColor:"lightPurple",
        }
      }
    },
  },
});

export default Card;