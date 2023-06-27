import { instance } from "../utils/configurationAPI";

//This function is to get all sechedule datas
const useGetSchedule = async (token) => {
  try {
    const res = await instance.get("professor/horario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const useGetSemesters = async (token, data) => {
  try {
    const res = await instance.post(
      "professor/horario",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      return {status: true, response: res.data.response}
  } catch (error) {
    return "Error";
  }
};

export {
    useGetSchedule,
    useGetSemesters
}