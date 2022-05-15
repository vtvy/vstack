import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storageKeys";

export const register = createAsyncThunk("user/register", async (payload) => {
    try {
        const res = await userApi.register(payload);
        if (res.data.status) {
            localStorage.setItem(StorageKeys.accessToken, res.data.token);
            const resUser = await userApi.getUser();
            const user = resUser.data.user;

            return { user, isLoggedIn: true };
        } else {
            alert(res.data.error);
            return { user: null, isLoggedIn: false };
        }
    } catch (err) {
        console.log(err);
    }
});

export const login = createAsyncThunk("user/login", async (payload) => {
    try {
        const res = await userApi.login(payload);
        if (res.data.status) {
            console.log(res.data);
            localStorage.setItem(StorageKeys.accessToken, res.data.token);
            const resUser = await userApi.getUser();
            const user = resUser.data.user;
            return { user, isLoggedIn: true };
        } else {
            alert(res.data.message);
            return { user: null, isLoggedIn: false };
        }
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.user)) || {},
        isLoggedIn: localStorage.getItem(StorageKeys.accessToken)
            ? true
            : false,
    },
    reducers: {
        setUser(state, action) {
            state.current = action.payload;
        },
        logOut(state) {
            state.current = {};
            state.isLoggedIn = false;
            localStorage.removeItem(StorageKeys.accessToken);
            localStorage.removeItem("theme");
            const root = window.document.documentElement;
            if (root.classList.contains("dark")) root.classList.remove("dark");
        },
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload.user;
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

const { actions, reducer } = userSlice;
export const { logOut, setUser } = actions;
export default reducer;
