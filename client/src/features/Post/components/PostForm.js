import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Prism from "prismjs";
import Box from "../../../components/Box";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Auth/components/ErrorMessage";
import CardSection from "../../../components/CardSection";
import Loading from "../../../components/Loading";
import languageList from "../../../constants/language";

function PostForm({ onSubmit, initialData, isUploading, type }) {
    const user = useSelector((state) => state.user.current);
    const [isValid, setIsValid] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });
    const onSubmitForm = (data) => {
        if (isValid) {
            // onSubmit(data);
            console.log(data);
        }
    };

    useEffect(() => {
        if (watch("postText") && watch("language")) {
            setIsValid(true);
        } else setIsValid(false);
    }, [watch("postText"), watch("language")]);

    return (
        <div className="w-[50rem] relative">
            <CardSection title={`${type} Question`}>
                <div className="flex items-start">
                    <div className="ml-4">
                        <span className="font-bold">{user.username}</span>
                    </div>
                    <div className="absolute right-4 top-4 w-16 h-16 rounded-[50%] bg-slate-200 flex items-center justify-center cursor-pointer close-position hover:bg-slate-300">
                        <i className="fa-solid fa-xmark close-position"></i>
                    </div>
                </div>
                <form
                    className="w-full h-full mt-4 flex flex-col pb-4 "
                    onSubmit={handleSubmit(onSubmitForm)}
                >
                    <div className="flex flex-col mt-4 mb-4">
                        <label
                            htmlFor="postContent"
                            className="text-indigo-600 font-semibold"
                        >
                            <i className="fas fa-scroll"></i>Question
                        </label>
                        <textarea
                            className=" outline-none resize-none dark:border-indigo-950 rounded-lg bg-white dark:bg-indigo-950 px-6 py-4 h-full"
                            type="text"
                            rows="3"
                            name="content"
                            id="postContent"
                            defaultValue={initialData.postText || ""}
                            {...register("postText")}
                            placeholder="Write something..."
                        />
                        {errors.content ? (
                            <ErrorMessage
                                message={"Content post is required field"}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col mb-8">
                        <div className="text-indigo-600 font-semibold">
                            <i className="fas fa-paperclip"></i>Language
                        </div>

                        <div className="border border-solid border-slate-300 dark:border-indigo-950 shadow-md flex justify-around rounded-lg bg-white px-6 py-4 h-full focus:outline-indigo-600 dark:bg-indigo-1050">
                            {languageList.map((lang, key) => {
                                return (
                                    <label
                                        title={lang}
                                        key={key}
                                        htmlFor={lang}
                                        className="flex justify-center items-center"
                                    >
                                        <input
                                            type="radio"
                                            name="language"
                                            value={lang}
                                            id={lang}
                                            {...register("language")}
                                            className="form-check-input appearance-none border border-gray-300 rounded-full h-4 w-4 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                        />
                                        {lang}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        w="w-full"
                        h="h-[4rem] "
                        isValid={!isUploading && isValid}
                    >
                        <span className="capitalize">{type} Post</span>
                    </Button>
                </form>
            </CardSection>
            {isUploading && <Loading />}
        </div>
    );
}

export default PostForm;
