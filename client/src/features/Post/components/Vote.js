import React from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../api/postApi";
import { updatePost } from "../postSlice";

function Vote({ vote, post, setVote, role }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.current);

    const handleVotePost = async () => {
        try {
            const res = await postApi.setVote({
                vote: role,
                postId: post.id,
            });
            if (res.data.status) {
                var notUserVoteList = post.vote.filter(
                    (each) => each.userId != user.id
                );
                var notUserVotePost = {
                    ...post,
                    vote: notUserVoteList,
                };
                if (res.data.vote === 0) {
                    setVote(0);
                    const action = updatePost(notUserVotePost);
                    dispatch(action);
                } else if (res.data.vote === 1) {
                    setVote(1);
                    let newVotedList = [
                        ...notUserVotePost.vote,
                        {
                            userId: user.id,
                            postId: post.id,
                            upVote: true,
                        },
                    ];
                    let newPost = {
                        ...notUserVotePost,
                        vote: newVotedList,
                    };
                    const action = updatePost(newPost);
                    dispatch(action);
                } else {
                    setVote(-1);
                    let newVotedList = [
                        ...notUserVotePost.vote,
                        {
                            userId: user.id,
                            postId: post.id,
                            upVote: false,
                        },
                    ];
                    let newPost = {
                        ...post,
                        vote: newVotedList,
                    };
                    const action = updatePost(newPost);
                    dispatch(action);
                }
            } else alert(res.data.error);
        } catch (error) {
            console.log(error);
        }
    };

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
