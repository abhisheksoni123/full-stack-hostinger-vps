import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState(0);

  useEffect(() => {
    fetch("http://200.141.1.49/api/message")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setMessage(data.message);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  return (
    <>
      <h1>Welcome to chai with Abhi soni</h1>
      <h2>Data {message}</h2>
    </>
  );
}

export default App;
