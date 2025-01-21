import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TOKEN_KEY } from '../services/apiService';
import PaintShop from "../pages/PaintShop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Portfolio from "../pages/Portfolio";
import Header from '../components/Header';
import AdminSignIn from '../components/admin/AdminSignIn';
import ContactPosts from '../components/admin/ContactPosts';
import AdminPaintShop from '../components/admin/AdminPaintShop';
import AdminPortfolio from '../components/admin/AdminPortfolio';






function Router() {

    return (
        <div className='lg:my-20 lg:mx-24 lg:border lg:border-gray-300'>

            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<PaintShop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/admin" element={<AdminSignIn />} />

                    {localStorage[TOKEN_KEY] &&
                        <>
                            <Route path="/admin/contacts" element={<ContactPosts />} />
                            <Route path="/admin/paintShop" element={<AdminPaintShop />} />
                            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
                        </>
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );


}

export default Router



