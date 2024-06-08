import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";

export default function VerifyLogin({ email, handleSubmit, code, setCode }) {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const handleChange = e => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value });
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={formBackground}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verificación en 2 pasos
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
          textAlign="center"
        >
          Te hemos mandado un correo electrónico con un código para que
          verifiques que eres tu
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {email}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField
                  name="number1"
                  borderColor="gray.400"
                  value={code}
                  onChange={handleChange}
                />
                <PinInputField
                  name="number2"
                  borderColor="gray.400"
                  value={code}
                  onChange={handleChange}
                />
                <PinInputField
                  name="number3"
                  borderColor="gray.400"
                  value={code}
                  onChange={handleChange}
                />
                <PinInputField
                  name="number4"
                  borderColor="gray.400"
                  value={code}
                  onChange={handleChange}
                />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
