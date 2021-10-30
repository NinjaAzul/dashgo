import {forwardRef, ForwardRefRenderFunction} from "react";
import {FormErrorMessage, FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import {FieldError} from "react-hook-form";



interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?:FieldError;
} 

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> =  ({ error = null,name, label, ...rest }, ref) => {

  console.log(error)
    return(
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
              name={name}
              id={name}
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{
                bgColor: "gray.900",
              }}
              size="lg"
              {...rest}
              ref={ref}
            />


{!! error && (
  <FormErrorMessage>
    {error.message}
  </FormErrorMessage>
)}

          </FormControl>
    )
}

export const Input = forwardRef(InputBase);