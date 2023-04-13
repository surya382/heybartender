import { Box, Flex, Heading, Image, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Authcontext } from '../context/Authcontext';
import { singlecock } from '../redux/action';

const SingleDrink = () => {
  const {id}=useParams();
  const {authstate}=useContext(Authcontext);
  const navigate=useNavigate();

  const data=useSelector((state)=>state.single);
  const load=useSelector((state)=>state.loading);

  const dispatch=useDispatch();

  useEffect(()=>{
      
    if(!authstate.token){
      navigate("/");
    }
    dispatch(singlecock(id));

  },[authstate.token])

  console.log(data);
  return (
    <div style={{paddingTop:"140px"}}>

      {
        load?<Stack >
        <Skeleton margin="auto" height='300px' width="50%"/>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>:data.name?
      <Box>

        <Box width={{'sm':"40%",'md':"30%",'lg':"20%"}} margin="auto"><Image src={data.image} borderRadius="100%" width="100%" alt='broken'/></Box>
         <Heading size="lg" mt={3}>{data.name.slice(0,1).toUpperCase() + data.name.slice(1)}</Heading>
         <Text fontWeight="bold"> {data.base.slice(0,1).toUpperCase() + data.base.slice(1)} based cocktail</Text>
      
      <Box lineHeight={2} pt={5} textAlign="left"  width="60%" margin="auto">
        <Text><b>Ingredients:-</b> {data.ingredients}</Text>
        <Text mt={1} fontWeight="bold">Recipe:-</Text>

        {
          data.recipe.map((el,i)=>
          <Text key={i}><b>{i+1}.</b> {el}</Text>
          )
        }

        <Flex mt={4} justifyContent="space-between">
          <Text><b>Glasswares used:-</b> {data.glasswares}</Text>
          <Text><b>Recipe by:-</b> <span style={{color:"#f22d65"}}>{data.recipeBy}</span></Text>
               
        </Flex>
         <Text><b>Approx. selling price:-</b> {data.price} ₹</Text>

      </Box>
      
      </Box>:
      <Heading>Something went wrong</Heading>
      }

    </div>
  )
}

export default SingleDrink