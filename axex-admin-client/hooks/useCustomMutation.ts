import { AxiosError } from "axios"
import {
  MutationFunction,
  MutationKey,
  useMutation,
  UseMutationOptions,
} from "react-query"

function useCustomMutation<Response, Input, Error = AxiosError>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<Response, Input>,
  options?: UseMutationOptions<Response, Error, Input>,
) {
  return useMutation(mutationKey, mutationFn, options)
}

export default useCustomMutation
