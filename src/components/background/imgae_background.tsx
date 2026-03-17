'use client';

import React, {useRef, useState} from 'react';

const DEFAULT_BACKGROUND_IMAGE = "/default_background.jpeg"

interface props {
    children?: React.ReactNode;
    _opacity?: number;
    className?: string;
}

function ImageBackground({
                             children,
                             _opacity = 0.2,
                             className = '',
                         }: props) {

    const backgroundStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: DEFAULT_BACKGROUND_IMAGE ? `url(${DEFAULT_BACKGROUND_IMAGE})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: _opacity,
        zIndex: 0,
        pointerEvents: 'none'
    };

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}>

            <div style={backgroundStyle}/>

            {children}
        </div>
    );
};

export default ImageBackground;