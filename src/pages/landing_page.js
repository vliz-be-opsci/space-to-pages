//this page will be the landing page for the app

import React from 'react';

//import the main_data.json file
import main_data from '../data/main_data.json';
import MainDataBlock from '../components/main_data_block';
import Navbar from '../components/navbar';

const LandingPage = () => {
    return (
        <>
            {Navbar(main_data)}
            {MainDataBlock(main_data)}
        </>
    );
}

export default LandingPage;