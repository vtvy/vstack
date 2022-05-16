import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storageKeys";

const userApi = {
    register(data) {
        const url = "user/register";
        return axiosClient.post(url, data);
    },

    login(data) {
        const url = "user/login";
        return axiosClient.post(url, data);
    },

    async getUser() {
        const accessToken = localStorage.getItem(StorageKeys.accessToken);
        const url = "user/validate";
        const response = await axiosClient.get(url, {
            headers: { accessToken },
        });
        return response;
    },

    async getUserById(id) {
        const accessToken = localStorage.getItem(StorageKeys.accessToken);
        const url = `/user/profile/${id}`;

        const response = await axiosClient.get(url, {
            headers: { accessToken },
        });

        return response;
    },
};

export default userApi;
