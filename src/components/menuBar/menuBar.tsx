import React, { FC, ReactNode, useEffect, useState } from 'react';
import Form from '@/sections/form/form';
import CollapseBox from '@/sections/collapseBox';
import { headers } from 'next/headers';
import { Drawer, List, Typography } from 'antd';

type MenuBarProp = {
    width: string;
    onSelect: (content: ReactNode) => void;
    onTitlePressed: (pressed: boolean) => void;
};

const MenuBar: FC<MenuBarProp> = ({ width, onSelect, onTitlePressed }) => {
    type MenuItem = {
        key: string;
        label: string;
        onClick?: () => void;
    };

    const menuItems: MenuItem[] = [
        {
            key: '1',
            label: 'Collapse Box',
            onClick: () => onSelect(<CollapseBox />),
        },
        {
            key: '2',
            label: 'Form',
            onClick: () => onSelect(<Form />),
        },
    ];
    const [drawerOpen, setDrawerOpen] = useState(true);

    // Only set drawer open after mount (client-side).
    // This is done because NextJS gives the following warning:
    // Warning: Drawer with 'open' in SSR is not work since no place to createPortal. Please move to 'useEffect' instead
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
                    header={
                        <h1
                            className="px-3 font-bold"
                            onClick={() => onTitlePressed(true)}
                        >
                            Home
                        </h1>
                    }
                    dataSource={menuItems}
                    renderItem={(menuItem) => (
                        <List.Item
                            onClick={menuItem.onClick}
                            key={menuItem.key}
                            className="text-blue-950 bg-yellow-200"
                        >
                            <span className="px-3">{menuItem.label}</span>
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
};

export default MenuBar;
