import { useGetMeQuery } from "../store/user/apiSlice";

const Profile = () => {
  const { data: userData, error, isLoading } = useGetMeQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
