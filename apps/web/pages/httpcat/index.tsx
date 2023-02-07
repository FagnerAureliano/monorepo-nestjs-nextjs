/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Input } from 'apps/web/components/input';
import { Layout } from 'apps/web/components/layout';

export default function HttpCat() {

  function handleInputChange(data){
    console.log(data);
    
  }
  return (
    <>
      <Layout title="Http Status Cat" >
      <div className="flex flex-col items-center justify-center">
          <div className='w-60   '>
              <Input handleInput={handleInputChange} isButonSubmit={true}/>
          </div>
        </div>
      </Layout>
    </>
  );
}
