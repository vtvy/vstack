import React from "react";
import { Link } from "react-router-dom";

function QuickViewUser({ user, showEmail, showFollower, linkTo, size }) {
    return (
        <Link
            to={linkTo ? linkTo : `/profile/${user._id}`}
            className={`flex items-center`}
        >
            <div className="flex flex-col ml-4 ">
                <span className="text-2xl font-semibold dark:text-textColorDark">
                    {user.name}
                </span>
                {showEmail && <span className="text-lg">{user.email}</span>}
                {showFollower && (
                    <span className="text-lg">
                        Follower: {user.followers.length}
                    </span>
                )}
            </div>
        </Link>
    );
}

export default QuickViewUser;
