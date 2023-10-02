import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AppPages } from '../../components/navigation/page_links'; 
import { cloud_imgs, all_images } from '../../../backend/assets/cloudinary';
import styles from '../../assets/styles/module.css/authenticate.module.css';

const Signup = ({ backendhost }) => {
  const [registerError, setRegisterError] = useState('');
  const [details, setDetails] = useState({
    email: '',
    password1: '',
    password2: ''
  });
  const logo = cloud_imgs(all_images.header.logo);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (details.password1 !== details.password2) {
      setRegisterError('Passwords do not match');
    } else {
      try {
        const emailCheckResponse = await axios.post(`${backendhost}/members/check_email`, {
          email: details.email
        });

        if (emailCheckResponse.status === 200 && emailCheckResponse.data.exists) {
          setRegisterError('Email already exists');
        } else {
          try {
            const registrationResponse = await axios.post(`${backendhost}/members/register`, {
              email: details.email,
              password: details.password1
            });

            if (registrationResponse.status === 201) {
              setRegisterError(null);
              router.push(AppPages.find(page => page.name === 'Login').path);
            } else {
              setRegisterError('Server error, try again later');
            }
          } catch (error) {
            setRegisterError('Error, refresh');
            console.log(error);
          }
        }
      } catch (error) {
        setRegisterError('Server error, refresh');
        console.log(error);
      }
    }
  };
  
  return (
    <section id={styles.authenticate}>
      <aside>
        <form onSubmit={handleSignup} id={styles.signup}>
          <div className={styles.circle}>
            <img src={logo} alt="logo" />
          </div>
          <h3>RWANDA SCOUTS ASSOCIATION</h3>
          <label>
            <h4>Register</h4>
            <p>Please fill in this form to create an account.</p>
          </label>
          <label>
            <p>Email</p>
            <input
              id={styles.email}
              placeholder="Enter Email"
              name="email"
              type="email"
              required
              value={details.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              id={styles.psw}
              placeholder="Enter Password"
              name="password1"
              type="password"
              required
              value={details.password1}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Repeat Password</p>
            <input
              id={styles.psw_repeat}
              placeholder="Repeat Password"
              name="password2"
              type="password"
              required
              value={details.password2}
              onChange={handleChange}
            />
          </label>
          <button type="submit">SIGNUP</button>
          <p>
            Already have an account?{' '}
            {AppPages.find(page => page.name === 'Login') && (
              <a href={AppPages.find(page => page.name === 'Login').path}>
                Login
              </a>
            )}
          </p>
            {registerError && <p className="error">{registerError}</p>}
        </form>
      </aside>
    </section>
  );
};

export default Signup;
