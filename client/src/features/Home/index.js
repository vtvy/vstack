import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../api/postApi";
import Box from "../../components/Box";
import Button from "../../components/Button";
import CardSection from "../../components/CardSection";
import CreatePost from "../Post";
import ListOfPost from "../Post/components/ListOfPost";
import { setPostList } from "../Post/postSlice";

function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const postList = useSelector((state) => state.post.postList);
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const res = await postApi.getAll();
                if (res.data.status) {
                    const action = setPostList(res.data.posts);
                    dispatch(action);
                    setIsLoading(false);
                }
            } catch (error) {
                alert(error);
            }
        };
        getAllPosts();
    }, []);
    return (
        <div className="w-full flex justify-center pb-10">
            <div className="flex flex-col max-w-[65.6rem] w-full">
                <CreatePost />
                <ListOfPost postList={postList} isLoading={isLoading} />
            </div>
        </div>
    );
}
export default Home;
