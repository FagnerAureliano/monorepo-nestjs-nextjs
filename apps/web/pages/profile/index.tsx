import { PencilIcon, UserIcon } from '@heroicons/react/24/solid';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import { userService } from '../../services/user-service';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import { TrashIcon } from '@heroicons/react/24/outline';
import { getSession, useSession } from 'next-auth/react';
import { isRegExp } from 'util/types';

export default function Profile() {
  const [avatarUrl, setAvatarUrl] = useState('https://robohash.org/1234');
  const [isDisabled, setIsDisabled] = useState(true);
  const { push } = useRouter();
  interface IUpdate {
    name: string;
    email: string;
    password: string;
    newPassword: string;
    passwordConfirm: string;
  }

  const initialValues = {
    name: '',
    email: '',
    password: '',
    newPassword: '',
    passwordConfirm: '',
  };

  async function handleSignUp({
    name,
    email,
    password,
    newPassword,
    passwordConfirm,
  }: IUpdate) {
    console.log(name, email, password, newPassword, passwordConfirm);

    if (newPassword != passwordConfirm) {
      return toast.error('Erro ao cadastrar usuário. Password inválido.');
    }
    try {
      const { status } = await userService.create({
        name,
        email,
        password,
        newPassword,
      });
      if (status === 201) {
        toast.success('Cadastrado com sucesso !', {
          autoClose: 1000,
          onClose: () => push('/login'),
        });
      }
    } catch (error) {
      toast.error('Erro ao cadastrar usuário. Verifique os campos preenxidos.');
    }
  }

  async function handleEditPassword(data: Event) {
    setIsDisabled(!isDisabled);
  }

  const generateAvatar = async () => {
    const text = Math.floor(Math.random() * 100);
    const response = await fetch(`https://robohash.org/${text}`);
    setAvatarUrl(response.url);
  };
  
  const { data: session } = useSession();

console.log(session);

  useEffect(() => {
    const handleUser = async () => {
      const user = await userService.findByEmail(session?.user?.email);
      console.log(user);
    };
    handleUser();
  });

  return (
    <>
      <Layout title="Profile">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <ToastContainer autoClose={2000} />
            <div className="space-y-4">
              {/* {Array.from(Array(10).keys()).map((item) => (
                // eslint-disable-next-line react/jsx-key */}
              <picture>
                <img
                  className="mx-auto w-auto"
                  src={avatarUrl}
                  alt="Workflow"
                />
              </picture>
              {/* ))} */}
              <button
                className="text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                onClick={generateAvatar}
              >
                Refresh
              </button>
            </div>
            <Formik
              initialValues={initialValues}
              onReset={() => console.log('reset')}
              onSubmit={handleSignUp}
            >
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
                  <div className="flex gap-2">
                    <label htmlFor="password" className="sr-only" />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      required
                      disabled={isDisabled}
                      className="appearance-none relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Senha Atual"
                    />

                    <button
                      type="button"
                      onClick={() => handleEditPassword(event)}
                      className="group relative w-1/4 flex justify-center py-2 px-4 border border-gray-400 text-sm font-medium rounded-md text-gray-100    bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <PencilIcon
                          className="h-5 w-5 text-gray-200 group-hover:text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                      Senha
                    </button>
                  </div>
                  {!isDisabled && (
                    <>
                      <div>
                        <label htmlFor="newPassword" className="sr-only" />
                        <Field
                          id="newPassword"
                          name="newPassword"
                          type="newPassword"
                          required
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Nova senha"
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
                          placeholder="Confirmar nova senha"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="reset"
                    className="group relative w-2/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <TrashIcon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    Limpar
                  </button>
                  <button
                    type="submit"
                    className="group relative w-2/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <UserIcon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    Salvar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
}
