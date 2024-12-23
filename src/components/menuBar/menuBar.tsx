import React, { FC, useEffect, useState } from 'react';
import { Drawer, List } from 'antd';

import Form from '@/sections/Managing-State/quiz/quiz';
import CollapseBox from '@/sections/Managing-State/collapseBox/collapseBox';
import Maps from '@/sections/Miscellaneous/maps/maps';
import CounterContainer from '@/sections/Managing-State/counters/counters';
import TaskContainer from '@/sections/Managing-State/tasks/taskContainer';
import HeaderContainer from '@/sections/Managing-State/nestedHeader/nestedHeaderContainer';
import VideoContainer from '@/sections/Escape-Hatches/video/videoContainer';
import Home from '@/sections/Home/home';
import EffectsContainer from '@/sections/Escape-Hatches/Misusing-Effects';

type MenuBarProp = {
    width: string;
    onSelect: (component: React.ReactNode) => void;
};

const MenuBar: FC<MenuBarProp> = ({ width, onSelect }) => {
    // Menu Items.
    type MenuItem = {
        key: string;
        label: string;
        component?: React.ReactNode;
        header?: boolean;
    };

    const menuItems: MenuItem[] = [
        {
            key: '0',
            label: 'Home',
            component: <Home />,
        },
        {
            key: '1',
            label: 'Managing State',
            header: true,
        },
        {
            key: '2',
            label: 'Reacting to Input with State & Choosing the State Structure.',
            component: <Form />,
        },
        {
            key: '3',
            label: 'Sharing State Between Components',
            component: <CollapseBox />,
        },
        {
            key: '4',
            label: 'Preserving and Resetting State',
            component: <CounterContainer />,
        },

        {
            key: '5',
            label: 'Extracting State Logic into a Reducer & Scaling Up with Reducer and Context',
            component: <TaskContainer />,
        },
        {
            key: '6',
            label: 'Passing Data Deeply with Context',
            component: <HeaderContainer />,
        },
        {
            key: '7',
            label: 'Escape Hatches',
            header: true,
        },
        {
            key: '8',
            label: 'Synchronizing with Effects',
            component: <VideoContainer />,
        },
        {
            key: '9',
            label: 'You might not need Effects',
            component: <EffectsContainer />,
        },
        {
            key: '10',
            label: 'Miscellaneous',
            header: true,
        },
        {
            key: '11',
            label: 'Maps',
            component: <Maps />,
        },
    ];

    // A flag that keeps track of the active MenuItem.
    const [activeMenuItemKey, setActiveMenuItemKey] = useState(menuItems[0].key);

    // Only set drawer open after mount (client-side).
    // This is done because NextJS gives the following warning:
    // Warning: Drawer with 'open' in SSR is not work since no place to createPortal. Please move to 'useEffect' instead
    const [drawerOpen, setDrawerOpen] = useState(true);
    useEffect(() => {
        setDrawerOpen(true);
    }, []);

    return (
        <div>
            <Drawer
                destroyOnClose
                autoFocus={false}
                open={drawerOpen}
                placement="left"
                mask={false}
                maskClosable={false}
                getContainer={false}
                styles={{
                    // Wrapper of menu body
                    wrapper: {
                        width: width,
                        boxShadow: 'none',
                        transition: 'none',
                        transform: 'none',
                    },
                    // Menu body
                    body: {
                        backgroundColor: '#111827 ',
                        padding: '0px',
                    },
                    header: { display: 'none' },
                }}
            >
                <List
                    dataSource={menuItems}
                    renderItem={(menuItem) => (
                        <List.Item
                            onClick={() => {
                                if (!menuItem.header) {
                                    onSelect(menuItem.component);
                                    setActiveMenuItemKey(menuItem.key);
                                }
                            }}
                            key={menuItem.key}
                            className={` 
                                ${
                                    menuItem.key == activeMenuItemKey // Active Item is of different color.
                                        ? 'bg-gray-800 rounded-r-xl'
                                        : ''
                                }
                            `}
                        >
                            <span
                                className={`px-3 cursor-default text-white 
                                    ${
                                        menuItem.header
                                            ? 'font-bold  text-slate-400 text-base'
                                            : 'font-normal text-slate-100 pl-5'
                                    }
                                `}
                            >
                                {menuItem.label}
                            </span>
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
};

export default MenuBar;
