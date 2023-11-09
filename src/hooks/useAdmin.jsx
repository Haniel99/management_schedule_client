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
    const res = await instance.post(
      "admin/add-block",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: "Error al agregar el horario" };
  }
};

const useSetSubject = async (data, token) => {
  try {
    const res = await instance.post(
      "admin/add-subject",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, response: res.data };
  } catch (error) {
    return { status: false, response: "Error al agregar la asignatura" };
  }
};

const useSetProfessor = async (data, token) => {
  try {
    const res = await instance.post(
      "login/signup",
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

const useIsType = async (token, type) => {
  try {
    const res = await instance.get(
      type,
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
}
const useSetRoom = async (data, token) => {
  try {
    const res = await instance.post(
      "admin/add-room",
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
const useGetType = async (token) => {
  try {
    const res = await instance.get('verify',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, response: res.data.response };
  } catch (error) {
    return { status: false, response: error.response };
  }
}
const useUpdateClassBlock = async (data, token)=> {
  try {
    console.log(token);
    const res = await instance.post('admin/updateClassBlock',
    {data},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, response: res.data.response };
  } catch (error) {
    return { status: false, response: error.response };
  }
}
const useDeleteClassBlock = async (data, token)=> {
  try {
    console.log(token);
    const res = await instance.post('admin/deleteClassBlock',
    {data},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, response: res.data.response };
  } catch (error) {
    return { status: false, response: error.response };
  }
}
export {
  useGetSchedule,
  useGetSemesters,
  useCreateSchedule,
  useGetClassBlock,
  useGetProfessors,
  useGetRooms,
  useGetSubjects,
  useAddClassBlock,
  useSetSubject,
  useSetProfessor,
  useSetRoom,
  useIsType,
  useGetType,
  useUpdateClassBlock,
  useDeleteClassBlock
};
