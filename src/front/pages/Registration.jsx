// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Custom hook for accessing the global state.
import { useState } from "react";

const urlbase = "https://curly-meme-v6pww7g4vxvr25rg-3001.app.github.dev/api";

export const Registration = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    state: "",
    country: "",
    zip: "",
  });

  // Esta funcion se ejecuta para limpiar el formulario
  function clearForm() {
    setUserData({
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      password: "",
      state: "",
      country: "",
      zip: "",
    });
  }

  const handleOnChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  };

  const postUserData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${urlbase}/signup`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();      
      if (!response.ok) {
        throw new Error("Error adding contact");
      }
      clearForm();
      navigate('/')
    } catch (error) {
      alert("Error adding contact.");
    }
  }


  return (
    <div className="container mt-5">
      <div className="form-signin w-50 m-auto">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" novalidate="" onSubmit={postUserData}>
          <div className="row g-3">
            <div className="form-floating col-sm-6">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="first_name"
                placeholder=""
                value={userData.first_name}
                required=""
                onChange={handleOnChange}
              />
              <label className="text-start" for="firstName">
                First name
              </label>
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="form-floating col-sm-6">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="last_name"
                placeholder=""
                value={userData.last_name}
                required=""
                onChange={handleOnChange}
              />
              <label for="lastName" className="form-label">
                Last name
              </label>
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
            <div className="form-floating col-12">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder=""
                value={userData.email}
                required=""
                onChange={handleOnChange}
              />
              <label for="email" className="form-label">
                Email
              </label>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="form-floating col-12">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder=""
                value={userData.password}
                required=""
                onChange={handleOnChange}
              />
              <label for="password" className="form-label">
                Password
              </label>
              <div className="invalid-feedback">
                Please enter a valid password address for shipping updates.
              </div>
            </div>
            <div className="form-floating col-12">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder=""
                value={userData.address}
                required=""
                onChange={handleOnChange}
              />
              <label for="address" className="form-label">
                Address
              </label>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="col-md-5">
              <label for="country" className="form-label">
                Country
              </label>
              <select
                className="form-select"
                id="country"
                name="country"
                value={userData.country}
                required=""
                onChange={handleOnChange}
              >
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
            <div className="col-md-4">
              <label for="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                id="state"
                name="state"
                value={userData.state}
                required=""
                onChange={handleOnChange}
              >
                <option value="">Choose...</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Hawai</option>Illinios
                <option>California</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div className="form-floating col-md-3">
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                placeholder=""
                value={userData.zip}
                required=""
                onChange={handleOnChange}
              />
              <label for="zip" className="form-label">
                Zip
              </label>
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>
          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
