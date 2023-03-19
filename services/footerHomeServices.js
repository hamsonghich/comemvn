import * as request from "~/utils/BaseAxios";

export const getListFooter = async () => {
  try {
    return await request.get('data-footer', {})
  }catch (error){
    console.log('error', error)
  }

}
