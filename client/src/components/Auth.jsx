import { Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

function Auth() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  async function handleSubmit(e, endpoint) {
    e.preventDefault();
    if (!isLogin && password !== cpassword) {
      setError('passwords does not match');
      return;
    }

    const response = await axios.post(`http://localhost:3000/${endpoint}`, {
      Email: email,
      Password: password
    });

    const data = response.data;

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.Email);
      setCookie('AuthToken', data.token);
      window.location.reload();
    }
  }

  return (
    <div className="auth">
      <form>
        <div className="auth-btn">
          <input
            type="button"
            value='login'
            style={{ backgroundColor: !isLogin ? 'darkgray' : 'white' }}
            onClick={() => setIsLogin(true)} />
          <input
            type="button"
            value='signup'
            style={{ backgroundColor: isLogin ? 'darkgray' : 'white' }}
            onClick={() => setIsLogin(false)} />
        </div>
        <input
          type="email"
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)} />
        <input
          type='password'
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        {!isLogin && <input
          type='password'
          placeholder="confirm password"
          onChange={(e) => setCpassword(e.target.value)} />}
        <input
          type="submit"
          onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Auth;
