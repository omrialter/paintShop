import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaintShop from "../pages/PaintShop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Portfolio from "../pages/Portfolio";
import MainLayout from './MainLayout';
import AuthAdminComp from "./AuthAdminComp";
import AdminSignIn from '../components/admin/AdminSignIn';
import ContactPosts from '../components/admin/ContactPosts';
import AdminPaintShop from '../components/admin/AdminPaintShop';
import AdminPortfolio from '../components/admin/AdminPortfolio';






function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>

                    <Route path="/" element={<PaintShop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/admin" element={<AdminSignIn />} />

                </Route>


                <Route element={<AuthAdminComp />}>
                    <Route path="/admin/contacts" element={<ContactPosts />} />
                    <Route path="/admin/paintShop" element={<AdminPaintShop />} />
                    <Route path="/admin/portfolio" element={<AdminPortfolio />} />


                </Route>







            </Routes>
        </BrowserRouter>
    );


}

export default Router



