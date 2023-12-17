import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'
import styles from './SignUp.module.scss'
import useApi from '../../api/auth'
import { signUp } from '../../redux/auth/slice'

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

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()

  const onSubmit = async (values: IRegisterData) => {
    try {
      const fields = { name: values.name, password: values.password, email: values.email }
      const res = await useApi.signUp(fields)
      dispatch(signUp({ access_token: res.data.accessToken }))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className={styles.SignUpWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.SignUpFormWrapper}>
        <h3>User Registration</h3>
        <FormControl isInvalid={Boolean(errors?.name)} className={styles.SignUpFormControl}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <FormErrorMessage>{(errors as any)?.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.name)} className={styles.SignUpFormControl}>
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register('email', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <FormErrorMessage>{(errors as any)?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors?.name)} className={styles.RegisterFormControl}>
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
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <FormErrorMessage>{(errors as any)?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors?.name)} className={styles.RegisterFormControl}>
          <FormLabel htmlFor="name">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            placeholder="confirm password"
            type="password"
            {...register('confirmPassword', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <FormErrorMessage>{(errors as any)?.email?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          SignUp
        </Button>
      </form>
    </div>
  )
}
