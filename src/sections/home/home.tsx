/**
 * @brief The home page.
 * @notes
 */
import React, { FC, useState } from 'react';
import Form from '@/sections/form/form';
import CollapseBox from '@/sections/collapseBox';
import { Layout, Tabs, TabsProps } from 'antd';

import './home.module.css';

const { Sider, Header, Footer, Content } = Layout;

const Home: FC = () => {
    const tabs: TabsProps['items'] = [
        { label: 'Tab 1', key: '1', children: `Content x` },
        { label: 'Tab 2', key: '2', children: `Content f` },
    ];
    return (
        <>
            <Header className="text-black text-lg bg-slate-100 flex justify-center items-center">
                React Exercises
            </Header>
            <Layout>
                <Sider className={'sider bg-slate-700'}>
                    <Tabs size="large" tabPosition="left" items={tabs} />
                </Sider>
                <Content>
                    <CollapseBox />
                    <Form />
                </Content>
            </Layout>
            <Footer className="bg-slate-500"> Footer </Footer>
        </>
    );
};

export default Home;
