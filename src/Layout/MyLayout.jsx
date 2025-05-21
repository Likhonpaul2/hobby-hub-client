import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const MyLayout = () => {
    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                
            </footer>
        </div>
    );
};

export default MyLayout;