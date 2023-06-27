import { instance } from "../utils/configurationAPI";
const useLogin = async ( path,data) => {
    try {
        const res = await instance.post(`login/${path}`,{
            data
        });
        return res.data;  
    } catch (error) {
        return error.response.data;
    }
}

const useSingup = async (data)=> {
    try {
        const res = await instance.post('login/signup',{
            data
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}
export  {useLogin, useSingup};