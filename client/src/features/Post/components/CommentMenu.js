import React from "react";
import Box from "../../../components/Box";

function CommentMenu({ setIdEditComment, commentId, onDelete }) {
    const handleClickDelete = () => {
        const answer = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (answer) {
            onDelete(commentId);
        }
    };
    return (
        <div className="w-40 h-20 absolute bottom-14 -right-40 translate-y-full">
            <div className="w-full bg-gray-200">
                <ul>
                    <li
                        className="px-2 hover:bg-blue-200"
                        onClick={() => setIdEditComment(commentId)}
                    >
                        Edit
                    </li>
                    <li
                        onClick={handleClickDelete}
                        className="px-2 hover:bg-blue-200"
                    >
                        Delete
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CommentMenu;
