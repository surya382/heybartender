import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {CloseIcon} from "@chakra-ui/icons"
import "../style.css"
import { useContext } from 'react';
import { Authcontext } from '../../context/Authcontext';

const Addcocktail = () => {

    const init={
      image:"",
      name:"",
      base:"",
      ingredients:"",
      glasswares:"",
      recipe:[],
      recipeBy:"",
      price:""

    };

   const [cock,setcock]=useState(init);
   const [recipes,setrecipe]=useState("");
   const [loading, setloading] = useState(false);
   const {authstate}=useContext(Authcontext);
   const toast = useToast()
   const handlechange=(e)=>{

    const {name,value}=e.target;

    setcock({...cock,[name]:value});
   }

   const addrecipe=()=>{

    if(recipes!==""){
        setcock({...cock,recipe:[...cock.recipe,recipes]})
        setrecipe("");
    }
   }


   const remove=(ind)=>{
      let arr=cock.recipe.filter((el,i)=>{
        return i!==ind;
      });
      console.log(arr);
      setcock({...cock,recipe:arr});

   }

   const handleSubmit=async()=>{
      const {image,name,base,ingredients,glasswares,recipe,recipeBy,price}=cock;

      if(image!=="" && name!=="" && base!=="" &&ingredients!=="" && glasswares!=="" && recipe.length!==0 && recipeBy!=="" && price!==""){
            
        setloading(true);
        try{

          let res=await fetch("http://localhost:4500/drink/addcocktail",{
            method:'POST',
            body:JSON.stringify({...cock,price:Number(cock.price),name:cock.name.toLowerCase()}),
            headers:{
              'Content-Type':"application/json",
              'authorization':authstate.token
            }
          });
              
          setloading(false);

          toast({
            title: "Cocktail added successfully",
            position:"top",
           
            status: "success",
            duration: 3000,
            isClosable: true,
          })

          setcock(init);

        }
        catch(err){
          setloading(false);
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

      else{
        toast({
          title: "Please fill all the entities",
          position:"bottom",
         
          status: "warning",
          duration: 3000,
          isClosable: true,
        })
      }
   }

  return (
    <div style={{paddingTop:"100px"}}>
        <Box><Link to={"/admin"}><Button color="#f22d65">Go Back</Button></Link></Box>

        <Flex flexDirection={{sm:"column",md:"row",lg:"row"}} gap="20px" justifyContent="space-between" width="100%" p={10}>
            
            <Box  width="40%">
            <FormControl  >
            <FormLabel>Cocktail Image</FormLabel>
            <Input type="text" name='image' value={cock.image} onChange={handlechange}/>

            <FormLabel>Cocktail Name</FormLabel>
            <Input type="text" name='name' value={cock.name} onChange={handlechange}/>

            <FormLabel>Cocktail Base</FormLabel>
            <Input type="text" name='base' value={cock.base} onChange={handlechange}/>

            <FormLabel>Ingredients</FormLabel>
            <Textarea name='ingredients' value={cock.ingredients} onChange={handlechange}/>

            <FormLabel>Glassware used to serve</FormLabel>
            <Input type="text" name='glasswares' value={cock.glasswares} onChange={handlechange}/>

           
            <FormLabel>Write recipe in steps</FormLabel>
            <Box display="flex">
            <Input type="text"  value={recipes} onChange={(e)=>setrecipe(e.target.value)}/>
            <Button variant="solid" color="#f22d65" onClick={addrecipe}>Add</Button>
            </Box>
             

            <FormLabel>Recipe By</FormLabel>
            <Input type="text" name='recipeBy' value={cock.recipeBy} onChange={handlechange}/>

            <FormLabel>Selling Price</FormLabel>
            <Input type="text" name='price' value={cock.price} onChange={handlechange}/>
                   
            
             </FormControl>
             <Button className='addcock' 
             onClick={handleSubmit}
             isLoading={loading}
               loadingText="Adding to database"
             width="100%"
              _hover={{backgroundColor:"#f22d65"}} 
              mt={5} backgroundColor="#f22d65"
             color="white" >
              Add Cocktail</Button>
             
            </Box>
           

            <Box  width="50%" lineHeight="40px">

                 <Box  width="80%" margin="auto" mb={5}>
                  <Image width="100%" src={cock.image}/>
                 </Box>

                 <Heading size="md">{cock.name}</Heading>

                 {cock.base && <Text><b>Base:</b> {cock.base} Based cocktail</Text>}

                 {cock.ingredients && <Text><b>Ingredients:</b> {cock.ingredients}</Text>}

                 {cock.glasswares && <Text><b>glassware:</b> {cock.glasswares}</Text>} 

                 {
                    cock.recipe.length!==0 &&
                    <Box lineHeight="30px">
                       <Text fontWeight="bold">Recipe:-</Text>
                       {
                        cock.recipe.map((el,i)=>
                        
                         <Text  key={i}>{i+1}.  {el} <CloseIcon  onClick={()=>remove(i)} cursor="pointer"/></Text>
                            
                         )
                       }
                    </Box>
                 }

                 {cock.recipeBy && <Text><b>Recipe By:</b> {cock.recipeBy}</Text>}

                 {cock.price && <Text><b>Selling Price:</b> {cock.price} ₹</Text>}


            </Box>

        </Flex>

    </div>
  )
}

export default Addcocktail