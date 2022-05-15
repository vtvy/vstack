import React from "react";
import { useDispatch } from "react-redux";
import postApi from "../../../api/postApi";
import { updatePost } from "../postSlice";

function Vote({ vote, post, role }) {
    const dispatch = useDispatch();

    const handleVotePost = async () => {
        //     try {
        //         const res = await postApi.setLove(postID);
        //         if (res.data.success) {
        //             await socket.emit("likePost", res.data.lovedPost);
        //             const action = updatePost(res.data.lovedPost);
        //             dispatch(action);
        //         } else console.log(res.data.message);
        //     } catch (error) {
        //         console.log(error);
        //     }
    };
    <i class="fa-solid fa-up"></i>;

    return (
        <>
            <div className="relative flex-1">
                <div
                    className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative "
                    onClick={handleVotePost}
                >
                    {vote === role ? (
                        <i
                            className={
                                role === 1
                                    ? "fa-solid fa-thumbs-up text-blue-500 mr-2"
                                    : "fa-solid fa-thumbs-down text-blue-500 mr-2"
                            }
                        ></i>
                    ) : (
                        <i
                            className={
                                role === 1
                                    ? "fa-solid fa-thumbs-up text-black mr-2"
                                    : "fa-solid fa-thumbs-down text-black mr-2"
                            }
                        ></i>
                    )}
                    {role === 1 ? "Upvote" : "Devote"}
                </div>
            </div>
        </>
    );
}

export default Vote;
