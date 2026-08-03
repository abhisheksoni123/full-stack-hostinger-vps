import { useState, useEffect } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="text-red-300 flex items-center flex-col justify-center p-20">
      <h1>User List</h1>
      {users.map((ele) => (
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
