import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TOKEN_KEY } from '../services/apiService';
import PaintShop from "../pages/PaintShop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Portfolio from "../pages/Portfolio";
import NewPainting from "../pages/NewPainting";
import UpdatePainting from "../pages/UpdatePainting";
import Header from '../components/Header';
import AdminSignIn from '../components/admin/AdminSignIn';
import ContactPosts from '../components/admin/ContactPosts';
import PickedPainting from "../components/paintShop/PickedPainting";







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
                    <Route path="/:painting_Id" element={<PickedPainting />} />
                    <Route path="/admin" element={<AdminSignIn />} />

                    {localStorage[TOKEN_KEY] &&

                        <>
                            <Route path="/admin/contact" element={<ContactPosts />} />
                            <Route path="/admin/addPost" element={<NewPainting />} />
                            <Route path="/admin/updatePost/:painting_Id" element={<UpdatePainting />} />
                        </>


                    }
                </Routes>
            </BrowserRouter>
        </div>
    );


}

export default Router



