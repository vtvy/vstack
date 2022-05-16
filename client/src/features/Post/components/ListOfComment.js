import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import commentApi from "../../../api/commentApi";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function ListOfComment({ postId, setNumberOfComments }) {
    const [listOfComment, setListOfComment] = useState([]);
    const user = useSelector((state) => state.user.current);

    useEffect(() => {
        const getListOfComment = async () => {
            try {
                const res = await commentApi.getAll(postId);
                if (res.data.status) {
                    setListOfComment(res.data.comments);
                } else alert(res.data.error);
            } catch (error) {
                console.log(error);
            }
        };
        getListOfComment();
    }, []);

    const handleCreateComment = async (data) => {
        try {
            const res = await commentApi.create({
                ...data,
                postId,
            });
            if (res.data.status) {
                const newComment = {
                    ...data,
                    id: res.data.id,
                    user: {
                        id: user.id,
                        username: user.username,
                    },
                };
                setNumberOfComments((prevNum) => ++prevNum);
                setListOfComment([...listOfComment, newComment]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await commentApi.deleteCommentById(commentId);
            if (res.data.status) {
                setNumberOfComments((prevNum) => --prevNum);
                setListOfComment(
                    listOfComment.filter((comment) => comment.id !== commentId)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditComment = async (data) => {
        try {
            const res = await commentApi.updateCommentById({ ...data, postId });
            if (res.data.status) {
                let newListOfComment = listOfComment.map((comment) => {
                    if (comment.id === data.commentId)
                        return { ...comment, reply: data.reply };
                    return comment;
                });
                setListOfComment(newListOfComment);
            } else console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="space-y-10">
            {listOfComment.map((comment, key) => {
                return (
                    <div key={key}>
                        <Comment
                            comment={comment}
                            onDeleteComment={handleDeleteComment}
                            onEditComment={handleEditComment}
                        />
                    </div>
                );
            })}
            <div className="mt-4">
                <CommentForm
                    onSubmit={handleCreateComment}
                    initialValue={{
                        reply: "",
                    }}
                />
            </div>
        </div>
    );
}

export default ListOfComment;
