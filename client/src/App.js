import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import userApi from "./api/userApi";
import Header from "./components/Header";
import Container from "./components/Main";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Auth from "./features/Auth";
import { logOut, setUser } from "./features/Auth/userSlice";
import Home from "./features/Home";
import AddEditPost from "./features/Post/Pages/AddEditPost";
import Profile from "./features/Profile";
export const ModalContext = createContext();

function App() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const loginUser = async () => {
            const res = await userApi.getUser();
            if (res.data.status) {
                const action = setUser(res.data.user);
                dispatch(action);
            } else {
                const action = logOut();
                dispatch(action);
            }
        };
        loginUser();
    }, [dispatch]);

    //handleModal
    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
        setIsOpen: false,
        content: {},
    });

    return (
        <ModalContext.Provider value={setModal}>
            <div className="App flex flex-col min-h-screen h-full bg-slate-300 dark:bg-indigo-1050 scrollbar">
                {isLoggedIn && <Header />}

                {/* modal */}
                {modal.isOpen && (
                    <AddEditPost
                        setIsAddEditPost={modal.setIsOpen}
                        content={modal.content}
                    />
                )}

                <Routes>
                    <Route element={<PublicRoutes isLogged={isLoggedIn} />}>
                        <Route path="/login" element={<Auth type="login" />} />
                        <Route
                            path="/register"
                            element={<Auth type="register" />}
                        />
                    </Route>

                    <Route element={<ProtectedRoutes isLogged={isLoggedIn} />}>
                        <Route path="/" element={<Container />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile/:id" element={<Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </ModalContext.Provider>
    );
}

export default App;
