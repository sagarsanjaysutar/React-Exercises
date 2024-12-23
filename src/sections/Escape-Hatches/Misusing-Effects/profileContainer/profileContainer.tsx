/**
 * @brief Resetting all state when a prop changes
 * @ref https://react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes
 */
import React, { FC, useEffect, useState } from 'react';
import profileList from './profileData.json';
import Header from '@/components/header/header';
import { Card, Input, Radio } from 'antd';

const { Meta } = Card;

/**
 * UI: The ProfileContainer displays a single ProfileCard with next/previous buttons.
 *     The ProfileCard also contains a input box.
 *
 * Problem:     Changing the ProfileCard's data using next/previous button doesn't reset the Input box.
 * Explanation: This is because next/previous ProfileCards are rendered at the same place in the UI tree.
 *              From React’s perspective, it’s the same Card which is why it doesn't reset the input box
 *              or any States that the card might hold.
 * Solution: Give key to the ProfileCard to make it unique in React's perspective.
 */

type ProfileCardProp = {
    profile: any;
};
const ProfileCard: FC<ProfileCardProp> = ({ profile }) => {
    const [comment, setComment] = useState('');

    useEffect(() => {
        console.log('Use effect called.');
        setComment('');
    }, [profile]);

    return (
        <Card
            hoverable
            style={{ width: '15rem' }}
            cover={
                <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
            }
        >
            <Meta title={profile.first + ' ' + profile.last} description={profile.address} />
            <Input className="mt-3" placeholder="Leave an anonymous message..." value={comment} />
        </Card>
    );
};

const ProfileContainer: FC = () => {
    const [profileIdx, setProfileIdx] = useState(0);
    const profile = profileList.at(profileIdx);
    return (
        <div>
            <Header level={4}>Resetting all state when a prop changes</Header>
            <div className="flex flex-col items-center space-y-4 w-fit">
                <ProfileCard profile={profile} key={profileIdx} />
                <Radio.Group>
                    <Radio.Button
                        value="large"
                        onClick={() => {
                            if (profileIdx > 0) setProfileIdx(profileIdx - 1);
                        }}
                    >
                        Previous
                    </Radio.Button>
                    <Radio.Button
                        value="large"
                        onClick={() => {
                            if (profileIdx < profileList.length) setProfileIdx(profileIdx + 1);
                        }}
                    >
                        Next
                    </Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
};

export default ProfileContainer;
