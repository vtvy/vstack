import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { login } from "../../userSlice";

function LoginPage() {
    const dispatch = useDispatch();
    const handleLogin = async (values) => {
        try {
            const actions = login(values);
            dispatch(actions);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="md:max-w-[50rem] md:items-start max-w-full items-center w-full bg-white h-screen flex  flex-col pt-24 md:px-28 px-4 space-y-12 ">
            <div>
                <h1 className="my-6  text-7xl font-bold text-slate-700">
                    Login
                </h1>
                <span className="inline-block text-2xl text-gray-500">
                    Enter your username and password.
                </span>
            </div>
            <LoginForm onSubmit={handleLogin} />
            <div className="py-4 border-t border-solid w-full border-gray-300">
                <p className="my-4 text-2xl text-gray-600">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="font-medium ml-2 text-2xl text-indigo-600 underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
