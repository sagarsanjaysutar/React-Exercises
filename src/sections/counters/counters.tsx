/**
 * @brief Preserving and Resetting State
 * @note To preserve the state between re-renders, the structure of UI tree needs to same between those render.
 * If the structure is different, the state gets destroyed.
 * @ref https://react.dev/learn/preserving-and-resetting-state
 */
import { Button, Checkbox } from 'antd';
import React, { FC, useState } from 'react';

type CounterProp = {
    isFancy?: boolean;
};

const Counter: FC<CounterProp> = ({ isFancy }) => {
    // This state is unique for each Counter component.
    const [counter, setCounter] = useState(0);
    return (
        <div
            className={`${
                isFancy ? 'bg-slate-300' : ''
            } text-gray-800 rounded mx-2 my-2 flex justify-center flex-col items-center border-2 border-gray-100`}
            style={{ width: '10rem', height: '8rem' }}
        >
            <h1 className=""> Counter </h1>
            <p className="font-bold"> {counter} </p>
            <Button
                onClick={() => {
                    setCounter(counter + 1);
                }}
            >
                +
            </Button>
        </div>
    );
};

const CounterContainer: FC = () => {
    const [checked, setChecked] = useState(false);
    const [fancyCounter, setFancyCounter] = useState(false);

    return (
        <div className="bg-slate-600 flex flex-col px-2 py-2">
            <>
                {/* #00. Here the state of the Counter doesn't get preserved when component gets destroyed.*/}
                <div className=" flex flex-row">
                    <Counter />
                    {!checked ? <Counter /> : <></>}
                </div>
                <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
                    Hide 2nd Counter
                </Checkbox>
            </>
            <>
                {/* #01. Here the state of the Counter gets preserved despite the component being destroyed
                 * because both components are rendered at the same "position", so from React’s perspective,
                 * it’s the same counter. */}
                <div className=" flex flex-row">
                    {fancyCounter ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
                </div>
                <Checkbox checked={fancyCounter} onChange={() => setFancyCounter(!fancyCounter)}>
                    Fancy counter
                </Checkbox>
            </>
            <>
                {/* #02. Here the state of the Counter gets preserved by default due to the components being at
                 * the same position, but the state can get reset if we add a "key" to make components unique.*/}
                <div className=" flex flex-row">
                    {fancyCounter ? (
                        <Counter isFancy={true} key="0" />
                    ) : (
                        <Counter isFancy={false} key="1" />
                    )}
                </div>
                <Checkbox checked={fancyCounter} onChange={() => setFancyCounter(!fancyCounter)}>
                    Fancy counter
                </Checkbox>
            </>
        </div>
    );
};

export default CounterContainer;
