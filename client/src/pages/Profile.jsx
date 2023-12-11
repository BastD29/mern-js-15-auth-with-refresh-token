import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../store/user/apiSlice2";
import { logout } from "../store/auth/slice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, error, isLoading } = useGetMeQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      {userData && (
        <>
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
};

export default Profile;
