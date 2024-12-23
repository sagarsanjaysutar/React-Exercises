/**
 * @brief Sharing State Between Components
 * @ref https://react.dev/learn/sharing-state-between-components
 */
import React, { FC, useState } from 'react';
import styles from './collapseBox.module.css';
import { Button } from 'antd';
import Header from '@/components/header/header';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

type CollapseBoxProp = {
    isOpen: boolean;
    onOpen: () => void;
    title: string;
    children: React.ReactNode;
};

/**
 * @brief The collapsable box has a "show" button to display the hidden content.
 * Instead of having a isOpen state unique to each component, we've passed a isOpen prop from the parent.
 * This is so that the parent has the ability controls which instance of box it wants open.
 */
const CollapseBox: FC<CollapseBoxProp> = ({ isOpen, onOpen, title, children }: CollapseBoxProp) => {
    return (
        <section className="my-5 px-5 py-5 rounded-lg bg-slate-800 w-1/2">
            <div className="flex flex-grow justify-between">
                {' '}
                <h3 className="text-slate-200 text-xl">{title}</h3>
                <Button
                    className="text-slate-200"
                    onClick={onOpen}
                    type="text"
                    icon={isOpen ? <UpOutlined /> : <DownOutlined />}
                />
            </div>
            {isOpen ? <p className="text-slate-200 text-base">{children}</p> : ''}
        </section>
    );
};

const CollapseBoxContainer: FC = () => {
    const [activeBoxIndex, setActiveBoxIndex] = useState(1);
    return (
        <div className="">
            <Header>Sharing State Between Components</Header>
            <div className="text-lg text-slate-200">
                At a time, only 1 box will stay open as it is controlled by a common state.
            </div>
            <CollapseBox
                title="Section Zero"
                isOpen={activeBoxIndex == 0}
                onOpen={() => {
                    activeBoxIndex === 0 ? setActiveBoxIndex(1) : setActiveBoxIndex(0);
                }}
            >
                When the disabled button is transparent, users can see some semblance of the button
                in its enabled state. Although the button is faded out, some color still bleeds
                through for recognition. As the disabled button transitions to an enabled state, its
                new appearance is what they expect.
            </CollapseBox>
            <CollapseBox
                title="Section One"
                isOpen={activeBoxIndex == 1}
                onOpen={() => {
                    activeBoxIndex === 1 ? setActiveBoxIndex(0) : setActiveBoxIndex(1);
                }}
            >
                A transparent button ... blends into the background more, while a gray one stands
                out in the foreground (unless the background is gray). Foreground elements are more
                noticeable, which means users are more likely to click a gray disabled button. When
                they do, they’ll wonder why it’s not doing anything.
            </CollapseBox>
        </div>
    );
};

export default CollapseBoxContainer;
