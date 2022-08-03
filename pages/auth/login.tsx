import { Alert, Button } from 'components/ui'
import { Checkbox, Input } from 'components/form'
import { Layout } from 'components/layouts'
import { FormikProvider, useFormik } from 'formik'
import Link from 'next/link'
import { ReactElement } from 'react'
import * as Yup from 'yup'
import * as React from 'react'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const Login = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true)
      setError(null)
      const res = await signIn<'credentials'>('credentials', {
        ...values,
        redirect: false,
      })
      setLoading(false)
      if (!res) {
        setError('Something went wrong!! Please try later.')
      } else if (res.error) {
        setError(res.error)
      } else {
        router.push('/')
      }
    },
  })

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/register">
            <a className="font-medium text-gray-600 hover:text-gray-500">
              create an account
            </a>
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-4 pb-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={form.handleSubmit}>
            <FormikProvider value={form}>
              <Input type="email" name="email" label="Email Address" />
              <Input type="password" name="password" label="Password" />
              <div className="flex items-center justify-between">
                <Checkbox name="remember_me" label="Remember Me" />
                <div className="text-sm">
                  <Link href="/auth/forgot-password">
                    <a className="font-medium text-gray-600 hover:text-gray-500">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>
              {error && <Alert type="error">{error}</Alert>}
              <Button loading={loading} type="submit" fullWidth>
                Sign In
              </Button>
            </FormikProvider>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Login

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
