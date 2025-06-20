import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const urlbase = "https://curly-meme-v6pww7g4vxvr25rg-3001.app.github.dev/api";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Esta funcion se ejecuta para limpiar el formulario
  function clearForm() {
    setUserData({
      email: "",
      password: "",
    });
  }
  const handleOnChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const postUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlbase}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.message) {
          throw new Error(data.message);
        }
        throw new Error("Unexpected Error");
      }
      if (data.access_token) {
        sessionStorage.setItem("access_token", data.access_token)
      }
      clearForm();
      navigate("/private");
    } catch (error) {
      alert("Error adding contact: " + error);
    }
  };



  return (
    <div className="container mt-5">
      <main className="form-signin w-25 m-auto">
        <form onSubmit={postUserData}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userData.email}
              required=""
              onChange={handleOnChange}
            />
            <label for="floatingInput">Email address</label>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={userData.password}
              required=""
              onChange={handleOnChange}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="checkDefault"
            />
            <label className="form-check-label" for="checkDefault">
              Remember me
            </label>
          </div>
          <hr className="my-4" />
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};
