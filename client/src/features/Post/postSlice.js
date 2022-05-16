import { createSlice } from "@reduxjs/toolkit";
import compareDate from "../../myFunction/compareDate";

const postSlice = createSlice({
    name: "post",
    initialState: {
        postList: [],
        pending: true,
    },
    reducers: {
        setPostList: (state, action) => {
            const postList = action.payload;
            postList.sort((a, b) => compareDate(a.updatedAt, b.updatedAt));

            state.postList = postList;
        },
        addNewPost: (state, action) => {
            state.postList.unshift(action.payload);
        },
        deletePost: (state, action) => {
            state.postList = state.postList.filter(
                (post) => post.id !== action.payload
            );
            return state;
        },
        updatePost: (state, action) => {
            const indexOfPostUpdate = state.postList.findIndex(
                (post) => post.id === action.payload.id
            );
            state.postList[indexOfPostUpdate] = action.payload;
        },
    },
});

const { actions, reducer } = postSlice;
export const { setPostList, addNewPost, deletePost, updatePost } = actions;
export default reducer;
