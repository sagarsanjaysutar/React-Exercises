import React, { FC, ReactNode } from 'react';

type ContentContainerProp = {
    content: ReactNode;
};

const ContentContainer: FC<ContentContainerProp> = ({ content }) => {
    return (
        <div className="bg-gray-950 flex justify-center items-center" style={{ height: 'inherit' }}>
            {content}
        </div>
    );
};

export default ContentContainer;
