import { Box, Skeleton } from '@chakra-ui/react'
import React from 'react'

const Skeletons = () => {
    const arr=new Array(10).fill(0);
  return (
   <Box p={5} display="grid" gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(4,1fr)"}} gap="50px" justifyContent="space-between">
    
    {
        arr.map((el,i)=>
        <Skeleton key={i} height='260px' borderRadius="20px"/>
        )
    }
   </Box>
  )
}

export default Skeletons