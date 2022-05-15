import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axiosClient from "../../../../api/axiosClient";
import RegisterForm from "../../components/RegisterForm";
import { register } from "../../userSlice";

function RegisterPage() {
    const dispatch = useDispatch();

    const handleRegister = async (data) => {
        try {
            console.log(data);
            const action = register(data);
            dispatch(action);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="md:max-w-[50rem] w-full bg-white h-screen flex justify-center  flex-col pt-12 lg:px-28 md:items-start items-center px-4 space-y-12 ">
            <div>
                <h1 className="my-2 text-7xl font-bold text-slate-700">
                    Register
                </h1>
            </div>

            <RegisterForm onSubmit={handleRegister} />

            <div className="py-4 border-t text-center md:text-left w-full border-solid border-gray-300">
                <p className="my-4 text-2xl text-gray-600">
                    Already an account?
                    <Link
                        to="/login"
                        className="font-medium ml-2 text-2xl text-indigo-600 underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
