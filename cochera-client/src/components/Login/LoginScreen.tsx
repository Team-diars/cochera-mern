import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await resp.json();
    if (data.ok) {
      const { token } = data;
      localStorage.setItem("token", token);
      navigate(`customer`);
    }
  };

  const inputChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxW="container.xl" padding="10">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={inputChange}
          />
          <FormLabel htmlFor="name">Password</FormLabel>
          <Input
            id="password"
            name="password"
            placeholder="*****"
            type="password"
            value={formData.password}
            onChange={inputChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginScreen;
