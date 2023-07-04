import '../../App.css';

import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/login",
      {
        username,
        password
      },
      "POST")
      .then((data) => {
        console.log(data);
        if (!data.message) {
          var id = data._id
          fetchData("/post/getpost",
            {
              id
            },
            "POST")
            .then((_data) => {
              console.log(_data);
              if (!_data.message) {
                navigate("/profile", { state: { id: id, name: username, data: _data } });
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <div className="App">
      <div className="user-form">
        <form onSubmit={onSubmit}>
          <h2>Log in</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Your Username"
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
              placeholder="Your Password"
              required="required"
              id="password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Log In
            </button>
          </div>
        </form>
        <div className="alternate">
          New User? <Link to='/register'> Register here </Link>
        </div>
        <br />
      </div>
    </div>
  );
}

export default LoginForm;
