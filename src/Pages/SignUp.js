import React, { useEffect, useState } from "react";
import "./Login.css";
import inventory from "../Assets/inventory.png";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Link,
  Center,
  Input,
  Stack,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { BiUser, BiLockAlt } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import localApi from "../API/Api";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  function clearForm() {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let cancel = true;
    const loadData = async () => {
      const response = await localApi.post("signup", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      });
      if (cancel) {
        if (response.data.status === 1) {
          toast({
            position: "top",
            title: "Account Created",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          clearForm();
        } else if (response.data.status === 2) {
          toast({
            position: "top",
            title: "Account already exist!",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    };
    loadData();
    return () => {
      cancel = false;
    };
  };

  return (
    <div className="login-container">
      <Container
        maxW="5xl"
        py={[2, 8, 12, 24]} px={{ base: "4", sm: "8" }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          >
            <SimpleGrid columns={4} display={["contents", "contents", "grid", "grid"]}>
              <GridItem colSpan={2} bg="blue.100" p={5}>
                <Text
                  textAlign="center"
                  mt={2}
                  fontSize={[22,24,26,27]}
                  fontWeight="bold"
                  color="blue.400"
                >
                  Inventory Management System
                </Text>
                <img src={inventory} />
              </GridItem>

              <GridItem colSpan={2} p={[4, 5, 8, 12]} mt={[1, 5, 7, 10]}>
                <FormControl>
                  <FormLabel display={["none", "grid", "grid", "grid"]}>First Name</FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiUser color="#4299E1" />}
                    />
                    <Input
                      type="text"
                      placeholder="First Name"
                      focusBorderColor="blue.200"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel display={["none", "grid", "grid", "grid"]}>Last Name</FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiUser color="#4299E1" />}
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      focusBorderColor="blue.200"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel display={["none", "grid", "grid", "grid"]}>Email</FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<AiOutlineMail color="#4299E1" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      focusBorderColor="blue.200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel display={["none", "grid", "grid", "grid"]}>Password</FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiLockAlt color="#4299E1" />}
                    />
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      focusBorderColor="blue.200"
                      fontSize="15px"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputRightElement>
                      <Button
                        color="gray.500"
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Center>
                  <Button mt={10} colorScheme="blue" width="50%" type="submit">
                    Sign Up
                  </Button>
                </Center>

                <Center>
                  <Text align={"center"} mt={10} fontSize="sm">
                    Already a user?{" "}
                    <Link color={"blue.400"} fontWeight="medium" href="/">
                      Sign In
                    </Link>
                  </Text>
                </Center>
              </GridItem>
            </SimpleGrid>
          </Box>
        </form>
      </Container>
    </div>
  );
};
export default SignUp;
