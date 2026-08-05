import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

function Home() {
  const { data: users, loading, error, callApi } = useApi();

  useEffect(() => {
    callApi("/api/users");
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;
  return (
    <div className="text-red-300 flex items-center flex-col justify-center p-20">
      <h1>User List</h1>
      {users &&
        users.map((ele) => (
          <div
            className="flex items-center justify-center border gap-4 w-96"
            key={ele._id}
          >
            <h2>{ele.userName}</h2>
            <h3>{ele.email}</h3>
          </div>
        ))}
    </div>
  );
}
export default Home;
