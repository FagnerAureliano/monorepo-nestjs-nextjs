import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

interface ClientProps {
  id:string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    zipcode: string;
    city: string;
    street: string;
    number: string;
  };
}
interface FormProps {
  data?: ClientProps;
  onSubmit(data: ClientProps): void;
}

export function ClientForm({ data, onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ClientProps>({
    defaultValues: {
      id: data ? data.id : '',
      name: data ? data.name : '',
      email: data ? data.email : '',
      cpf: data ? data.cpf : '',
      phone: data ? data.phone : '',
      address: {
        zipcode: data ? data.address.zipcode : '',
        city: data ? data.address.city : '',
        street: data ? data.address.street : '',
        number: data ? data.address.number : '',
      },
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register('name')}
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="tel"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            name="floating_phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register('phone')}
          />

          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Phone number (00-99999-9999)
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
            name="floating_cpf"
            id="floating_cpf"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register('cpf')}
          />
          <label
            htmlFor="floating_cpf"
            className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            CPF (000.000.000-00)
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-x-6 ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_zip_code"
              id="floating_zip_code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register('address.zipcode')}
            />
            <label
              htmlFor="floating_zip_code"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Zip Code (12345-000)
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_city"
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register('address.city')}
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              City
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_street"
              id="floating_street"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register('address.street')}
            />
            <label
              htmlFor="floating_street"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Street
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_number"
              id="floating_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register('address.number')}
            />
            <label
              htmlFor="floating_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Number
            </label>
          </div>
        </div>

        <button
            className="text-gray-700 float-right hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Salvar
          </button>
      </form>
    </>
  );
}
export default ClientForm;
