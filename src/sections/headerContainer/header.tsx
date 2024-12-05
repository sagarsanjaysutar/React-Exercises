import React, { FC, useContext } from 'react';
import LevelContext from './levelContext';

type HeaderProp = {
    children: React.ReactNode;
};

const Header: FC<HeaderProp> = ({ children }) => {
    // The level is dynamically derived from the closest Context Provider in the component tree.
    const level = useContext(LevelContext);
    switch (level) {
        case 1:
            return <h1 className="text-5xl text-gray-50">{children}</h1>;
        case 2:
            return <h2 className="text-4xl text-gray-50">{children}</h2>;
        case 3:
            return <h3 className="text-3xl text-gray-50">{children}</h3>;
        case 4:
            return <h4 className="text-2xl text-gray-50">{children}</h4>;
        default:
            return <h5 className="text-xl text-gray-50">E {children}</h5>;
    }
};

export default Header;
