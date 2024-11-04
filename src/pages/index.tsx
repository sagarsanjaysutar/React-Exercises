/**
 * @brief The home page.
 * @notes
 * - This page gets automatically detected by Next.js development server. * -
 */
import React, { FC } from 'react';
import Form from './form';
import MovingDot from './movingDot';
import CollapseBox from './collapseBox';
import { Layout } from 'antd';

const { Sider, Header, Footer, Content } = Layout;

const Root: FC = () => (
    <>
        <Sider> Sider</Sider>
        <Layout>
            <Header> Header </Header>
            <CollapseBox />
            {/* <MovingDot /> */}
            <Form />
            <Footer> Footer </Footer>
        </Layout>
    </>
);

export default Root;
