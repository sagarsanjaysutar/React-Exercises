import { Button } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Map, { ViewState } from 'react-map-gl';
import Header from '@/components/header/header';

const Maps: FC = () => {
    // Default value for the initial view state.
    const initialViewState = {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 158.75,
        pitch: 50,
        padding: {
            top: 87.07,
            bottom: 19.42,
            left: 33.07,
            right: 2.88,
        },
    };
    const [viewState, setViewState] = useState<ViewState>(initialViewState);

    const handleSubmit = () => {
        setTimeout(() => {
            setViewState({
                ...viewState,
                latitude: 789,
            });
        }, 1500);
    };

    return (
        <div className="">
            <Header>Mapbox-GL with Error Boundary</Header>
            <Button onClick={handleSubmit} className="my-5" type="primary" danger>
                Search for an Invalid Coordinate
            </Button>
            <ErrorBoundary
                fallback={<p className="text-lg text-slate-200">Something went wrong</p>}
            >
                <Map
                    mapboxAccessToken="pk.eyJ1IjoiYWphd25lIiwiYSI6ImNsZHl3bGYzMDBuejMzbnByaXp1dDhiMmoifQ.x2E-l7JcqBGQBzgwCLlHAA"
                    {...viewState}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    style={{ width: '50vw', height: '50vh' }}
                    onResize={(e) => {
                        console.log('onResize occurred');
                        console.log(e);
                    }}
                    onLoad={(e) => {
                        console.log('onLoad occurred');
                        console.log(e);
                    }}
                    onRender={(e) => {
                        console.log('onRender occurred');
                        // console.log(e);
                    }}
                    onIdle={(e) => {
                        console.log('onIdle occurred');
                        console.log(e);
                    }}
                    onRemove={(e) => {
                        console.log('onRemove occurred');
                        console.log(e);
                        console.log(viewState);
                    }}
                    onError={(e) => {
                        console.log('onError occurred');
                        console.log(e);
                    }}
                    onData={(e) => {
                        console.log('onData occurred');
                        // console.log(e);
                    }}
                    onSourceData={(e) => {
                        console.log('onSourceData occurred');
                        // console.log(e);
                    }}
                />
            </ErrorBoundary>
        </div>
    );
};

export default Maps;
