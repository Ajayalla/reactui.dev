import { Alert, Button } from 'components/ui'
import { Input } from 'components/form'
import { Layout } from 'components/layouts'
import { FormikProvider, useFormik } from 'formik'
import Link from 'next/link'
import { ReactElement } from 'react'
import * as Yup from 'yup'
import * as React from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@lib/api'

const registerSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
})

const Register = () => {
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()
  const mutation = useMutation(registerUser, {
    onSuccess: () => router.push('/'),
    onError: (err: any) => setError(err.response?.data?.message),
  })
  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setError(null)
      mutation.mutate(values)
    },
  })

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/login">
            <a className="font-medium text-gray-600 hover:text-gray-500">
              sign in to your account
            </a>
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-4 pb-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={form.handleSubmit}>
            <FormikProvider value={form}>
              <Input type="text" name="name" label="Name" />
              <Input type="email" name="email" label="Email Address" />
              <Input type="password" name="password" label="Password" />
              {error && <Alert type="error">{error}</Alert>}
              <Button loading={mutation.isLoading} type="submit" fullWidth>
                Register
              </Button>
            </FormikProvider>
          </form>
        </div>
      </div>
    </div>
  )
}

Register.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Register

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
