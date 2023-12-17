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

const createAvailbleBlock = async (token, block_id, day, schedule_id) => {
  try {
    console.log("f-createBlock: ", block_id, day, schedule_id);
    const res = await instance.post("professor/crear-bloque", {
      data: {
        bloque_id: block_id,
        dia: day,
        horario_id: schedule_id
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("f-createBlock-fin");
    return res.data;
  } catch (error) {
    console.log(error)
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
    useGetSemesters,
    createAvailbleBlock
}