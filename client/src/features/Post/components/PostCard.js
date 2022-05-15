import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../api/postApi";
import { ModalContext, SocketContext } from "../../../App";
import Box from "../../../components/Box";
import useClickOutside from "../../../Hooks/useClickOutside";
import getDifferenceTime from "../../../myFunction/getDifferenceTime";
import { addNewPost, deletePost, updatePost } from "../postSlice";
import Like from "./Like";
import ListOfComments from "./ListOfComment";
import PostMenu from "./PostMenu";

function PostCard({ post }) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.current);

    const [isEditPost, setIsEditPost] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);
    const [refInside, isInside, setIsInside] = useClickOutside(false);
    const [isLiked, setIsLiked] = useState(
        post.likes.includes(useSelector((state) => state.user.current._id))
    );
    const [numberOfComments, setNumberOfComments] = useState(
        post.comments.length
    );

    //check liked
    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
    }, [post, user]);

    // Likes
    useEffect(() => {
        socket.on("likeToClient", (newPost) => {
            const action = updatePost(newPost);
            dispatch(action);
        });

        return () => socket.off("likeToClient");
    }, [socket, dispatch]);
    // unlike
    useEffect(() => {
        socket.on("unLikeToClient", (newPost) => {
            const action = addNewPost(newPost);
            dispatch(action);
        });
        return () => socket.off("unLikeToClient");
    }, [socket, dispatch]);

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
    }, [isEditPost]);
    //delete post
    const handleDeletePost = async () => {
        try {
            const res = await postApi.deletePostById(post._id);
            if (res.data.success) {
                const action = deletePost(post._id);
                dispatch(action);
            }
        } catch (error) {
            alert(error);
        }
    };

    const { differenceNumber, timeUnit } = getDifferenceTime(post.createdAt);
    return (
        <>
            <Box height="w-full" bg="bg-white shadow-lg" p="p-6">
                <div className="flex flex-1 mb-6 items-center">
                    <div className="flex flex-1">
                        <div className="flex flex-col ml-4">
                            <span className="font-semibold dark:text-slate-300">
                                {post.user.name}
                            </span>
                            <span className="text-xl text-slate-700 dark:text-textColorDark">{`${differenceNumber} ${timeUnit} ago`}</span>
                        </div>
                    </div>
                    <div
                        ref={refInside}
                        className="justify-self-end relative cursor-pointer"
                        onClick={() => setIsInside(!isInside)}
                    >
                        <div className="] p-2  transition-all hover:bg-slate-200 flex justify-center items-center rounded-full dark:text-textColorDark">
                            <i className="fa fa-ellipsis-h"></i>
                        </div>
                        {isInside && (
                            <PostMenu
                                setIsEditPost={setIsEditPost}
                                onDelete={handleDeletePost}
                            />
                        )}
                    </div>
                </div>
                <Box
                    width="w-full"
                    custom="p-0 bg-indigo-600 dark:text-textColorDark"
                >
                    {post.postText && (
                        <div className="p-8">{post.postText}</div>
                    )}
                </Box>

                <div className="flex justify-between mb-[0.2rem]">
                    <span className="text-slate-600 dark:text-textColorDark">
                        <span className="text-indigo-600">
                            {post.likes.length}{" "}
                        </span>
                        Likes
                    </span>
                    {numberOfComments > 0 && (
                        <span
                            onClick={() => setIsShowComment(!isShowComment)}
                            className="hover:underline decoration-[0.5px] cursor-pointer text-slate-600 dark:text-textColorDark"
                        >
                            <span className="text-indigo-600 ">
                                {numberOfComments}
                            </span>
                            {numberOfComments > 1 ? "	Comments" : " Comment"}
                        </span>
                    )}
                </div>
                <div className="flex flex-1 justify-between pt-2  border-t border-solid border-slate-300">
                    <Like
                        postID={post._id}
                        isLiked={isLiked}
                        socket={socket}
                        post={post}
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
                            postID={post._id}
                            setNumberOfComments={setNumberOfComments}
                            post={post}
                        />
                    </div>
                )}
            </Box>
        </>
    );
}

export default PostCard;
