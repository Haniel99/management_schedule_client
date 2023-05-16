import { instance } from "../utils/configurationAPI";

//This function is to get all sechedule datas
const useGetSchedule = async (token) => {
  try {
    const res = await instance.get("admin/get-schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

//This function is to get the whole semester of a schedule.
const useGetSemesters = async (token, data) => {
  try {
    const res = await instance.post(
      "admin/get-semester",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const useCreateSchedule = async (token, data) => {
  try {
    console.log(data);
    const res = await instance.post(
      "admin/create-schedule",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const useGetClassBlock = async (token, data) => {
  try {
    const res = await instance.post(
      "admin/get-block",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: error.response };
  }
};

const useGetProfessors = async (token) => {
  try {
    const res = await instance.get("admin/professors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: error.response };
  }
};

const useGetRooms = async (token) => {
  try {
    const res = await instance.get("admin/get-room", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: error.response };
  }
};

const useGetSubjects = async (token) => {
  try {
    const res = await instance.get("admin/subjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: error.response };
  }
};
const useAddClassBlock = async (token, data) => {
  try {
    const res = await instance.post("admin/add-block", {data}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: "Error al agregar el horario" };
  }
};
export {
  useGetSchedule,
  useGetSemesters,
  useCreateSchedule,
  useGetClassBlock,
  useGetProfessors,
  useGetRooms,
  useGetSubjects,
  useAddClassBlock
};
