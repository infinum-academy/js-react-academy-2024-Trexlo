import { LockIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/react"
import { forwardRef, LegacyRef, useState } from "react"


export const PasswordInput = forwardRef(function PasswordInput(props: InputProps, ref:LegacyRef<HTMLInputElement>){
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    return (
      <InputGroup variant="authInput" size='md'>
        <InputLeftElement pointerEvents='none'>
            <LockIcon color='white' />
        </InputLeftElement>
        <Input
          {...props}
          ref={ref}
          pr='4.5rem'
          type={show ? 'text' : 'password'}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
});