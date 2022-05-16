import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../../api/postApi";
import Modal from "../../../../components/Modal";
import PostForm from "../../components/PostForm";
import { addNewPost, updatePost } from "../../postSlice";

function AddEditPost({ setIsAddEditPost, content }) {
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);
    const user = useSelector((state) => state.user.current);

    const handleCreateNewPost = async (data) => {
        setIsUploading(true);
        try {
            const res = await postApi.create(data);
            if (res.data.status) {
                setIsUploading(false);
                const newPost = {
                    ...res.data.post,
                    comment: [],
                    vote: [],
                    user,
                };
                const action = addNewPost(newPost);
                dispatch(action);
                setIsAddEditPost(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditPost = async (data) => {
        setIsUploading(true);
        if (
            data.question === content.initialValue.question &&
            data.language === content.initialValue.language
        ) {
            setIsAddEditPost(false);
        } else {
            try {
                const updatedData = {
                    ...data,
                    id: content.initialValue.id,
                };
                const res = await postApi.update(updatedData);
                if (res.data.status) {
                    const action = updatePost(res.data.post);
                    dispatch(action);
                    setIsAddEditPost(false);
                    setIsUploading(false);
                } else {
                    alert(res.data.error);
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <>
            <Modal setIsOpen={setIsAddEditPost}>
                <PostForm
                    onSubmit={
                        content.type === "create"
                            ? handleCreateNewPost
                            : handleEditPost
                    }
                    isUploading={isUploading}
                    initialData={content.initialValue}
                    type={content.type}
                />
            </Modal>
        </>
    );
}

export default AddEditPost;
