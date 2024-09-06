'use client';
import React, { useEffect, useState, useRef } from 'react';

const CenterVideo = () => {
    const [videoSrc, setVideoSrc] = useState('/hero_web.mp4');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const updateVideoSrc = () => {
            if (window.innerWidth < 1024) {
                setVideoSrc('/hero_mobile.mp4');
            } else {
                setVideoSrc('/hero_web.mp4');
            }
        };

        updateVideoSrc();

        window.addEventListener('resize', updateVideoSrc);

        return () => window.removeEventListener('resize', updateVideoSrc);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [videoSrc]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <video
                ref={videoRef}
                width="100%"
                height="auto"
                autoPlay
                muted
                loop
                playsInline
                className="rounded-xl"
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
};

export default CenterVideo;
