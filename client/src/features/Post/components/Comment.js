import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Box from "../../../components/Box";
import CommentForm from "./CommentForm";
function Comment({ comment, onEditComment, onDeleteComment }) {
    const [isEditComment, setIsEditComment] = useState(false);
    const user = useSelector((state) => state.user.current);
    const handleEditComment = (data) => {
        setIsEditComment(false);
        if (data.reply !== comment.reply)
            onEditComment({
                ...data,
                commentId: comment.id,
            });
    };
    const handleDeleteComment = (data) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (confirm) {
            onDeleteComment(comment.id);
        }
    };

    return (
        <div>
            {isEditComment ? (
                <>
                    <CommentForm
                        onSubmit={handleEditComment}
                        initialValue={comment}
                    />
                    <span
                        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-2 rounded-lg"
                        onClick={() => setIsEditComment(false)}
                    >
                        Cancel
                    </span>
                </>
            ) : (
                <div className="flex w-full relative">
                    <div className="flex flex-col flex-1 ml-4">
                        <div className="flex flex-col mb-4 max-w-[95%] items-start">
                            <Box
                                custom={`min-h-[4rem] rounded-[1.6rem] bg-[#F0F2F5] flex flex-col relative overflow-visible group dark:bg-[#BEDAFD]`}
                            >
                                <Link
                                    title={`${comment.user.username} Profile`}
                                    to={`/profile/${comment.user.id}`}
                                    className="cursor-pointer"
                                >
                                    <span className="text-2xl text-black font-medium ">
                                        {comment.user.username}
                                    </span>
                                </Link>
                                <span className="font-thin text-black">
                                    {comment.reply}
                                </span>
                                {user.id === comment.user.id && (
                                    <>
                                        <div
                                            className="absolute -right-12 w-10 h-10 rounded-[50%] cursor-pointer flex -translate-y-12 top-1/2 bg-slate-200 hover:bg-slate-300 items-center justify-center"
                                            onClick={() =>
                                                setIsEditComment(true)
                                            }
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </div>
                                        <div
                                            className="absolute -right-12 w-10 h-10 rounded-[50%] cursor-pointer flex top-1/2  bg-slate-200 hover:bg-red-600 items-center justify-center"
                                            onClick={handleDeleteComment}
                                        >
                                            <i className="fa-solid fa-x"></i>
                                        </div>{" "}
                                    </>
                                )}
                            </Box>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comment;
