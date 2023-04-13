import { Box, Button, Flex, Heading, Image, Input, Select, Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import { getCocktail } from '../redux/action';
import Pagination from './Barcontent/Pagination';
import Skeletons from './Barcontent/Skeleton';
import Topnav from './Barcontent/Topnav';



const Bar = () => {
 
  const [page,setpage]=useState(1);
  const [filt,setfilt]=useState("");
  const [sort,setsort]=useState("");
  const [q,setq]=useState("");
  const dispatch=useDispatch();
  const {authstate}=useContext(Authcontext);

  const cock=useSelector((state)=>state.cocktail)
  const load=useSelector((state)=>state.loading);

 useEffect(()=>{

 dispatch(getCocktail(page,sort,filt,q));

 },[page,sort,filt,q]);

 

 const sortby=(val)=>{
   
  setsort(val);
 }

 const filtby=(filterval)=>{
  setfilt(filterval);
 }

 const search=(query)=>{
   
  setq(query);
 }

 

  return (
    <div>
      
    <Topnav sortby={sortby} filtby={filtby} search={search}/>

    <Pagination count={7} currentPage={page} updateCurrentPage={(pan)=>setpage(pan)}/>

    
          
         {load?<Skeletons/>:cock.length==0?<Heading>No results found</Heading>:
         <Box display="grid" p={5} gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(4,1fr)"}} gap="20px">
          {
            cock.map((el,i)=>
            <Box key={el._id}><Link to={`/${el._id}`}>
              <Image width="70%" borderRadius="10px" margin="auto" src={el.image}/>
              <Heading size="md">{el.name.slice(0,1).toUpperCase() + el.name.slice(1)}</Heading>
              <Text>{el.base.slice(0,1).toUpperCase() + el.base.slice(1)} Based Cocktail</Text>
              <Text>Approx. selling price:- <b>{el.price} ₹</b></Text>
              </Link>
              {authstate.admin && <Button>Delete</Button>}
            </Box>
            )
          }
         
         </Box>} 
      
         

    </div>
  )
}

export default Bar