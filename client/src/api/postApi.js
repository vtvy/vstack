import StorageKeys from "../constants/storageKeys";
import axiosClient from "./axiosClient";
const accessToken = localStorage.getItem(StorageKeys.accessToken);

const postApi = {
    create(data) {
        const url = "/question/create";

        return axiosClient.post(url, data, {
            headers: { accessToken },
        });
    },

    async getAll() {
        const url = "/question";
        const accessToken = localStorage.getItem(StorageKeys.accessToken);
        const res = await axiosClient.get(url, {
            headers: { accessToken },
        });
        return res;
    },

    async getPostById(id) {
        const url = `/question/${id}`;

        const res = await axiosClient.get(url, {
            headers: { accessToken },
        });
        return res;
    },

    async update(data) {
        const url = "/question/update";
        const res = await axiosClient.put(url, data, {
            headers: { accessToken },
        });
        return res;
    },

    async deletePostById(id) {
        const url = `/question/delete/${id}`;
        const res = await axiosClient.delete(url, {
            headers: { accessToken },
        });
        return res;
    },

    async setVote(data) {
        const url = "/question/vote";
        const res = await axiosClient.put(url, data, {
            headers: { accessToken },
        });
        return res;
    },
};

export default postApi;
