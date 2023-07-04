import '../../App.css';

import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/register",
      {
        username,
        password
      },
      "POST")
      .then((data) => {
        if (!data.message) {
          console.log(data)
          navigate("/login")
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className="App">
      <div className="user-form">
        <form onSubmit={onSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="johndoe16"
              required="required"
              id="username"
              onChange={onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Your Secret Code"
              required="required"
              id="password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label className="form-check-label">
              <input type="checkbox" required="required" /> I accept the Terms of Use and Privacy Policy
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>
        </form>
        <div className="alternate">
          Existing User? <Link to='/login'>Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;