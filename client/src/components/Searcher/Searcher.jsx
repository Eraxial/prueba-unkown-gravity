/* eslint-disable react/prop-types */
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export const Searcher = ({ filter, onChange, search }) => {
  const inputColor = useColorModeValue("white", "gray.700");
  const { colorMode } = useColorMode();

  console.log(filter);

  return (
    <Box bg="teal.400">
      <Container maxW="8xl">
        <Grid placeItems="center" h="75px" templateColumns="200px 1fr">
          <Text fontSize="xl">Busca tu libro: </Text>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
            <Input
              type="tel"
              placeholder="Phone number"
              name="filter"
              value={filter}
              onChange={onChange}
              onKeyUp={search}
              bg={inputColor}
              _placeholder={{
                color: colorMode === "dark" ? "white" : "gray.700",
              }}
            />
          </InputGroup>
        </Grid>
      </Container>
    </Box>
  );
};
