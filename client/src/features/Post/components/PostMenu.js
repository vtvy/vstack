import React from "react";

function PostMenu({ setIsEditPost, onDelete }) {
    const handleClickDelete = () => {
        const answer = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (answer) {
            onDelete();
        }
    };

    return (
        <div className="absolute p-2 right-2 rounded-lg w-64 bg-slate-200 dark:bg-indigo-1050 dark:text-textColorDark shadow-xl z-10">
            <ul className="flex flex-col w-full space-y-2">
                <li
                    className="flex w-full items-center"
                    onClick={() => setIsEditPost(true)}
                >
                    <div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200 dark:hover:bg-indigo-850">
                        <i className="fas fa-edit w-12"></i>
                        <span className=" text-2xl">Edit</span>
                    </div>
                </li>
                <li
                    className="flex w-full items-center"
                    onClick={handleClickDelete}
                >
                    <div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200 dark:hover:bg-indigo-850">
                        <i className="fas fa-trash-alt w-12"></i>
                        <span className=" text-2xl">Delete</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default PostMenu;
