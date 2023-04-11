import { PencilIcon, UserIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { userService } from '../../services/user-service';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { getSession, useSession } from 'next-auth/react';
import { Loading } from '../../components/loading';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

interface IUpdate {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  photo?: string;
  password?: string;
  newPassword?: string;
  passwordConfirm?: string;
}

export default function Profile({ data }: any) {
  const [user, setUser] = useState<IUpdate | null>(data);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.photo ? user.photo : 'https://robohash.org/1234'
  );
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  // const { data: session } = useSession();

  const { push } = useRouter();

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUpdate>({
    defaultValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      password: '',
      newPassword: '',
      passwordConfirm: '',
    },
  });
  async function handleSignUp({
    name,
    email,
    password,
    newPassword,
    passwordConfirm,
  }: IUpdate) {
    if (password) {
      if (newPassword != passwordConfirm) {
        return toast.error('Erro ao cadastrar usuário. Password inválido.');
      }
    }
    try {
      const { status } = await userService.update({
        name,
        email,
        password: password ? password : null,
        newPassword: newPassword ? newPassword : null,
      });
      if (status === 200) {
        toast.success('Atualizado com sucesso !', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error('Erro ao atualizar usuário. Verifique os campos preenxidos.');
    }
  }

  async function handleEditPassword() {
    resetField('password');
    resetField('newPassword');
    resetField('passwordConfirm');
    setIsDisabled(!isDisabled);
  }

  const generateAvatar = async () => {
    setLoading(true);
    const text = Math.floor(Math.random() * 100);
    const response = await fetch(`https://robohash.org/${text}`);
    setAvatarUrl(response.url);
    setLoading(false);
  };

  return (
    <>
      <Layout title="Profile">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full  ">
            <ToastContainer autoClose={2000} />
            <div className="space-y-2 text-center">
              <div>
                {/* {Array.from(Array(10).keys()).map((item) => (
                // eslint-disable-next-line react/jsx-key */}
                {!loading ? (
                  <picture>
                    <img
                      className="mx-auto w-auto"
                      src={avatarUrl}
                      alt="Workflow"
                    />
                  </picture>
                ) : (
                  <div className="h-64 w-auto">
                    <Loading />
                  </div>
                )}
                {/* ))} */}
              </div>
              <div>
                <button
                  className="text-gray-700 hover:text-white hover:bg-gray-200   rounded-lg px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-200 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-200 dark:focus:ring-gray-800"
                  onClick={generateAvatar}
                >
                  <ArrowPathIcon
                    className="h-5 w-5 text-gray-800 group-hover:text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md space-y-5">
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="floating_name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    {...register('name', {
                      required: true,
                    })}
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                  >
                    Name
                  </label>
                </div>
                <div className="relative z-0 w-full  group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    {...register('email', {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                  >
                    Email address
                  </label>
                </div>

                {!isDisabled && (
                  <>
                    <div className="space-y-5">
                      <div className="relative z-0 w-full group">
                        <input
                          type="password"
                          name="floating_password"
                          id="floating_password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          {...register('password', {
                            required: true,
                          })}
                        />
                        <label
                          htmlFor="floating_password"
                          className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                          Senha atual
                        </label>
                      </div>
                      <div className="relative z-0 w-full group">
                        <input
                          type="password"
                          name="floating_newPassword"
                          id="floating_newPassword"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          {...register('newPassword', {
                            required: true,
                          })}
                        />
                        <label
                          htmlFor="floating_newPassword"
                          className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                          Nova senha
                        </label>
                      </div>
                      <div className="relative z-0 w-full group">
                        <input
                          type="password"
                          name="floating_passwordConfirm"
                          id="floating_newPassword"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          {...register('passwordConfirm', {
                            required: true,
                          })}
                        />
                        <label
                          htmlFor="floating_passwordConfirm"
                          className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                          Confirmar nova senha
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleEditPassword}
                    className="group relative w-2/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PencilSquareIcon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    Alterar senha
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
              </div>

              <div className="flex gap-2">
                {/* <button
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
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { user } = await getServerSession(ctx.req, ctx.res, authOptions);
  console.log(user);
  return {
    props: {
      data: user,
    },
  };
};
