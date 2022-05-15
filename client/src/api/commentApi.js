import StorageKeys from '../constants/storageKeys';
import axiosClient from './axiosClient';
const accessToken = localStorage.getItem(StorageKeys.accessToken);

const commentApi = {
	create(data) {
		const url = '/comment/create';

		return axiosClient.post(url, data, {
			headers: { accessToken },
		});
	},

	async getAll() {
		const url = '/comment';
		const res = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return res;
	},
	async getPostComments(postId) {
		const url = `/comment/${postId}`;
		const res = await axiosClient.get(url, {
			headers: { accessToken },
		});

		return res;
	},
	async getCommentById(id) {
		const url = `/comment/${id}`;

		const res = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return res;
	},

	async updateCommentById(id, data) {
		const url = `/comment/update/${id}`;
		const res = await axiosClient.put(url, data, {
			headers: { accessToken },
		});

		return res;
	},

	async deleteCommentById(id) {
		const url = `/comment/delete/${id}`;
		const res = await axiosClient.delete(url, {
			headers: { accessToken },
		});
		return res;
	},
};

export default commentApi;
