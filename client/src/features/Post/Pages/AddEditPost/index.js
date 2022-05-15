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
            console.log(data);
            // const res = await postApi.create(data);
            // if (res.data.status) {
            //     setIsUploading(false);
            //     const action = addNewPost(data);
            //     dispatch(action);
            //     setIsAddEditPost(false);
            // }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditPost = async (data) => {
        setIsUploading(true);
        if (
            data.get("postText") === content.initialValue.postText &&
            data.get("language") === content.initialValue.language
        ) {
            setIsAddEditPost(false);
        } else {
            try {
                const res = await postApi.updatePostById(
                    content.initialValue._id,
                    data
                );
                if (res.data.success) {
                    const updatedPost = res.data.updatedPost;
                    const action = updatePost(updatedPost);
                    dispatch(action);
                    setIsAddEditPost(false);
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
