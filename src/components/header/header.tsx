import React, { FC, useContext } from 'react';
import LevelContext from '../../sections/Managing-State/nestedHeader/levelContext';

type HeaderProp = {
    children: React.ReactNode;
    level?: number;
};

function getFormattedStyle(level: number) {
    switch (level) {
        case 1:
            return 'text-5xl text-slate-200';
        case 2:
            return 'text-4xl text-slate-300';
        case 3:
            return 'text-3xl text-slate-400';
        case 4:
            return 'text-2xl text-slate-500';
        case 5:
            return 'text-1xl text-slate-600';
        default:
            return 'text-xl text-slate-50';
    }
}

const Header: FC<HeaderProp> = ({ children, level: levelProp }) => {
    // The level is dynamically derived from the closest Context Provider in the component tree.
    const level = levelProp ? levelProp : useContext(LevelContext);
    return <h1 className={`${getFormattedStyle(level)} pb-3`}>{children}</h1>;
};

export default Header;
