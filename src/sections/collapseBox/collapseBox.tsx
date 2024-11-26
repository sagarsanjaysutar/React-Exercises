/**
 * @brief Sharing State Between Components
 * @ref https://react.dev/learn/sharing-state-between-components
 */
import React, { FC, useState } from 'react';
import styles from './collapseBox.module.css';
import { Button } from 'antd';
import { ScriptProps } from 'next/script';

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
        <section className={styles['panel']}>
            <h3>{title}</h3>
            {isOpen ? <p>{children}</p> : <Button onClick={onOpen}>Show</Button>}
        </section>
    );
};

const Container: FC = () => {
    const [activeBoxIndex, setActiveBoxIndex] = useState(1);
    return (
        <div className="bg-slate-500 p-5">
            <h2 className="text-lg">Random Information</h2>
            <CollapseBox
                title="Section Zero"
                isOpen={activeBoxIndex == 0}
                onOpen={() => setActiveBoxIndex(0)}
            >
                Random Information about section zero.
            </CollapseBox>
            <CollapseBox
                title="Section One"
                isOpen={activeBoxIndex == 1}
                onOpen={() => setActiveBoxIndex(1)}
            >
                Random Information about section One.
            </CollapseBox>
        </div>
    );
};

export default Container;
