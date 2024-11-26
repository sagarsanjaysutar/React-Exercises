/**
 * @brief The home page.
 */
import React, { FC, ReactNode, useState } from 'react';

import { Layout, Tabs, TabsProps } from 'antd';

import MenuBar from '@/components/menuBar/menuBar';
import ContentContainer from '@/components/content/content';
import validators from '@/sections/maps/coordinateValidators';

const { Sider, Header, Footer, Content } = Layout;

const HomeContent: FC = () => {
    return <h1>Default Home Content</h1>;
};

const Home: FC = () => {
    // Default content is Home.
    const [content, setContent] = useState<ReactNode>(<HomeContent />);
    const [menuBarWidth, setMenuBarWidth] = useState('12vw');

    return (
        <Layout>
            <Sider width={menuBarWidth}>
                <MenuBar width={menuBarWidth} onSelect={(content) => setContent(content)} />
            </Sider>
            <Content style={{ height: '100vh' }}>
                <ContentContainer content={content} />
            </Content>
        </Layout>
    );
};

export default Home;
