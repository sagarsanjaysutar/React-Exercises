import React, { FC, ReactNode } from 'react';

type ContentContainerProp = {
    content: ReactNode;
};

const ContentContainer: FC<ContentContainerProp> = ({ content }) => {
    return (
        <div
            className="flex flex-grow h-screen overflow-y-auto pl-10"
            style={{ backgroundColor: '#111827 ' }}
        >
            {content}
        </div>
    );
};

export default ContentContainer;
