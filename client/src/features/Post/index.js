import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ModalContext } from "../../App";
import Box from "../../components/Box";
import CardSection from "../../components/CardSection";

function CreatePost() {
    const [isAddPost, setIsAddPost] = useState(false);
    const user = useSelector((state) => state.user.current);
    const setModal = useContext(ModalContext);
    useEffect(() => {
        setModal({
            isOpen: isAddPost,
            type: "post",
            setIsOpen: setIsAddPost,
            content: {
                type: "create",
                initialValue: { question: "", language: "" },
            },
        });
    }, [isAddPost, setModal]);
    return (
        <div className="mb-6">
            <CardSection title="Create Post">
                <div
                    className=" flex items-center cursor-pointer"
                    onClick={() => setIsAddPost(true)}
                >
                    <Box custom="bg-[#f0f2f5] rounded-[2rem] py-2 px-4 w-full mx-4 flex-1 hover:bg-[#E4E6E9] dark:bg-[#BEDAFD] dark:text-slate-700">
                        <span className="opacity-80">
                            Hello {user.username} ! what's new?
                        </span>
                    </Box>
                </div>
            </CardSection>
        </div>
    );
}

export default CreatePost;
