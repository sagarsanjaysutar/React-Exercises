/**
 * @brief The home page.
 */
import React, { FC, useState, useEffect } from 'react';
import Header from '@/components/header/header';
import { LinkOutlined } from '@ant-design/icons';
import { Card } from 'antd';

type MetaDataType = {
    url: string;
    title: string;
    description: string;
    imageUrl: string;
    loaded: boolean;
};

const fetchUrlMetaData = async (url: string) => {
    const response = await fetch(url, { method: 'GET', mode: 'cors' });
    const htmlText = await response.text();

    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlText, 'text/html');
    const metaTags = doc.getElementsByTagName('meta');

    const metaData: MetaDataType = {
        url: url,
        title: '',
        description: '',
        imageUrl: '',
        loaded: false,
    };

    for (let idx = 0; idx <= metaTags.length; idx++) {
        if (metaTags[idx]?.getAttribute('property') == 'og:title') {
            metaData.description = metaTags[idx].getAttribute('content') || '';
            metaData.loaded = true;
        } else if (metaTags[idx]?.getAttribute('property') == 'og:description') {
            metaData.title = metaTags[idx].getAttribute('content') || '';
            metaData.loaded = true;
        } else if (metaTags[idx]?.getAttribute('property') == 'og:image') {
            metaData.imageUrl = metaTags[idx].getAttribute('content') || '';
            metaData.loaded = true;
        } else if (metaTags[idx]?.getAttribute('property') == 'og:url') {
            metaData.url = metaTags[idx].getAttribute('content') || '';
            metaData.loaded = true;
        }
    }

    return metaData;
};

const initialMetaData: MetaDataType = {
    url: 'https://react.dev/learn',
    title: 'Card title',
    description: 'This is the description',
    imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    loaded: false,
};

const Home: FC = () => {
    const [metaData, setMetaData] = useState<MetaDataType>(initialMetaData);
    useEffect(() => {
        fetchUrlMetaData('https://react.dev/learn').then((res) => setMetaData(res));
    }, []);

    return (
        <div className="flex flex-col space-y-3">
            <Header>Learn React</Header>
            <p className="text-xl text-slate-200">React's Official Tutorials</p>
            <div className="flex items-center">
                <div
                    className="h-full w-1 bg-gray-400 mr-4 rounded-lg"
                    style={{ height: '24vh' }}
                ></div>
                <a href={metaData.url} target="_blank" rel="noreferrer">
                    <Card
                        hoverable
                        loading={!metaData.loaded}
                        style={{ width: '50vw', height: '20vh' }}
                        styles={{ body: { padding: '0' } }}
                        className="overflow-hidden border-0 bg-slate-800 hover:bg-opacity-50"
                    >
                        <div className="flex">
                            <img
                                alt="example"
                                className="object-cover rounded"
                                src={metaData?.imageUrl}
                                style={{ height: '20vh', width: 'auto' }}
                            />
                            <div
                                className="flex flex-col w-full p-3 border rounded-r-lg border-slate-700"
                                style={{ borderWidth: '0.1px', borderLeft: '0px' }}
                            >
                                <p className="text-xl text-slate-200">{metaData?.title}</p>
                                <p className="text-base text-slate-400">
                                    {metaData?.description}{' '}
                                    <a
                                        href={metaData.url}
                                        className="text-sm text-blue-400"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <LinkOutlined />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Card>
                </a>
            </div>
        </div>
    );
};

export default Home;
