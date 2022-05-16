import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userApi from "../../api/userApi";
import ListOfPost from "../Post/components/ListOfPost";

function Profile() {
    let params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState({});
    useEffect(() => {
        const getUserById = async () => {
            try {
                const res = await userApi.getUserById(params.id);
                if (res.data.status) {
                    setProfile(res.data.profile);
                    setIsLoading(false);
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserById();
    }, [params.id]);
    return (
        <div className="w-full flex flex-col space-y-6 ">
            <ListOfPost postList={profile.post} isLoading={isLoading} />
        </div>
    );
}

export default Profile;
