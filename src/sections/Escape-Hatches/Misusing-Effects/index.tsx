import React, { FC } from 'react';
import ProfileContainer from './profileContainer/profileContainer';
import Header from '@/components/header/header';

const EffectsContainer: FC = () => {
    return (
        <div>
            <Header> You Might Not Need an Effect </Header>
            <ProfileContainer />
            <div className="border-t border-slate-500 my-4"></div>
        </div>
    );
};

export default EffectsContainer;
