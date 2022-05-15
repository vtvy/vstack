import React, { useState } from "react";
import Box from "../../../components/Box";
import CommentForm from "./CommentForm";
import CommentMenu from "./CommentMenu";
function Comment({ comment, onClickReply, onEditComment, onDeleteComment }) {
    const [isOpenCommentMenu, setIsOpenCommentMenu] = useState(false);
    const [idEditComment, setIdEditComment] = useState("");
    const [idTopZIndex, setIdTopZIndex] = useState("");

    const handleClickReply = () => {
        onClickReply(comment._id, comment.user);
    };
    const handleOpenCommentMenu = () => {
        setIdTopZIndex(comment._id);
        setIsOpenCommentMenu(!isOpenCommentMenu);
    };

    const handleEditComment = (data) => {
        setIdEditComment("");
        onEditComment(data);
    };
    return (
        <div className="dark:text-textColorDark">
            {idEditComment === comment._id ? (
                <>
                    <CommentForm
                        onSubmit={handleEditComment}
                        initialValue={comment}
                        type={`editComment${comment._id}`}
                    />
                    <span
                        className="ml-20 text-xl cursor-pointer hover:text-indigo-600 "
                        onClick={() => setIdEditComment("")}
                    >
                        Cancel
                    </span>
                </>
            ) : (
                <div
                    className={`flex w-full relative ${
                        idTopZIndex === comment._id ? "z-50" : "z-10"
                    }`}
                >
                    <div className="flex flex-col flex-1 ml-4">
                        <div
                            className={`flex flex-col mb-4 max-w-[95%] items-start ${
                                idTopZIndex === comment._id ? "z-50" : "z-10"
                            } `}
                        >
                            <Box
                                custom={`min-h-[4rem] rounded-[1.6rem] bg-[#F0F2F5] flex flex-col relative overflow-visible group dark:bg-[#BEDAFD]`}
                            >
                                <span className="text-2xl text-black font-medium ">
                                    {comment.user.name}
                                </span>
                                <span className="font-thin text-black">
                                    {comment.commentText}
                                </span>
                                <span className="w-96 h-full top-0 absolute right-0 translate-x-full"></span>
                                <div
                                    className="absolute -right-12 w-10 h-10 hidden rounded-[50%] cursor-pointer  top-1/2 -translate-y-1/2 group-hover:flex hover:bg-slate-300 items-center justify-center"
                                    onClick={handleOpenCommentMenu}
                                >
                                    <i className="fas fa-ellipsis-h"></i>
                                    {isOpenCommentMenu && (
                                        <CommentMenu
                                            setIdEditComment={setIdEditComment}
                                            commentId={comment._id}
                                            onDelete={onDeleteComment}
                                        />
                                    )}
                                </div>
                            </Box>

                            <div className="ml-4 text-xl space-x-4">
                                <span className="cursor-pointer">Like</span>
                                <span
                                    className="cursor-pointer"
                                    onClick={handleClickReply}
                                >
                                    Reply
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comment;
