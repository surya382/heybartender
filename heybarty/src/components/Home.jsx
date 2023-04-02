import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react'
import { color } from 'framer-motion'
import React from 'react'
import {useNavigate} from "react-router-dom"
import "./style.css"

const Home = () => {

  const navigate=useNavigate();

  const redirect=()=>{
   navigate("/login");
  }
  return (
    <div className='home'>

       <Flex  width="100%" justifyContent='space-evenly' flexDirection={{sm:"column-reverse",md:"column-reverse",lg:"row"}}>

        <Box  className='imgbox' p={5} width={{sm:"100%", md:"100%" , lg:"50%"}} >
              <Image className='bartimg' height="450px" borderRadius="0px 80px 0px 80px" src='https://img.freepik.com/premium-photo/young-handsome-man-looking-desperate-frustrated-stressed-cocktail-bartender_1194-375700.jpg' width="100%" alt='brokem link'/>   
        </Box>

        <Box className='content' textAlign="center" p={5} width="50%" >
           <Heading>Are you getting frustrated with the guest demands?</Heading>
           <Heading mt={12}>Try exploring worldclass cocktail recipes and solutions for your problems here</Heading>
       
             <Button onClick={redirect} _hover={{backgroundColor:"#f22d65"}} width="120px" height="50px" backgroundColor="white" className='startbut' color="#f22d65" border="1px solid #f22d65" mt={14}>Start for free</Button>
        </Box>
        
        </Flex> 
       
    </div>
  )
}

export default Home