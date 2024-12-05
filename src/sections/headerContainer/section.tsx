import React, { FC } from 'react';
import LevelContext from './levelContext';

type SectionProp = {
    level: number;
    children: React.ReactNode;
};

const Section: FC<SectionProp> = ({ level, children }) => {
    // #00. The Context Provider provides value of "level" to all it children.
    return (
        <LevelContext.Provider value={level}>
            <div className="px-3 py-3 mx-3 my-3 border-2 border-solid border-gray-50 rounded-lg">
                {children}
            </div>
        </LevelContext.Provider>
    );
};

export default Section;
