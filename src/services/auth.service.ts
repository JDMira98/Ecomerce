const baseUrl = "https://localhost:7202/users/api/";
const LoginUser = baseUrl + "login/LoginUser";
const CreateUser = baseUrl + "CreateUser";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  active: boolean;
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

export const RegisterUser = async (registerData: RegisterData) => {
  const response = await fetch(CreateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
    
  }

  return response.json();
};
