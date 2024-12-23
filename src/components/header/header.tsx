import React, { FC, useContext } from 'react';
import LevelContext from '../../sections/Managing-State/nestedHeader/levelContext';

type HeaderProp = {
    children: React.ReactNode;
    level?: number;
};

function getSizedHeading(level: number) {
    switch (level) {
        case 1:
            return 'text-5xl';
        case 2:
            return 'text-4xl';
        case 3:
            return 'text-3xl';
        case 4:
            return 'text-2xl';
        case 5:
            return 'text-1xl';
        default:
            return 'text-xl';
    }
}

const Header: FC<HeaderProp> = ({ children, level: levelProp }) => {
    // The level is dynamically derived from the closest Context Provider in the component tree.
    const level = levelProp ? levelProp : useContext(LevelContext);
    return (
        <h1 className={`${getSizedHeading(level)} text-slate-400 pb-5 pt-10`}>
            {children}
        </h1>
    );
};

export default Header;
