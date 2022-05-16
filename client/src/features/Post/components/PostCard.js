import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import postApi from "../../../api/postApi";
import { ModalContext } from "../../../App";
import Box from "../../../components/Box";
import useClickOutside from "../../../Hooks/useClickOutside";
import getDifferenceTime from "../../../myFunction/getDifferenceTime";
import { deletePost } from "../postSlice";
import Vote from "./Vote";
import ListOfComments from "./ListOfComment";
import PostMenu from "./PostMenu";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";

function PostCard({ post }) {
    Prism.highlightAll();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.current);
    const [isEditPost, setIsEditPost] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);
    const [refInside, isInside, setIsInside] = useClickOutside(false);
    const [voteState, setVoteState] = useState(0);
    const [numberOfComments, setNumberOfComments] = useState(
        post.comment.length
    );

    //check vote state
    useEffect(() => {
        post.vote.map((eachVote) => {
            if (eachVote.userId === user.id) {
                if (eachVote.upVote) {
                    setVoteState(1);
                } else {
                    setVoteState(-1);
                }
            }
            return true;
        });
    }, [post, user, setVoteState]);

    const setModal = useContext(ModalContext);
    useEffect(() => {
        setModal({
            isOpen: isEditPost,
            type: "post",
            setIsOpen: setIsEditPost,
            content: {
                type: "edit",
                initialValue: post,
            },
        });
    }, [isEditPost, post, setModal]);

    //delete post
    const handleDeletePost = async () => {
        try {
            const res = await postApi.deletePostById(post.id);
            if (res.data.status) {
                const action = deletePost(post.id);
                dispatch(action);
            }
        } catch (error) {
            alert(error);
        }
    };

    const { differenceNumber, timeUnit } = getDifferenceTime(post.updatedAt);
    return (
        <>
            <Box height="w-full" bg="bg-white shadow-lg" p="p-6">
                <div className="flex flex-1 mb-6 items-center">
                    <div className="flex flex-1">
                        <div className="flex flex-col ml-4">
                            <Link
                                title={`${post.user.username} Profile`}
                                to={`/profile/${post.user.id}`}
                                className="cursor-pointer"
                            >
                                <span className="text-red-500 dark:text-slate-300">
                                    {post.user.username}
                                </span>
                            </Link>
                            <span className="text-xl text-slate-700 dark:text-textColorDark">{`${differenceNumber} ${timeUnit} ago`}</span>
                        </div>
                    </div>
                    {post.user.id === user.id && (
                        <div
                            ref={refInside}
                            className="justify-self-end relative cursor-pointer"
                            onClick={() => setIsInside(!isInside)}
                        >
                            <div className=" p-2  transition-all hover:bg-slate-200 flex justify-center items-center rounded-full dark:text-textColorDark">
                                <i className="fa fa-ellipsis-h"></i>
                            </div>
                            {isInside && (
                                <PostMenu
                                    setIsEditPost={setIsEditPost}
                                    onDelete={handleDeletePost}
                                />
                            )}
                        </div>
                    )}
                </div>
                <div className="Code">
                    <h2 className="ml-2 font-semibold">
                        {post.language.toUpperCase()}
                    </h2>
                    <pre className="line-numbers">
                        <code className={`language-${post.language}`}>
                            {post.question}
                        </code>
                    </pre>
                </div>

                <div className="flex justify-between mb-[0.2rem]">
                    <span className="text-slate-600 dark:text-textColorDark">
                        <span className="text-indigo-600 pr-2">
                            {post.vote.reduce(
                                (pre, curr) =>
                                    curr.upVote ? pre + 1 : pre - 1,
                                0
                            )}
                        </span>
                        Score
                    </span>
                    {numberOfComments >= 0 && (
                        <span
                            onClick={() => setIsShowComment(!isShowComment)}
                            className="hover:underline decoration-[0.5px] cursor-pointer text-slate-600 dark:text-textColorDark"
                        >
                            <span className="text-indigo-600 ">
                                {numberOfComments}
                            </span>
                            {numberOfComments > 1 ? " Comments" : " Comment"}
                        </span>
                    )}
                </div>
                <div className="flex flex-1 justify-between pt-2  border-t border-solid border-slate-300">
                    <Vote
                        vote={voteState}
                        post={post}
                        setVote={setVoteState}
                        role={1}
                    />
                    <Vote
                        vote={voteState}
                        post={post}
                        setVote={setVoteState}
                        role={-1}
                    />
                    <div
                        className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative dark:text-textColorDark"
                        onClick={() => setIsShowComment(!isShowComment)}
                    >
                        <i className="far fa-comment-alt  "></i> Comment
                    </div>
                </div>
                {isShowComment && (
                    <div className="border-t w-full border-solid border-slate-300 pt-4 mt-2">
                        <ListOfComments
                            type="comment"
                            postId={post.id}
                            setNumberOfComments={setNumberOfComments}
                        />
                    </div>
                )}
            </Box>
        </>
    );
}

export default PostCard;
