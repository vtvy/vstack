import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import StorageKeys from '../../constants/storageKeys';

function Follow({ id, listOfFollowers }) {
	const user = useSelector((state) => state.user.current);
	const [isFollowed, setIsFollowed] = useState(
		listOfFollowers.includes(user._id)
	);
	useEffect(() => {
		setIsFollowed(listOfFollowers.includes(user._id));
	}, [user]);
	const handleFollow = async () => {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		try {
			const res = await axiosClient.put(
				'user/follow',
				{ friendID: id },
				{
					headers: { accessToken },
				}
			);
			if (res.data.success) {
				setIsFollowed(res.data.state === 1 ? true : false);
			}
		} catch (error) {}
	};
	return (
		<>
			<div
				className={` cursor-pointer rounded-lg w-[8rem] flex justify-center items-center shadow py-2 px-4 transition-all duration-[0.1s] ${
					isFollowed
						? 'text-white bg-indigo-500'
						: 'text-indigo-600 bg-slate-100'
				}`}
				onClick={handleFollow}
			>
				<span>{isFollowed ? 'Followed' : 'Follow'}</span>
			</div>
		</>
	);
}

export default Follow;
