/**
 * @brief The home page.
 * @notes
 * - This page gets automatically detected by Next.js development server. * -
 */
import React, { FC } from 'react'
import Form from './form'
import MovingDot from './movingDot'
import CollapseBox from './collapseBox'

const Root: FC = () => (
    <>
        <CollapseBox />
        {/* <MovingDot /> */}
        <Form />
    </>
)

export default Root
