// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { api } from "apps/web/api";

class RandomUsersService {
    async getRandomUsers() {
      try {
        const  {data} = await api.get('random-users'); 
        
        return  data
      } catch (error) {
        return Error(error.message);
      }
    }
  }
  export default new RandomUsersService();
  