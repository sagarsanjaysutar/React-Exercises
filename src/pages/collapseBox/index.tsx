import React, { FC, useState } from 'react'
import styles from './collapseBox.module.css'
import { Button } from 'antd'

type CollapseBoxProp = {
    isOpen: boolean
    onOpen: () => void
    title: string
    children: React.ReactNode
}
/**
 * @brief The collapsable box has a "show" button to display the hidden content.
 * Instead of having a isOpen state unique to each component, we've passed a isOpen prop from the parent.
 * This is so that the parent has the ability controls which instance of box it wants open.
 * @ref https://react.dev/learn/sharing-state-between-components
 */
const CollapseBox: FC<CollapseBoxProp> = ({
    isOpen,
    onOpen,
    title,
    children,
}: CollapseBoxProp) => {
    return (
        <section className={styles.panel}>
            <h3>{title}</h3>
            {isOpen ? (
                <p>{children}</p>
            ) : (
                <Button onClick={onOpen}>Show</Button>
            )}
        </section>
    )
}

const Container: FC = () => {
    const [activeBoxIndex, setActiveBoxIndex] = useState(0)
    return (
        <>
            <h2>Random Information</h2>
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
        </>
    )
}

export default Container
