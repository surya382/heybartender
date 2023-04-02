import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/color-mode";
import "./style.css"
import { useEffect } from 'react';
import { useContext } from 'react';
import { Authcontext } from '../context/Authcontext';


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
   
    const {authstate,logout}=useContext(Authcontext);
 

  return (
    <div className='nav'>
      
        <Flex backgroundColor={colorMode==="dark"?"#332642":"#f22d65"} color="white" justifyContent={{sm:"space-between", md:"center", lg:authstate.token?"space-between":"right"}} padding="15px">
          
       {authstate.token && <Heading fontFamily="cursive" size="md" width="140px">{authstate.name}</Heading>} 

          <Box  display="flex" justifyContent="space-between" width={{sm:"100%", md:"100%", lg:"60%"}}>
          <Heading fontFamily="cursive">Hey Bartender!</Heading>

          {authstate.token && <Button fontFamily="cursive"  _hover={{backgroundColor:"#f22d65",border:"1px solid white"}} backgroundColor="#f22d65" onClick={()=>logout()}>Logout</Button>}
           
          <Button className='modes' backgroundColor={colorMode==="dark"?"#332642":"#f22d65"} borderRadius="80px" onClick={() => toggleColorMode()}>{colorMode === "dark" ? (
             <SunIcon color="orange.200" />
              ) : (
            <MoonIcon color="blue.700" />
             )}</Button>

           </Box>

        </Flex>
        
        {
            colorMode!=="dark" && 
        
        <Box className='bottomnav' width="20%"   float="right">

        <Heading className='try' as="h4" fontFamily="cursive" size="sm" color={colorMode==="dark"?"#332642":"#f22d65"}>Try dark mode</Heading>
        <Box className='arrow'> <Image width="60%" src='https://cdn-icons-png.flaticon.com/512/64/64788.png'/></Box>
        </Box>}

        
    </div>
  )
}

export default Navbar