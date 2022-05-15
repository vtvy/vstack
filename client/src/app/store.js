import userReducer from '../features/Auth/userSlice';
import postReducer from '../features/Post/postSlice';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
	user: userReducer,
	post: postReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
