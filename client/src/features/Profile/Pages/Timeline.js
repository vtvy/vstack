import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postApi from "../../../api/postApi";
import userApi from "../../../api/userApi";
import Post from "../../Post";
import ListOfPost from "../../Post/components/ListOfPost";
import { setPostList } from "../../Post/postSlice";
import ProfileSidebar from "../components/ProfileSidebar";

function Timeline({ user }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    // const [postList, setPostList] = useState();
    const postList = useSelector((state) => state.post.postList);
    useEffect(() => {
        const getProfileByID = async () => {
            try {
                const res = await userApi.getProfileByID(user._id);
                if (res.data.success) {
                    setIsLoading(false);
                    const action = setPostList(res.data.post);
                    dispatch(action);
                    setIsLoading(false);
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProfileByID();
    }, [user]);
    // useEffect(() => {
    // 	const getPosts = async () => {
    // 		try {
    // 			const res = await postApi.getAll();
    // 			if (res.data.success) {
    // 				const action = setPostList(res.data.listOfPost);
    // 				dispatch(action);
    // 				setIsLoading(false);
    // 			}
    // 		} catch (error) {
    // 			alert(error);
    // 		}
    // 	};
    // 	getPosts();
    // }, []);
    return (
        <div className="flex w-full">
            <ProfileSidebar />

            <div className="flex-1">
                <Post />
                <ListOfPost postList={postList} isLoading={isLoading} />
            </div>
        </div>
    );
}

export default Timeline;
