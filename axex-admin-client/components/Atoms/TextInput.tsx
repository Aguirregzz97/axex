import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/input"
import React from "react"

export type InputState = "untouched" | "valid" | "invalid"

type TextInputProps = {
  icon?: React.ReactNode
  state?: InputState
} & InputProps

type InputStateProps = {
  state: InputState
}

const InputStateIcon: React.FC<InputStateProps> = ({ state }) => {
  if (state === "valid") {
    return <InputRightElement children={<CheckIcon color="green.500" />} />
  }
  if (state === "invalid") {
    return <InputRightElement children={<CloseIcon color="red.500" />} />
  }
  return <></>
}

const TextInput: React.FC<TextInputProps> = ({
  icon,
  state = "untouched",
  ...props
}) => {
  return (
    <FormControl>
      <FormLabel fontSize="13px" color="#1e6e7d" htmlFor={props.id}>
        {props.name}
      </FormLabel>
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none" children={icon} />}
        <Input size="md" {...props} />
        <InputStateIcon state={state} />
      </InputGroup>
    </FormControl>
  )
}

export default TextInput
