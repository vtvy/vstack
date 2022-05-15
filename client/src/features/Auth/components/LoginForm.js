import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../components/Button";
import InputField from "../../../components/InputFile";
const schema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(4, "Username must be more than 3 characters"),
    passwd: yup
        .string()
        .required()
        .min(4, "Password must be more than 3 characters"),
});

function LoginForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmitForm = (data) => {
        onSubmit(data);
    };

    return (
        <form
            className="max-w-xl w-full mx-auto bg-white rounded-lg  space-y-8"
            onSubmit={handleSubmit(onSubmitForm)}
        >
            {/* username */}
            <div>
                <InputField
                    label=" Username "
                    type="username"
                    name="username"
                    register={register}
                    error={errors.username}
                />
            </div>
            {/* password */}
            <div>
                <InputField
                    label="Password "
                    type="password"
                    name="passwd"
                    register={register}
                    error={errors.passwd}
                />
            </div>
            <div className="flex justify-between text-base">
                <div>
                    <a href="http://" className="text-2xl text-indigo-600">
                        Forgot your Password?
                    </a>
                </div>
            </div>
            <div>
                <Button w={"w-full"} p={"p-4"} isValid={isValid} type="submit">
                    Login
                </Button>
            </div>
        </form>
    );
}

export default LoginForm;
