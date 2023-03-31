import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { BiLockAlt } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import localApi from "../API/Api";

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    localApi
      .post("signin", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.status === 2) {
          sessionStorage.setItem("Authorization", response.data.token);
          window.location.replace("/home");
        } else if (response.data.status === 1) {
          toast({
            position: "top",
            title: "Invalid Password",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "Email does not exist",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <div className="login-container">
      <Container maxW="5xl" py={[2, 8, 12, 24]} px={{ base: "4", sm: "8" }}>
        <form onSubmit={handleSubmit}>
          <Box
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          >
            <SimpleGrid
              columns={4}
              display={["contents", "contents", "grid", "grid"]}
            >
              <GridItem colSpan={2} bg="blue.100" p={5}>
                <Text
                  textAlign="center"
                  mt={2}
                  fontSize={[20,24,26,27]}
                  fontWeight="bold"
                  color="blue.400"
                >
                  Inventory Management System
                </Text>
                <img src={inventory} />
              </GridItem>

              <GridItem colSpan={2} p={[4, 5, 8, 12]} mt={[1, 5, 7, 10]}>
                <FormControl>
                  <FormLabel
                    htmlFor="email"
                    display={["none", "grid", "grid", "grid"]}
                  >
                    Email
                  </FormLabel>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<AiOutlineMail color="#4299E1" />}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      focusBorderColor="blue.200"
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={[5, 5, 7, 8]}>
                  <FormLabel
                    htmlFor="password"
                    display={["none", "grid", "grid", "grid"]}
                  >
                    Password
                  </FormLabel>
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fontSize="15px"
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
                    Sign in
                  </Button>
                </Center>

                <Center>
                  <Text align={"center"} mt={10} fontSize="sm">
                    Not registered yet?{" "}
                    <Link color={"blue.400"} fontWeight="medium" href="/signup">
                      Sign Up
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
export default SignIn;
