import React from 'react'
import {Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"

const Adminpanel = () => {
  return (
    <div style={{paddingTop:"100px"}}>
       
       <Button>
        <Link to="/addcocktail">Add new cocktail</Link>
       </Button>

    </div>
  )
}

export default Adminpanel