import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <section className="login-bg d-flex align-items-center justify-content-center">
        <div style={{ position: "relative", zIndex: 2 }}>
          <Login />
        </div>
      </section>
    </>
  );
}

export default App;
