import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AppPages } from '../../components/navigation/page_links'; 
import { cloud_imgs, all_images } from '../../../backend/assets/cloudinary';
import styles from '../../assets/styles/module.css/authenticate.module.css';

const Login = ({ backendhost }) => {
  const [loginError, setLoginError] = useState('');
  const [details, setDetails] = useState({
    email: '', password: ''
  });
  const logo = cloud_imgs(all_images.header.logo);
  const router = useRouter();

  const handleLogin = async () => {
    console.log('login handle')
    try {
      console.log('here')
      const response = await axios.post(`${backendhost}/members/login`, {
        email: details.email,
        password: details.password
      });
      console.log('here1')
      if (response.status === 200) {
        localStorage.setItem('logged_email', JSON.stringify(details.email));
        setLoginError('');
        setDetails({ email: '', password: '' });
        router.push(AppPages.find((page) => page.name === 'Dashboard').path);
      }
    } catch (error) {
      try {
        const response = await axios.post(`${backendhost}/members/check_email`, {
          email: details.email
        });

        if (response.status === 200 && response.data.exists) {
          setLoginError('Invalid email or password');
        } else {
          setLoginError('User account does not exist');
        }
      } catch (error) {
        setLoginError('Server error, refresh');
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id={styles.authenticate}>
      <aside>
        <form id={styles.login}>
          <div className={styles.circle}>
            <img src={logo} alt="logo" />
          </div>
          <h3>RWANDA SCOUTS ASSOCIATION</h3>
          <h4>Admin Login</h4>
          <label>
            <p>Email</p>
            <input id={styles.email} placeholder="Enter Email" value={details.email}
              onChange={handleChange} name="email" type="email" 
              autoComplete="current-email" required
            />
          </label>
          <label>
            <p>Password</p>
            <input id={styles.psw} placeholder="Enter Password" value={details.password}
              onChange={handleChange} name="password" type="password"
              autoComplete="current-password" required
            />
          </label>
          <button type="button" onClick={handleLogin}>
            LOGIN
          </button>
          <p>
            Do not have an account?{' '}
            {AppPages.find((page) => page.name === 'Signup') && (
              <a href={AppPages.find((page) => page.name === 'Signup').path}>
                Signup
              </a>
            )}
          </p>
          {loginError && <p className="error">{loginError}</p>}
        </form>
      </aside>
    </section>
  );
};

export default Login;