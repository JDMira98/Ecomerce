import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { resetUser, UserKey } from "../../redux/states/user";
import { RegisterUser } from "../../services";
import { clearLocalStorage } from "../../utilities";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../../components/alert/Alert";
import "../../css/register.css"


const Register: React.FC = () => {
  const [formValues, setFormValues] = useState<{
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    active: number;
  }>({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "User",
    active: 1,
  });

  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
  }, [dispatch]);

  const validateForm = () => {
    if (formValues.name.trim() === "") {
      setError("El nombre es obligatorio.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setError("Por favor ingresa un correo válido.");
      return false;
    }
    if (!/^\d+$/.test(formValues.phone) || formValues.phone.length < 10) {
      setError("Por favor ingresa un número de teléfono válido.");
      return false;
    }
    if (formValues.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await RegisterUser(formValues);
      console.log(result);

      if (result === "Error: email already exists.") {
        setError("El correo ya está registrado.");
        setAlertType("error");
        setAlertMessage("El correo ya está registrado.");
        setShowAlert(true);
        // Desvanece la alerta después de 3 segundos
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        return;
      }

      if (result === "User created successfully.") {
        setAlertType("success");
        setAlertMessage("Usuario creado correctamente.");
        setShowAlert(true);

        // Desvanece la alerta después de 3 segundos
        setTimeout(() => {
          setShowAlert(false);
          navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
        }, 3000);
      }
    } catch (error) {
      console.error("Register failed:", error);
      setError("Error al registrarse. Por favor intenta de nuevo.");
      setAlertType("error");
      setAlertMessage("Error al registrarse. Inténtalo de nuevo.");
      setShowAlert(true);

      // Desvanece la alerta después de 3 segundos
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4 principalContainer">
        <h3 className="text-center">Registrarse</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombre completo"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Teléfono"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Crea una contraseña"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            ¿Ya tienes una cuenta? <a href="#/login">Iniciar sesión.</a>
          </p>
        </div>
        {showAlert && <Alert message={alertMessage} type={alertType} />}
      </div>
    </div>
  );
};

export default Register;
