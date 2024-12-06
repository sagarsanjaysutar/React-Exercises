import React, { FC, useEffect, useState } from 'react';
import { Drawer, List } from 'antd';

import Form from '@/sections/quiz/quiz';
import CollapseBox from '@/sections/collapseBox/collapseBox';
import Maps from '@/sections/maps/maps';
import CounterContainer from '@/sections/counters/counters';
import TaskContainer from '@/sections/tasks/taskContainer';
import HeaderContainer from '@/sections/headerContainer/headerContainer';

const HomeContent: FC = () => {
    return <h1>Default Home Content</h1>;
};

type MenuBarProp = {
    width: string;
    onSelect: (component: React.ReactNode) => void;
};

const MenuBar: FC<MenuBarProp> = ({ width, onSelect }) => {
    // Menu Items.
    type MenuItem = {
        key: string;
        label: string;
        component: React.ReactNode;
    };

    const menuItems: MenuItem[] = [
        {
            key: '0',
            label: 'Home',
            component: <HomeContent />,
        },
        {
            key: '1',
            label: 'Collapse Box',
            component: <CollapseBox />,
        },
        {
            key: '2',
            label: 'Quiz',
            component: <Form />,
        },
        {
            key: '3',
            label: 'Maps',
            component: <Maps />,
        },
        {
            key: '4',
            label: 'Counter',
            component: <CounterContainer />,
        },
        {
            key: '5',
            label: 'Task List',
            component: <TaskContainer />,
        },
        {
            key: '6',
            label: 'Headers',
            component: <HeaderContainer />,
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
                                onSelect(menuItem.component);
                                setActiveMenuItemKey(menuItem.key);
                            }}
                            key={menuItem.key}
                            className={` ${
                                menuItem.key == activeMenuItemKey // Active Item is of different color.
                                    ? 'bg-gray-600'
                                    : 'bg-gray-800'
                            }`}
                        >
                            <span
                                className={`px-3 cursor-default text-white ${
                                    menuItem.key == '0' ? 'font-bold' : '' // Home Item is bold
                                }`}
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
