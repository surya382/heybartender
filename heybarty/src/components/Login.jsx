import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,

  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';

export default function Login() {
  

  const initial={
    
    email:"",
    password:"",
   
}
const {login}=useContext(Authcontext);

const [showPassword, setShowPassword] = useState(false);
const toast = useToast();
const [user,setuser]=useState(initial);
const [loading, setloading] = useState(false);
const [formerror,seterror]=useState({email:"",password:""});
const navigate=useNavigate(); 

const handlechange=(e)=>{

  const {name,value}=e.target;

  setuser({...user,[name]:value});

 if(formerror.email!==""){
  seterror({...formerror,email:""})
 }
 if(formerror.password!==""){
  seterror({...formerror,password:""})
 }
}

const handleSubmit=async(e)=>{
  
  e.preventDefault();

  if(user.email===""){
   seterror({...formerror,email:"Email is required"});

  }
  else if(user.password===""){
    seterror({...formerror,password:"Password is required"})
  }
     
  else{
    setloading(true);

    try{

      let res=await fetch("https://bartender.onrender.com/user/login",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Content-Type":"application/json"
        }
      })
         res=await res.json();

         setloading(false);

         
         if(res.token){
          toast({
            title: `${res.msg}`,
            position:"top",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })

          login(res);
            
              
          if(res.admin){
            navigate("/admin")
          }
          else{
            navigate("/");
          }
         

         }

         else{
          toast({
            title: `${res.msg}`,
            position:"top",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
         }
          
  
    }
    catch(err){
      setloading(false);
      toast({
        title: 'Something went wrong, try again',
        position:"bottom",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      console.log(err);
    }
  }
 

}


  return (
    <Flex pt={14}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
         
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={user.email} onChange={handlechange} />
              <FormHelperText textAlign="left" color="red">{formerror.email}</FormHelperText>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name='password' value={user.password} onChange={handlechange}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="left" color="red">{formerror.password}</FormHelperText>
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
               onClick={handleSubmit}
               isLoading={loading}
                 loadingText="Submitting"
                bg={'blue.400'}
                color={'white'}
                backgroundColor="#f22d65"
                _hover={{
                  backgroundColor:"#f22d65"
                  
                }}>
                Sign in
              </Button>
            </Stack>

            <Stack >
              <Text align={'center'}>
                New user? <Link to="/signup" ><span style={{color:"#f22d65"}}>Register</span></Link>
              </Text>
            </Stack>

          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
