import { Box, Button, Flex, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const Topnav = ({sortby,filtby,search}) => {

  const [query,setquery]=useState("");


  const searchfor=()=>{
   
      search(query.toLowerCase());
    
  }

  const debouncing =(val)=>{
    let id;
    if(id){
      clearTimeout(id);
    }
     setquery(val);
    setTimeout(() => {
      search(val.toLowerCase());

    }, 2000);
  }

  return (
    <div>
        <Flex justifyContent="space-between" gap="20px" p={5}>
      
      <Box textAlign="left">
       
      <Select onChange={(e)=>filtby(e.target.value)}>
      <option value="">Filter by base</option>
        {/* <option value="">All</option> */}
        <option value="whiskey">Whiskey Based</option>
        <option value="rum">Rum Based</option>
        <option value="brandy">Brandy Based</option>
        <option value="cognac">Cognac Based</option>
        <option value="vodka">Vodka Based</option>
        <option value="gin">Gin Based</option>
        <option value="tequila">Tequila Based</option>
      </Select>
      </Box>
         
      
      <Box display="flex">
       <Input type="text" value={query} placeholder="search by cocktail name" onChange={(e)=>debouncing(e.target.value)}/>
       <Button onClick={searchfor}  color={'white'} backgroundColor="#f22d65" _hover={{backgroundColor:"#f22d65"}}>Search</Button>

      </Box>
      
       
     


      <Box>
        <Select onChange={(e)=>sortby(e.target.value)}>
          <option value="">Sort by price</option>
          <option value="asc">Price low to high</option>
          <option value="desc">Price high to low</option>
        </Select>
      </Box>


    </Flex>
    </div>
  )
}

export default Topnav