import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Header from "../components/Header";
import Portfolio from "../pages/Portfolio";



function Router() {
    return (
        <BrowserRouter>
            <div className='lg:my-20 lg:mx-24 lg:border lg:border-gray-300'>
                <Header />
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />

                </Routes>
            </div>


        </BrowserRouter>
    )
}

export default Router