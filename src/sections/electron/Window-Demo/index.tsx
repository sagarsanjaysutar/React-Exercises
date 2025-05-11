import Header from '@/components/header/header';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import NewWindow from 'react-new-window';

type WindowListType = {
    id: number;
    title: string;
    window?: Window;
    windowScreenIdx?: number;
};

const WindowDemo = () => {
    const [windowList, setWindowList] = useState<WindowListType[]>([]);

    // const checkWindowPosition = () => {};
    useEffect(() => {
        console.log('Window List changed');
        console.log(windowList);
    }, [windowList]);

    return (
        <>
            <div className="flex flex-col">
                <Header>Electron Windows</Header>
                <Header level={4}>This is demo of Electron windows.</Header>
                <div style={{ height: '20vh' }} className="flex items-center">
                    <Button
                        size="large"
                        icon={<PlusOutlined />}
                        iconPosition="end"
                        onClick={() => {
                            setWindowList([
                                ...windowList,
                                {
                                    id: windowList.length,
                                    title: 'Window ' + windowList.length,
                                },
                            ]);
                        }}
                    >
                        Create New Window{' '}
                    </Button>
                </div>
            </div>
            {windowList.map((currentlyIteratedWindow) => {
                return (
                    <NewWindow
                        title={currentlyIteratedWindow.title}
                        key={currentlyIteratedWindow.id}
                        onOpen={(newWindow: Window) => {
                            // Initialize its window object.
                            setWindowList((windowListState) =>
                                windowListState.map((windowState) =>
                                    currentlyIteratedWindow.id === windowState.id
                                        ? { ...windowState, window: newWindow } // Initializing window object.
                                        : windowState
                                )
                            );
                        }}
                    />
                );
            })}
        </>
    );
};

export default WindowDemo;
