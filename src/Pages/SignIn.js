import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
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
          window.location.replace('/home');
        } else if (response.data.status === 1) {
          toast({
            position: "top",
            title: "Invalid Password",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        else {
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
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "4", sm: "8" }}
      >
        <Stack spacing="8">
          <Box
            py={{ base: "4", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "xl", sm: "xl" }}
          >
            <Stack>
              <Text
                textAlign="center"
                fontSize="3xl"
                fontWeight="600"
                color="green.600"
              >
                Sign In
              </Text>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing="4" mt={5}>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup size="md">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AiOutlineMail color="#276749" />}
                      />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        focusBorderColor="green.700"
                        required
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiLockAlt color="#276749" />}
                      />
                      <Input
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        focusBorderColor="green.700"
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
                </Stack>

                <Center>
                  <Button mt={6} colorScheme="green" width="50%" type="submit">
                    Sign in
                  </Button>
                </Center>

                <Stack>
                  <Text align={"center"} mt={6} fontSize="sm">
                    Not registered yet?{" "}
                    <Link color={"green.600"} href="/signup">
                      Sign Up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};
export default SignIn;
