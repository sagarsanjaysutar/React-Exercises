/**
 * @brief Removing Effect Dependencies
 * @note All the following links talk about how to use Effects properly. 
 *      ChatBox component showcases a small bit of it.
 * @ref @https://react.dev/learn/lifecycle-of-reactive-effects
 * @ref https://react.dev/learn/lifecycle-of-reactive-effects
 * @ref https://react.dev/learn/removing-effect-dependencies
 */
import Header from '@/components/header/header';
import React, { FC, useState } from 'react';
import ChatBox from './ChatBox';
import { ConfigProvider, Tabs, TabsProps } from 'antd';

const channelNames = ['General', 'Travel', 'Music'];

const ChatContainer: FC = () => {
    const channelList: TabsProps['items'] = channelNames.map((channelName, idx) => ({
        key: idx.toString(),
        label: <div>{channelName}</div>,
        children: <ChatBox key={idx} channelId={idx.toString()} channelName={channelName} />,
    }));

    const [activeChannelId, setActiveChannelId] = useState(channelList?.at(0)?.['key']);

    return (
        <div className="flex flex-col space-y-5">
            <Header>Removing Effect Dependencies</Header>
            <div className="text-2xl text-slate-100">Chat Room</div>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            inkBarColor: '#f8fafc',
                            itemColor: '#f8fafc',
                            itemSelectedColor: '#f8fafc',
                            itemHoverColor: '#475569',
                            itemActiveColor: '#f8fafc',
                        },
                    },
                }}
            >
                <Tabs
                    items={channelList}
                    activeKey={activeChannelId}
                    onTabClick={(channelId) => setActiveChannelId(channelId)}
                    tabPosition="left"
                    className="border rounded border-slate-600 p-2 bg-slate-800"
                    tabBarStyle={{ backgroundColor: '' }}
                    renderTabBar={(props, DefaultTabBar) => <DefaultTabBar {...props} />}
                    destroyInactiveTabPane={true}
                />
            </ConfigProvider>
        </div>
    );
};

export default ChatContainer;
