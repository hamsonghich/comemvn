import * as request from "~/utils/BaseAxios";

export const getListHeader = async () => {
  try {
    return await request.get('data-all', {})
  }catch (error){
    console.log('error', error)
  }

}
