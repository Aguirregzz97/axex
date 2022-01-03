import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { VStack } from "@chakra-ui/layout"
import { useFormikContext } from "formik"
import React from "react"
import * as Yup from "yup"
import TextInput, { InputState } from "../Atoms/TextInput"

export type LoginFormType = {
  email: string
  password: string
}

export const LoginFormInitial: LoginFormType = {
  email: "",
  password: "",
}

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("The Email Is Required"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Minimum of 8 chars"),
})

const getInputState = (touched: boolean, error: boolean): InputState => {
  if (!touched) {
    return "untouched"
  }
  if (!error) {
    return "valid"
  }
  if (error) {
    return "invalid"
  }
  return "untouched"
}

const LoginForm: React.FC = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<LoginFormType>()
  return (
    <VStack spacing="20px">
      <TextInput
        id="email"
        name="email"
        placeholder="Email Address"
        type="email"
        icon={<EmailIcon color="#1e6e7d" />}
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        state={getInputState(
          touched.email !== undefined,
          errors.email !== undefined,
        )}
      />
      <TextInput
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        icon={<LockIcon color="#1e6e7d" />}
        mb="20px"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        state={getInputState(
          touched.password !== undefined,
          errors.password !== undefined,
        )}
      />
    </VStack>
  )
}

export default LoginForm
