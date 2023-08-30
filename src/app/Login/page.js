"use client";
import React, { useContext, useState } from 'react';

import { FaGoogle, FaLock, FaUser, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import log from "./undraw_secure_login_pdn4.svg";
import "./Login.css";
import { Authcontext } from '@/components/Provider/AuthProvider';
import Link from 'next/link';

const LoginPage = () => {
    const [loginError, setLoginError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { signIn, signInWithGoogle,signInWithGithub } = useContext(Authcontext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleLogin = (data) => {
        const { email, password } = data;
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Logged in as ${result.user.email}`,
                });
                reset(); // Reset form fields
            })
            .catch(error => setLoginError("Invalid email or password"));
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                // You can choose to do something with the result if needed
                console.log("Google login successful:", result.user);
            })
            .catch(error => {
                console.error("Google login error:", error);
            });
    };
    const handleGithubSignIn = () => {
        signInWithGithub()
            .then(result => {
                // You can choose to do something with the result if needed
                console.log("Google login successful:", result.user);
            })
            .catch(error => {
                console.error("Google login error:", error);
            });
    };

    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <div className="login-container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleSubmit(handleLogin)} className="sign-in-form signForm">
                            <h2 className="title">Sign in</h2>
                            <p className="text-red-600 text-sm">{loginError}</p>
                            <div className="input-field">
                                <FaUser className="h-6 w-6 mt-3" />
                                <input type="email" {...register('email', { required: 'Email is required' })} placeholder="UserEmail" className=' ' />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="input-field">
                                <FaLock className="h-6 w-6 mt-3" />
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    {...register('password', { required: 'Password is required' })}
                                    placeholder="Password"
                                    className=' relative  '
                                />
                                <div className=' absolute top-3 text-xl w-4'>
                                    {passwordVisible ? (
                                        <FaEyeSlash
                                            className="password-toggle ml-72"
                                            onClick={togglePasswordVisibility}
                                        />
                                    ) : (
                                        <FaEye
                                            className="password-toggle ml-72"
                                            onClick={togglePasswordVisibility}
                                        />
                                    )}
                                </div>
                            </div>
                            <input type="submit" value="Login" className="lbtn solid hover:bg-blue-500" />
                            <p className="social-text">Or Sign in with social platforms</p>

                        </form>
                        <div className="social-media">
                            <button onClick={handleGoogleLogin} className="social-icon">
                                <FaGoogle />
                            </button>
                            <button onClick={handleGithubSignIn} className="social-icon">
                                <FaGithub
                                />
                            </button>

                        </div>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here?</h3>
                            <p>
                                Welcome to Next.js Documentation! Whether you're a seasoned pro or just starting, our comprehensive resources empower you to build exceptional web apps with Next.js. Explore and master modern web development."
                            </p>
                            <Link href="/SignUp">
                                <button className="btn transparent rounded-full" id="sign-up-btn">
                                    Sign up
                                </button>
                            </Link>

                        </div>
                        <img src={log} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;