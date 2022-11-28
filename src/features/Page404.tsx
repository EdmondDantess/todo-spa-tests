import React from 'react';
import {useNavigate} from 'react-router-dom';

export const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 'bold',
            backgroundColor: 'slateblue',
            height: '100vh',
            width: '100vw',
            fontSize: '55px',
            color: 'whitesmoke',
            textShadow: '1px 1px 10px red',
            textAlign: 'center'
        }}
        >
            Wrong route!
            <button onClick={() => navigate(-1)}
                 style={
                     {
                         backgroundColor: 'saddlebrown',
                         borderBottom: '6px solid white',
                         width: '325px',
                         fontWeight: 'lighter',
                         margin: 'auto',
                         marginTop: '100px',
                         cursor: 'pointer',
                         fontSize: '44px',
                         color: 'whitesmoke',
                     }}
            >Go to previous page </button>

        </div>
    );
};
