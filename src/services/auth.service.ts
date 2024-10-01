const baseUrl = "https://localhost:7202/users/api/";
const LoginUser = baseUrl + "login/LoginUser";
const CreateUser = baseUrl + "CreateUser";
const GetUser = baseUrl + "getUser";
const DisableUser = baseUrl + "DisableUser";
const EnableUser = baseUrl + "EnableUser";
const UpdateUser = baseUrl + "UpdateUser";

interface LoginData {
  email: string;
  password: string;
}

interface Data {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  active: number;
}

interface DataProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const loginUser = async (loginData: LoginData) => {
  const response = await fetch(LoginUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const RegisterUser = async (Data: Data) => {
  const response = await fetch(CreateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
    
  }

  return response.json();
};

export const GetUsers = async (id:number) => {
 const response = await fetch(`${GetUser}?id=${id}`, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
   },
 });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
 console.log(response);
  return response.json();
};

export const DisableUserPost = async (id: string | number) => {
  const response = await fetch(DisableUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const EnableUserPost = async (id: string | number) => {
  const response = await fetch(EnableUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const UpdateUserPost = async (Data: DataProfile) => {
  const response = await fetch(UpdateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
  return response.json();
};