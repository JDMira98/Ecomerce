import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { resetUser, UserKey } from "../../redux/states/user";
import "bootstrap/dist/css/bootstrap.min.css";
import { clearLocalStorage } from "../../utilities";
import { UserInfo } from "../../models/user.model";

function AuthButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener el id del usuario desde el estado de Redux
  const userId = useSelector((state: UserInfo) => state.user.id);

  const HandleAuthLogout = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate("/", { replace: true });
  };

  const HandleAuthLogin = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate("/" + PublicRoutes.LOGIN, { replace: true });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {userId !== 0 ? (
        <button
          className="btn btn-outline-danger me-2"
          onClick={HandleAuthLogout}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      ) : (
        <button
          className="btn btn-outline-primary me-2"
          onClick={HandleAuthLogin}
        >
          <i className="bi bi-box-arrow-in-right"></i> Login
        </button>
      )}
    </div>
  );
}

export default AuthButton;
