import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// api
import useApi from '../../api/auth'
// store
import { useAuthStore } from '../../stores/auth/store'
// chakra ui components
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'
// styles
import styles from './SignIn.module.scss'

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface IRegisterData {
  name: string
  email: string
  password: string
}

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const navigate = useNavigate()
  const signIn = useAuthStore((state) => state.signIn)

  const onSubmit = async (values: IRegisterData) => {
    try {
      const fields = { name: values.name, password: values.password, email: values.email }
      const res = await useApi.signIn(fields)

      if (res.statusCode === 400) {
        toast.error(res.message)
      }

      if (res.status === 200) {
        signIn({ isAuthenticated: true })
        navigate('/')
        toast.success('You successfuly signed in')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('error', error)
    }
  }

  return (
    <div className={styles.SignInWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.SignInFormWrapper}>
        <h3>Sign In</h3>
        <FormControl isInvalid={Boolean(errors?.name)} className={styles.SignInFormControl}>
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register('email', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />

          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors?.name)} className={styles.SignInFormControl}>
          <FormLabel htmlFor="name">Password</FormLabel>
          <Input
            id="password"
            placeholder="password"
            type="password"
            {...register('password', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Enter
        </Button>
      </form>
    </div>
  )
}
