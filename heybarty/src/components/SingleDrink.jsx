import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spinner, Stack, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Authcontext } from '../context/Authcontext';
import { singlecock } from '../redux/action';

const SingleDrink = () => {
  const {id}=useParams();
  const {authstate}=useContext(Authcontext);
  const [editdata,seteditdata]=useState({});
  const [recipe,setrecipe]=useState([]);

  const [addrecipe,setaddrecipe]=useState("");
  const toast=useToast();
  const navigate=useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const data=useSelector((state)=>state.single);
  const load=useSelector((state)=>state.loading);

  const dispatch=useDispatch();

  useEffect(()=>{
      
    if(!authstate.token){
      navigate("/");
    }
    dispatch(singlecock(id));

  },[authstate.token])

  const edit=(drink)=>{

  seteditdata(drink);

  setrecipe([...recipe,...drink.recipe]);
   onOpen();


  }
  
  const handlechange=(e)=>{
  
    const {name,value}=e.target;

    seteditdata({...editdata,[name]:value});

  }

  const add=()=>{

    if(addrecipe!==""){
         setrecipe([...recipe,addrecipe])
         setaddrecipe("");
    }
  }

  const remove=(ind)=>{
    let arr=recipe.filter((el,i)=>{
      return i!==ind;
    });
    
    setrecipe(arr);

 }

  const handleSubmit=async()=>{

    const {image,name,base,ingredients,glasswares,recipe,recipeBy,price}=editdata;

    try{

      let res=await fetch(`https://bartender.onrender.com/drink/${editdata._id}`,{
        method:'PATCH',
        body:JSON.stringify({...editdata,price:Number(editdata.price),recipe:recipe,name:editdata.name.toLowerCase()}),
        headers:{
          'Content-Type':"application/json",
          'authorization':authstate.token
        }
      });
          
      

      toast({
        title: "Cocktail Edited successfully",
        position:"top",
       
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      onClose();

      dispatch(singlecock(data._id));

    }
    catch(err){
      
      toast({
        title: "Something went wrong",
        position:"top",
       
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      console.log(err);
    }

  }
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
      {authstate.admin && <Box>
        <Button onClick={()=>edit(data)}>Edit details</Button>

      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit cocktail details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>


          <Flex flexDirection={{sm:"column",md:"row",lg:"row"}} gap="20px" justifyContent="space-between" width="100%" p={10}>
            
            <Box  width="40%">
            <FormControl  >
            <FormLabel>Cocktail Image</FormLabel>
            <Input type="text" name='image' value={editdata.image} onChange={handlechange}/>

            <FormLabel>Cocktail Name</FormLabel>
            <Input type="text" name='name' value={editdata.name} onChange={handlechange}/>

            <FormLabel>Cocktail Base</FormLabel>
            <Input type="text" name='base' value={editdata.base} onChange={handlechange}/>

            <FormLabel>Ingredients</FormLabel>
            <Textarea name='ingredients' value={editdata.ingredients} onChange={handlechange}/>

            <FormLabel>Glassware used to serve</FormLabel>
            <Input type="text" name='glasswares' value={editdata.glasswares} onChange={handlechange}/>

           
            <FormLabel>Write recipe in steps</FormLabel>
            <Box display="flex">
            <Input type="text"  value={addrecipe} onChange={(e)=>setaddrecipe(e.target.value)}/>
            <Button variant="solid" color="#f22d65" onClick={add}>Add</Button>
            </Box>
             

            <FormLabel>Recipe By</FormLabel>
            <Input type="text" name='recipeBy' value={editdata.recipeBy} onChange={handlechange}/>

            <FormLabel>Selling Price</FormLabel>
            <Input type="text" name='price' value={editdata.price} onChange={handlechange}/>
                   
            
             </FormControl>
             <Button className='addcock' 
             onClick={handleSubmit}
             
               loadingText="Adding to database"
             width="100%"
              _hover={{backgroundColor:"#f22d65"}} 
              mt={5} backgroundColor="#f22d65"
             color="white" >
              Edit Cocktail</Button>
             
            </Box>
           

            <Box  width="50%" lineHeight="40px">

                 <Box  width="80%" margin="auto" mb={5}>
                  <Image width="100%" src={editdata.image}/>
                 </Box>

                 <Heading size="md">{editdata.name}</Heading>

                 {editdata.base && <Text><b>Base:</b> {editdata.base} Based cocktail</Text>}

                 {editdata.ingredients && <Text><b>Ingredients:</b> {editdata.ingredients}</Text>}

                 {editdata.glasswares && <Text><b>glassware:</b> {editdata.glasswares}</Text>} 

                 {
                    recipe.length!==0 &&
                    <Box lineHeight="30px">
                       <Text fontWeight="bold">Recipe:-</Text>
                       {
                        recipe.map((el,i)=>
                        
                         <Text  key={i}>{i+1}.  {el} <CloseIcon  onClick={()=>remove(i)} cursor="pointer"/></Text>
                            
                         )
                       }
                    </Box>
                 }


                 {editdata.recipeBy && <Text><b>Recipe By:</b> {editdata.recipeBy}</Text>}

                 {editdata.price && <Text><b>Selling Price:</b> {editdata.price} ₹</Text>}


            </Box>

        </Flex>


            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
   }
      </Box>:
      <Heading>Something went wrong</Heading>
      }

    </div>
  )
}

export default SingleDrink