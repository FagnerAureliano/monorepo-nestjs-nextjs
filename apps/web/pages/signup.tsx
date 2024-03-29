import { UserIcon } from '@heroicons/react/24/solid';
import { Formik, Form, Field } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import UserService from '../services/user-service';

export default function SingUp() {
  interface ISingUp {
    name: string;
    email: string;
    password: string;
  }

  //   const { signUp } = useContext(AuthContext)
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  async function handleSignUp({ name, email, password }: ISingUp) {
    console.log(name, email, password);
    
    if (initialValues.password != initialValues.passwordConfirm) {
      throw new Error('Error password wrong');
    }
    try {
      await UserService.create({ name, email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Image
              width={200}
              height={200}
              src={
                'https://i.pinimg.com/564x/84/eb/2b/84eb2b29ecae003e53d717946ff49dbd.jpg'
              }
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Cadastre-se
            </h2>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSignUp}>
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md space-y-2">
                <div>
                  <label htmlFor="name" className="sr-only" />
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only" />
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
                  <label htmlFor="password" className="sr-only" />
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
                <div>
                  <label htmlFor="passwordConfirm" className="sr-only" />
                  <Field
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmação de senha"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Cadastrar-me
                </button>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link href="/">
                    <p className="font-medium text-indigo-600 hover:text-indigo-500">
                      Entrar com conta existente
                    </p>
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
