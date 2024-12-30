/**
 * @brief Passing Data Deeply with Context
 * @ref https://react.dev/learn/passing-data-deeply-with-context
 */
import React, { FC } from 'react';
import Header from '@/components/header/header';
import Section from './Section';

const HeaderContainer: FC = () => {
    // #00. Here we defining & passing the level prop to each Section.
    // #01. Section further passes this to a Context Provider. Refer Section code.
    // #02. All the children of Section will have access to the value provided by the Context Provider.
    return (
        <div className="flex flex-col">
            <Header>Passing Data Deeply with Context</Header>
            <Section level={2}>
                <Header>Title</Header>
                <Section level={3}>
                    <Header>Header</Header>
                    <Header>Header</Header>
                    <Header>Header</Header>
                    <Section level={4}>
                        <Header>Sub-Header</Header>
                        <Header>Sub-Header</Header>
                        <Header>Sub-Header</Header>
                        <Section level={5}>
                            <Header>Sub-sub-Header</Header>
                            <Header>Sub-sub-Header</Header>
                            <Header>Sub-sub-Header</Header>
                        </Section>
                    </Section>
                </Section>
            </Section>
        </div>
    );
};

export default HeaderContainer;
