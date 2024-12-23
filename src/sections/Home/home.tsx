/**
 * @brief The home page.
 */
import React, { FC } from 'react';
import Header from '@/components/header/header';

const Home: FC = () => {
    return (
        <div>
            <Header>Learn React</Header>
            <p className="text-xl text-slate-200">React's Official Tutorials</p>
        </div>
    );
};

export default Home;
