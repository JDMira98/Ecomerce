import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { resetUser, UserKey } from "../../redux/states/user";
import "bootstrap/dist/css/bootstrap.min.css";
import { clearLocalStorage } from "../../utilities";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(PublicRoutes.LOGIN, { replace: true });
  };
  return (
    <button className="btn btn-outline-danger" onClick={logOut}>
      <i className="bi bi-box-arrow-right"></i> Logout
    </button>
  );
}
export default Logout;
