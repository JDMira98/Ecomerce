const baseUrl = "https://localhost:7202/users/api/";
const LoginUser = baseUrl + "login/LoginUser";
const CreateUser = baseUrl + "CreateUser";
const GetUser = baseUrl + "getUser";
const DisableUser = baseUrl + "DisableUser";
const EnableUser = baseUrl + "EnableUser";
const UpdateUser = baseUrl + "UpdateUser";
const AddProduct = baseUrl + "Products/AddProduct";
const GetProduct = baseUrl + "Products/getProduct";
const UpdateProduct = baseUrl + "Products/UpdateProduct";
const DisableProduct = baseUrl + "Products/DisableProduct";
const EnableProduct = baseUrl + "Products/EnableProduct";
const GetCategories = baseUrl + "Categories/getCategorie";
const AddCategorie = baseUrl + "Categories/AddCategorie";
const UpdateCategorie = baseUrl + "Categories/UpdateCategorie";
const EnableCategorie = baseUrl + "Categories/EnableCategorie";
const DisableCategorie = baseUrl + "Categories/DisableCategorie";

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

interface Product {
  id: number;
  name: string;
  price: number; // Asegúrate de que esto sea un número
  images: string; // Cambié a File para que coincida con el archivo de imagen
  desc: string;
  category: string;
  active: number;
}

interface Categorie {
  id: number;
  name: string;
  description: string;
  active: number;
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

export const GetUsers = async (id: number) => {
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

// Cambiado para recibir FormData
export const AddProductPost = async (formData: Product) => {
  const response = await fetch(AddProduct, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Usar el FormData aquí
    // No incluimos el header "Content-Type" porque FormData lo gestiona automáticamente
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const GetProducts= async (id: number) => {
  const response = await fetch(`${GetProduct}?id=${id}`, {
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




export const UpdateProductPost = async (formData: Product) => {
  const response = await fetch(UpdateProduct, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const DisableProductPost = async (id: number) => {
  const response = await fetch(DisableProduct, {
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
}

export const EnableProductPost = async (id: number) => {
  const response = await fetch(EnableProduct, {
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
};

export const GetCategoriesGET = async (id: number) => {
  const response = await fetch(`${GetCategories}?id=${id}`, {
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

export const AddCategoriePost = async (formData: Categorie) => {
  const response = await fetch(AddCategorie, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Usar el FormData aquí
    // No incluimos el header "Content-Type" porque FormData lo gestiona automáticamente
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const UpdateCategoriePost = async (formData: Categorie) => {
  const response = await fetch(UpdateCategorie, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const DisableCategoriePost = async (id: number) => {
  const response = await fetch(DisableCategorie, {
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
};

export const EnablecategoriePost = async (id: number) => {
  const response = await fetch(EnableCategorie, {
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
};