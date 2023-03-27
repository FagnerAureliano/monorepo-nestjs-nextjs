import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Image from 'next/image';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { LoginProps } from '../../services/user-service';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const Login: NextPage = (props: any) => {
  const initialValues = {
    email: '',
    password: '',
  };
  const router = useRouter();
  async function handleSignIn({ email, password }: LoginProps) {
    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
    if (res.ok) {
      router.push('/');
    } else {
      toast.error(res.error + ' E-mail e/ou senha inválido.');
    }
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer autoClose={2000} />
        <div className="max-w-md w-full space-y-8">
          <div>
            <picture>
              <img
                className="mx-auto  w-auto"
                src="/images/logo.png"
                alt="Workflow"
              />
            </picture>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Entre com sua conta
            </h2>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSignIn}>
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm space-y-2">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <Field
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Entrar
              </button>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/signup">
                    <p className="font-medium text-indigo-600 hover:text-indigo-500">
                      Cadastre-se
                    </p>
                  </Link>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
