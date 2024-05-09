import React, { useEffect, useState } from 'react'
import {Box, Button, Heading, Image, Text} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getCocktail } from '../../redux/action';
import Skeletons from '../Barcontent/Skeleton';
import Pagination from '../Barcontent/Pagination';
import Bar from '../Bar';

const Adminpanel = () => {

  const [page,setpage]=useState(1); 
  const dispatch=useDispatch();

  const cock=useSelector((state)=>state.cocktail);
  const load=useSelector((state)=>state.loading);

  // useEffect(()=>{

  //   dispatch(getCocktail(page));
   
  //   },[page]);


  return (
    <div style={{paddingTop:"100px"}}>
       
       <Button>
        <Link to="/addcocktail">Add new cocktail</Link>
       </Button>

       <Bar/>
    </div>
  )
}

export default Adminpanel