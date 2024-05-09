import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react'
import { color } from 'framer-motion'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { Authcontext } from '../context/Authcontext';
import Bar from './Bar'
import "./style.css"

const Home = () => {

  const navigate=useNavigate();
 const {authstate}=useContext(Authcontext);
  const redirect=()=>{
   navigate("/login");
  }

  useEffect(()=>{
    
    if(authstate.admin){
      navigate("/admin");
    }
  },[]);

  return (
    <div className='home'>

      {
        authstate.token?<Bar/>:
      

       <Flex className='homeContainer' color="rgb(108, 168, 48)" width="100%" justifyContent='space-evenly' flexDirection={{sm:"column",md:"column",lg:"row"}}>

        <Box  className='imgbox' p={5} width={{sm:"100%", md:"100%" , lg:"50%"}} >
              <Image className='bartimg' src='https://img.freepik.com/premium-photo/young-handsome-man-looking-desperate-frustrated-stressed-cocktail-bartender_1194-375700.jpg' width="100%" alt='brokem link'/>   
        </Box>

        <Box className='content' textAlign="center" p={5} width="50%" margin="auto">
           <Heading>Are you getting frustrated with the guest demands?</Heading>
           <Heading mt={12}>Try exploring worldclass cocktail recipes and solutions for your problems here</Heading>
       
             <Button onClick={redirect} _hover={{backgroundColor:"#f22d65"}} width="120px" height="50px" backgroundColor="white" className='startbut' color="#f22d65" border="1px solid #f22d65" mt={14}>Start for free</Button>
        </Box>
        
        </Flex> 
}
       
    </div>
  )
}

export default Home