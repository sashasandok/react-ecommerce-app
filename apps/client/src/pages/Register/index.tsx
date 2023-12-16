import { useForm } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'
import styles from './Register.module.scss'

type FormValues = {
  name: string
  email: string
  password: string
}

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  function onSubmit(values: unknown) {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <div className={styles.RegisterWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.RegisterFormWrapper}>
        <h3>User Registration</h3>
        <FormControl isInvalid={Boolean(errors?.name)} className={styles.RegisterFormControl}>
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
        <FormControl isInvalid={Boolean(errors?.name)} className={styles.RegisterFormControl}>
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

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
