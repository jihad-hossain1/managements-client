import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    // console.log(users);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      });
  };
  return (
    <>
      <div>
        <h2>User Managements system</h2>
        <h4>Numbers of User: {users.length}</h4>
        <form onSubmit={handleUser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" id="" />
          <br />
          <input type="submit" value="add user" />
        </form>
        <div>
          {users.map((user) => (
            <p key={user.id}>
              {user.id} : {user.name} : {user.email}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
