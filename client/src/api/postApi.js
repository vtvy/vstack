import StorageKeys from '../constants/storageKeys';
import axiosClient from './axiosClient';
const accessToken = localStorage.getItem(StorageKeys.accessToken);

const postApi = {
	create(data) {
		const url = '/post/create';

		return axiosClient.post(url, data, {
			headers: { accessToken },
		});
	},

	async getAll() {
		const url = '/post';
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const res = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return res;
	},
	async getPostById(id) {
		const url = `/posts/${id}`;

		const res = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return res;
	},

	async updatePostById(id, data) {
		const url = `/post/update/${id}`;
		const res = await axiosClient.put(url, data, {
			headers: { accessToken },
		});
		return res;
	},

	async deletePostById(id) {
		const url = `/post/delete/${id}`;
		const res = await axiosClient.delete(url, {
			headers: { accessToken },
		});
		return res;
	},
	async setLove(postID) {
		const url = `/post/love`;
		const res = await axiosClient.put(
			url,
			{ postID },
			{
				headers: { accessToken },
			}
		);
		return res;
	},
};

export default postApi;
