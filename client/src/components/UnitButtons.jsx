// src/components/UnitButtons.js

import React from 'react';
import { Link } from 'react-router-dom';

const UnitButtons = () => {
    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-xl font-bold">Select Resource Type:</h1>
            <Link className="bg-blue-500 text-white p-3 m-2 rounded">PDF Resources</Link>
            <Link  className="bg-blue-500 text-white p-3 m-2 rounded">Code Viewer</Link>
            <Link className="bg-blue-500 text-white p-3 m-2 rounded">YouTube Viewer</Link>
        </div>
    );
};

export default UnitButtons;