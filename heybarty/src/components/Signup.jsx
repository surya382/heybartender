import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
  useToast,

} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const initial = {
    name: "",
    email: "",
    password: "",
    dob: "",
    mobile: ""
  }

  const [user, setuser] = useState(initial);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast()
  const [formErrors, setFormErrors] = useState({});
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {

    const { name, value } = e.target;
    setuser(prevUser => {
      const updatedUser = { ...prevUser, [name]: value };
      setFormErrors(validate(updatedUser));
      return updatedUser;
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (Object.keys(formErrors).length === 0) {

      setloading(true);


      try {

        let res = await fetch("https://bartender.onrender.com/user/register", {
          method: 'POST',
          body: JSON.stringify({ ...user, mobile: Number(user.mobile) }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        res = await res.json();


        setloading(false);
        toast({
          title: `${res.msg}`,
          position: "top",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        navigate("/login");
      }
      catch (err) {
        setloading(false);

        toast({
          title: 'Signup failed try again',
          position: "bottom",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.log(err)
      }

    }

  }




  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const inputDate = new Date(values.dob);
    const currentDate = new Date();

    if (!values.name) {
      errors.name = "Username is required!";
    }



    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }


    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.dob) {
      errors.dob = "DOB is required";
    } else if (inputDate.getTime() >= currentDate.getTime()) {
      errors.dob = "Not a valid DOB"
    }

    if (!values.mobile) {
      errors.mobile = "Mobile number is required"
    }
    else if (values.mobile.length !== 10) {
      errors.mobile = "Mobile number should contain 10 digits"
    }

    return errors;
  }


  //  console.log(user)

  return (
    <Flex pt={14}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>

              <FormControl id="firstName" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" name='name' value={user.name} onChange={(e) => handlechange(e)} />
                <FormHelperText textAlign="left" color="red">{formErrors.name}</FormHelperText>
              </FormControl>


            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={user.email} onChange={(e) => handlechange(e)} />
              <FormHelperText textAlign="left" color="red">{formErrors.email}</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" value={user.password} onChange={(e) => handlechange(e)} />
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
              <FormHelperText textAlign="left" color="red">{formErrors.password}</FormHelperText>

              <HStack mt={1}>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>DOB</FormLabel>
                    <Input type="date" name='dob' value={user.dob} onChange={(e) => handlechange(e)} />
                    <FormHelperText textAlign="left" color="red">{formErrors.dob}</FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Mobile Number</FormLabel>
                    <Input type="number" name='mobile' value={user.mobile} onInput={(e) => handlechange(e)} />
                    <FormHelperText textAlign="left" color="red">{formErrors.mobile}</FormHelperText>
                  </FormControl>
                </Box>
              </HStack>

            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                backgroundColor='#f22d65'
                _hover={{
                  backgroundColor: '#f22d65',
                }}>
                Sign up
              </Button>

            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to="/login"><span style={{ color: "#f22d65" }}>Login</span></Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
