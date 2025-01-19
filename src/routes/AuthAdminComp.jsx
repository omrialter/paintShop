import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL, doApiGet, TOKEN_KEY } from "../services/apiService";
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

const AuthAdminComp = () => {
    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        try {
            const url = URL + "/users/checkToken";
            const data = await doApiGet(url);
            if (data.role != "admin") {
                localStorage.removeItem(TOKEN_KEY);
                nav("/admin");
            }
        } catch (error) {
            toast.error("There is a problem, try login again ");
            nav("/admin");
            console.log(error);
        }
    };

    return (
        <div className='lg:my-20 lg:mx-24 lg:border lg:border-gray-300'>
            <AdminHeader />
            <Outlet />
        </div>
    )

};

export default AuthAdminComp;
