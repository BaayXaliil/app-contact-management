import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Home from '../pages/Home';
import ViewContact from '../pages/ViewContact';

function PublicRouter({setVisible}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home showNavlink={setVisible} />} />
                <Route path='/add-contact/:id' element={<ViewContact setVisible={setVisible} />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRouter