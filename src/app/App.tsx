import React from 'react';
import './App.css';
import {Pages} from '../features/pages/Pages';
import {HashRouter} from 'react-router-dom';

export const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Pages/>
            </HashRouter>
        </div>
    );
}

