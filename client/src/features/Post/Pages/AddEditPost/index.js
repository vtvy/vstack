import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../../api/postApi';
import Modal from '../../../../components/Modal';
import PostForm from '../../components/PostForm';
import { addNewPost, updatePost } from '../../postSlice';

function AddEditPost({ setIsAddEditPost, content }) {
	const dispatch = useDispatch();
	const [isUploading, setIsUploading] = useState(false);
	const user = useSelector((state) => state.user.current);

	const handleCreateNewPost = async (data) => {
		data.append('email', user.email);
		setIsUploading(true);
		try {
			const res = await postApi.create(data);
			if (res.data.success) {
				setIsUploading(false);
				const newPost = res.data.newPost;
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
		const isImageChange = !(
			data.get('postImage') === content.initialValue.postImage
		);
		if (
			!isImageChange &&
			data.get('postText') === content.initialValue.postText
		) {
			setIsAddEditPost(false);
		} else {
			try {
				data.append('email', user.email);
				data.append('isImageChange', isImageChange);
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
						content.type === 'create' ? handleCreateNewPost : handleEditPost
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
