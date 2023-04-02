import { useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react'
import Large from './Barcontent/Large';

const Bar = () => {
 
  const [show,setshow]=useState(false);

  const [ham] = useMediaQuery('(max-width: 500px)', {
   ssr: true,
   
  })

 


  return (
    <div>
          {
            !ham && <Large/>
          }

    </div>
  )
}

export default Bar