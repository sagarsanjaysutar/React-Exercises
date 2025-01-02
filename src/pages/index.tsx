/**
 * @brief The root page that automatically gets detected by Next.js development server.
 * @note A required file for Next.js.
 * @refer https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes
 */
import Home from '@/sections/Home/home';
import React, { FC, ReactNode, useState } from 'react';

// Antd layout design is followed here: https://ant.design/components/layout#examples
import { Layout } from 'antd';

import MenuBar from '@/components/menuBar/menuBar';
import ContentContainer from '@/components/content/content';

const { Sider, Content } = Layout;

const Root: FC = () => {
    // Default content is Home.
    const [content, setContent] = useState<ReactNode>(<Home />);
    const [menuBarWidth, setMenuBarWidth] = useState('20vw');

    return (
        <Layout>
            <Sider width={menuBarWidth}>
                <MenuBar width={menuBarWidth} onSelect={(content) => setContent(content)} />
            </Sider>
            <Content>
                <ContentContainer content={content} />
            </Content>
        </Layout>
    );
};

export default Root;
