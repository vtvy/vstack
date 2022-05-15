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
            <div className="w-[32rem] self-start flex-col space-y-8 ml-8 rounded-lg hidden lg:flex">
                <CardSection title="Stories">
                    <div className="flex-col space-y-4">
                        <div className="flex items-center">
                            <div className="w-20 h-20 border border-solid border-slate-300 rounded-full flex justify-center items-center cursor-pointer text-5xl mr-4">
                                +
                            </div>
                            <div className="flex flex-1 flex-col space-y-2">
                                <span className="text-[1.6rem]">
                                    Post your question
                                </span>
                                <span className="text-xl">
                                    Time to ask something
                                </span>
                            </div>
                        </div>
                        <div className="mt-12">
                            <Button custom="w-full" p="p-4">
                                {" "}
                                See All
                            </Button>
                        </div>
                    </div>
                </CardSection>
            </div>
        </div>
    );
}
export default Home;
