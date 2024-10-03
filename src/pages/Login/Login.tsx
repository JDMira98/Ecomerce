import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { createUser, resetUser, UserKey } from "../../redux/states/user";
import { loginUser } from "../../services";
import { clearLocalStorage } from "../../utilities";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/login.css"

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

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
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, [dispatch, navigate]);

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setError("Por favor ingresa un correo válido.");
      return false;
    }
    if (formValues.password.length < 3) {
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await loginUser(formValues); // Aquí haces la petición a la API

      dispatch(createUser({ ...result, rol: result.role }));
      navigate(`/`, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Error al iniciar sesión. Por favor intenta de nuevo.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="col-md-4 principalContainer">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control input"
                id="email"
                placeholder="Enter email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control input"
                id="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              ¿No tienes una cuenta? <a href="#/register">Registrarse.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
