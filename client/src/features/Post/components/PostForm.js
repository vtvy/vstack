import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "../../../components/Box";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../Auth/components/ErrorMessage";
import CardSection from "../../../components/CardSection";
import Loading from "../../../components/Loading";

function PostForm({ onSubmit, initialData, isUploading, type }) {
    const user = useSelector((state) => state.user.current);
    const [imageSelected, setImageSelected] = useState(initialData.postImage);
    const [isValid, setIsValid] = useState(false);
    const [reviewImage, setReviewImage] = useState({});
    useEffect(() => {
        setReviewImage({
            type: initialData.postImage ? "cloud" : "local",
            path: initialData.postImage,
        });
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });
    const onSubmitForm = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "postImage") {
                formData.append(key, imageSelected);
            } else formData.append(key, data[key]);
        });
        if (!isUploading && isValid) {
            onSubmit(formData);
        }
    };

    useEffect(() => {
        if (watch("postText") || imageSelected) {
            setIsValid(true);
        } else setIsValid(false);
    }, [watch("postText"), imageSelected]);

    const handleAddImage = (e) => {
        const image = e.target.files[0];
        const reviewImage = URL.createObjectURL(image);
        setReviewImage({ type: "local", path: reviewImage });
        setImageSelected(image);
    };
    const handleUndoAddImage = () => {
        setReviewImage({ type: "local", path: "" });
        setImageSelected();
    };

    return (
        <div className="w-[50rem] relative">
            <CardSection title={`${type} Post`}>
                <div className="flex items-start">
                    <div className="ml-4">
                        <span className="font-bold">{user.name}</span>
                    </div>

                    <div className="absolute right-4 top-4 w-16 h-16 rounded-[50%] bg-slate-200 flex items-center justify-center cursor-pointer close-position hover:bg-slate-300">
                        <i className="fas fa-times close-position font-thin text-3xl dark:text-black"></i>
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
                            <i className="fas fa-scroll"></i>Post
                        </label>
                        <textarea
                            className=" outline-none resize-none dark:border-indigo-950 rounded-lg bg-white dark:bg-indigo-950 px-6 py-4 h-full"
                            type="text"
                            rows="3"
                            name="content"
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
                    {reviewImage.path && (
                        <Box custom="relative bg-slate-200 border border-solid border-slate-300 shadow-md">
                            <div className="max-h-96 rounded-lg overflow-y-scroll relative scrollbar"></div>
                            <div
                                className="absolute right-12 cursor-pointer top-6 w-10 h-10 bg-indigo-600 rounded-full flex justify-center items-center text-white"
                                onClick={handleUndoAddImage}
                            >
                                <i className="fas fa-times font-thin"></i>
                            </div>
                        </Box>
                    )}
                    <div className="flex flex-col mb-8">
                        <label className="text-indigo-600 font-semibold">
                            <i className="fas fa-paperclip"></i>Attach
                        </label>

                        <div className="border border-solid border-slate-300 dark:border-indigo-950 shadow-md flex justify-around rounded-lg bg-white px-6 py-4 h-full focus:outline-indigo-600 dark:bg-indigo-1050">
                            <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                                <i className="far fa-grin-beam text-5xl"></i>
                            </div>
                            <label htmlFor="file">
                                <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                                    <i className="fas fa-photo-video"></i>
                                </div>
                            </label>
                            <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                                <i className="fas fa-user-tag"></i>
                            </div>

                            <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                        </div>

                        <input
                            className="appearance-none hidden"
                            type="file"
                            rows="7"
                            name="file"
                            id="file"
                            {...register("postImage")}
                            onChange={handleAddImage}
                        />
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
