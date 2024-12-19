/**
 * @brief Synchronizing with Effects
 * @ref https://react.dev/learn/synchronizing-with-effects
 */
import React, { FC, useEffect, useRef, useState } from 'react';

type VideoPlayerProp = {
    isPlaying: boolean;
};

const VideoPlayer: FC<VideoPlayerProp> = ({ isPlaying }) => {
    // #00. This is rendering scope.
    const videoRef = useRef(null);

    // #01. Side effect: Here the external system is the Media API, play()/pause(),
    // which is synced with React state (isPlaying).

    // This is directly written in Rendering scope. Not allowed.
    // isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause();

    // #02. Side effect is wrapped inside useEffect. This will run after rendering.
    useEffect(() => {
        isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause();
    }, [isPlaying]);

    useEffect(() => {
        console.log('Called on mount.');
        return () => {
            console.log('Called on Unmount 0');
        };
    }, []);

    useEffect(() => {
        console.log('Called on render.');
        return () => {
            console.log('Called on Unmount 1');
        };
    });

    // #03. This returns the Markup
    return (
        <video
            ref={videoRef}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
    );
};

const VideoContainer: FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div
            onKeyDown={(e) => {
                // Play/Pause the video on press of "p"
                if (e.key === 'p') setIsPlaying(!isPlaying);
            }}
        >
            <VideoPlayer isPlaying={isPlaying} />{' '}
        </div>
    );
};

export default VideoContainer;
