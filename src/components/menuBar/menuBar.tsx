import React, { FC, ReactNode, useEffect, useState } from 'react';
import Form from '@/sections/quiz/quiz';
import CollapseBox from '@/sections/collapseBox';
import Maps from '@/sections/maps/maps';
import { Drawer, List, Typography } from 'antd';

type MenuBarProp = {
    width: string;
    onSelect: (content: ReactNode) => void;
};

const HomeContent: FC = () => {
    return <h1>Default Home Content</h1>;
};

const MenuBar: FC<MenuBarProp> = ({ width, onSelect }) => {
    // Menu Items.
    type MenuItem = {
        key: string;
        label: string;
        onClick: (key: string) => void;
    };
    const menuItems: MenuItem[] = [
        {
            key: '0',
            label: 'Home',
            onClick: (key) => {
                onSelect(<HomeContent />);
                setActiveMenuItemKey(key);
            },
        },
        {
            key: '1',
            label: 'Collapse Box',
            onClick: (key) => {
                onSelect(<CollapseBox />);
                setActiveMenuItemKey(key);
            },
        },
        {
            key: '2',
            label: 'Quiz',
            onClick: (key) => {
                onSelect(<Form />);
                setActiveMenuItemKey(key);
            },
        },
        {
            key: '3',
            label: 'Maps',
            onClick: (key) => {
                onSelect(<Maps />);
                setActiveMenuItemKey(key);
            },
        },
    ];

    // A flag that keeps track of the active MenuItem.
    const [activeMenuItemKey, setActiveMenuItemKey] = useState(
        menuItems[0].key
    );

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
                        backgroundColor: '#d3d3d3',
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
                                menuItem.onClick(menuItem.key);
                            }}
                            key={menuItem.key}
                            className={`text-blue-950 ${
                                menuItem.key == activeMenuItemKey // Active Item is of different color.
                                    ? 'bg-yellow-200'
                                    : 'bg-yellow-500'
                            }`}
                        >
                            <span
                                className={`px-3 cursor-default ${
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
