import React, { FC, ReactNode } from 'react';

type ContentContainerProp = {
    content: ReactNode;
};

const ContentContainer: FC<ContentContainerProp> = ({ content }) => {
    return <div className="bg-amber-200 flex justify-center items-center">{content}</div>;
};

export default ContentContainer;
