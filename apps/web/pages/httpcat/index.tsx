import { Input } from '../../components/input';
import { Layout } from '../../components/layout';
import HttpCatsService from '../../services/http-cat';

export default function HttpCat() {
  async function handleInputChange(code) {
    const data = await HttpCatsService.findStatusCatByCode(code);
    console.log(data);
  }
  return (
    <>
      <Layout title="Http Status Cat">
        <div className="flex flex-col items-center justify-center">
          <div className="w-60   ">
            <Input handleInput={handleInputChange} isButonSubmit={true} />
          </div>
        </div>
      </Layout>
    </>
  );
}
