/**
 * @brief Keeping Components Pure
 * @ref https://react.dev/learn/keeping-components-pure
 */
import Header from '@/components/header/header';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';

/**
 * # Problem: The GuestCounter is not "Pure" as it changes variables outside it's scope.
 *          An unpure component gives unexpected results.
 * # Solution: Pass the counter variables as a prop or make it a state.
 */
let counter = 0;

const GuestCounter: FC = () => {
    counter = counter + 1;

    return (
        <div className="flex py-3">
            <h1 className="text-xl text-slate-100 pr-5">Guest Count: #{counter}</h1>
        </div>
    );
};

const GuestContainer: FC = () => {
    return (
        <div className="flex flex-col">
            <Header>Keeping Components Pure</Header>
            <div className="flex flex-col w-fit">
                <Button
                    block
                    icon={<PlusOutlined />}
                    onClick={() => {
                        // After incrementing the updated value is shown in the alert but the UI still shows old values.
                        counter++;
                        alert('Counter Value: ' + counter);
                    }}
                >
                    Increment
                </Button>
                <GuestCounter />
                <GuestCounter />
                <GuestCounter />
            </div>
        </div>
    );
};

export default GuestContainer;
