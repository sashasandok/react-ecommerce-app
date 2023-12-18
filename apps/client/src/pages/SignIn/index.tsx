import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'
import styles from './SignIn.module.scss'
import useApi from '../../api/auth'
import { signIn } from '../../redux/auth/slice'

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
  const dispatch = useDispatch()

  const onSubmit = async (values: IRegisterData) => {
    try {
      const fields = { name: values.name, password: values.password, email: values.email }
      const res = await useApi.signIn(fields)

      console.log('res', res)

      if (res.data.message) {
        toast.error(res.data.message)
      }

      if (res.status === 201) {
        dispatch(signIn({ access_token: res.data.accessToken }))
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
        <h3>Login</h3>
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
          Login
        </Button>
      </form>
    </div>
  )
}
