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
            onSubmit(data);
        }
    };

    useEffect(() => {
        if (watch("question") && watch("language")) {
            setIsValid(true);
        } else setIsValid(false);
    }, [watch("question"), watch("language")]);

    return (
        <div className="w-[50rem] relative">
            <CardSection title={`${type} Question`}>
                <form
                    className="w-full h-full mt-4 flex flex-col pb-4 "
                    onSubmit={handleSubmit(onSubmitForm)}
                >
                    <div className="flex flex-col mt-2 mb-4">
                        <label
                            htmlFor="postContent"
                            className="text-sky-600 mb-4"
                        >
                            <i className="fa-solid fa-code "></i> Question
                        </label>
                        <textarea
                            className="bg-slate-800 text-white h-96 outline-none resize-none dark:border-indigo-950 rounded-lg dark:bg-indigo-950 px-6 py-4"
                            type="text"
                            rows="3"
                            name="content"
                            id="postContent"
                            defaultValue={initialData.question || ""}
                            {...register("question")}
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
                        <div className="text-sky-600">
                            <i className="fa-solid fa-question"></i> Language
                        </div>

                        <div className="flex justify-around rounded-lg bg-white px-6 py-4 h-full focus:outline-indigo-600 dark:bg-indigo-1050">
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
                                            defaultChecked={
                                                lang == initialData.language
                                            }
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
