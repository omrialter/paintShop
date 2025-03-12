import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from '../components/Header';
import PaintShop from "../pages/PaintShop";
import About from "../pages/About";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import Contact from "../pages/Contact";
import CompleteOrder from "../pages/CompleteOrder";
import Portfolio from "../pages/Portfolio";
import NewPainting from "../admin/NewPainting";
import UpdatePainting from "../admin/UpdatePainting";
import AdminSignIn from '../admin/AdminSignIn';
import ContactPosts from '../admin/ContactPosts';
import PurchasesPosts from '../admin/PurchasePosts';
import PickedPainting from "../components/paintShop/PickedPainting";
import { TOKEN_KEY } from '../services/apiService';

function Layout() {
    const location = useLocation();
    const hideHeaderRoutes = ['/checkout'];

    return (
        <div className={hideHeaderRoutes.includes(location.pathname) ? "" : 'lg:my-20 lg:mx-24 lg:border lg:border-gray-300'}>
            {!hideHeaderRoutes.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/" element={<PaintShop />} />
                <Route path="/about" element={<About />} />
                <Route path="/completeOrder" element={<CompleteOrder />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/picked/:painting_Id" element={<PickedPainting />} />
                <Route path="/admin" element={<AdminSignIn />} />
                {localStorage[TOKEN_KEY] && <>
                    <Route path="/admin/contact" element={<ContactPosts />} />
                    <Route path="/admin/purchases" element={<PurchasesPosts />} />
                    <Route path="/admin/addPost" element={<NewPainting />} />
                    <Route path="/admin/updatePost/:painting_Id" element={<UpdatePainting />} />
                </>}
            </Routes>
        </div>
    );
}

function Router() {
    return (
        <>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </>
    );
}

export default Router;
