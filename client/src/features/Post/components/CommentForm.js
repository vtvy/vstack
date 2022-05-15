import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Box from "../../../components/Box";

function CommentForm({ onSubmit, initialValue, type }) {
    const userID = useSelector((state) => state.user.current.userID);
    const inputRef = useRef(null);
    const [reviewImage, setReviewImage] = useState("");
    const [imageSelected, setImageSelected] = useState(
        initialValue.commentImage
    );

    useEffect(() => {
        setReviewImage({
            type: initialValue.commentImage ? "cloud" : "local",
            path: initialValue.commentImage,
        });
    }, []);

    const { register, handleSubmit, reset, setValue } = useForm({
        model: "onChange",
    });
    const userAvatar = useSelector((state) => state.user.current.avatar);
    const onSubmitForm = (data) => {
        if (!data.commentText && !imageSelected) {
            alert("you must have at least one field for your comment");
        } else {
            const formData = new FormData();
            const isImageChange = initialValue.commentImage !== imageSelected;
            formData.append("commentID", initialValue._id);
            formData.append("postID", initialValue.post);
            formData.append("userID", userID);
            formData.append("commentText", data.commentText);
            formData.append("isImageChange", isImageChange);
            onSubmit(formData);
            handleRemoveImage();
            reset();
        }
    };

    const handleAddImage = (e) => {
        const image = e.target.files[0];
        const reviewImage = URL.createObjectURL(image);
        setReviewImage({ type: "local", path: reviewImage });
        setImageSelected(image);
    };
    const handleRemoveImage = () => {
        setReviewImage({ type: "local", path: "" });
        setImageSelected();
    };

    useEffect(() => {
        setValue("commentText", initialValue.commentText);
        inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [initialValue]);

    return (
        <>
            <div className="flex w-full items-center">
                <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
                    <Box custom="w-full py-3 flex items-center relative bg-[#f0f2f5] rounded-[2rem] dark:bg-[#BEDAFD] ">
                        <input
                            className="w-full outline-none dark:text-black bg-[#f0f2f5] dark:bg-[#BEDAFD]"
                            autoFocus
                            type="text"
                            placeholder="write an answer..."
                            {...register("commentText")}
                        />
                        <div className=" absolute right-8 text-xl opacity-60 ">
                            <label htmlFor={type}>
                                <i className="fas fa-photo-video cursor-pointer"></i>
                            </label>
                            <input
                                className="appearance-none hidden"
                                type="file"
                                id={type}
                                name=""
                                {...register("commentImage")}
                                onChange={(e) => handleAddImage(e)}
                            />
                        </div>
                    </Box>
                </form>
            </div>
            {reviewImage.path && (
                <div className="ml-16 mt-4 relative w-40 h-40">
                    <span
                        className="absolute right-2 text-white cursor-pointer "
                        onClick={handleRemoveImage}
                    >
                        x
                    </span>
                </div>
            )}
            <div ref={inputRef} className="w-1 h-1"></div>
        </>
    );
}

export default CommentForm;
