import React, {FC, useState} from "react";
import style from "./movingDot.module.css"

/**
 * 
 * @returns 
 */
const MovingDot: FC = () =>{

    // In this example, we've grouped related status rather than individual states.
    type PositionType = { x: number, y: number};
    const [position, setPosition] = useState<PositionType>({x: 0, y: 0});
    return (
        <>
        <h2>Moving dot</h2>
        <div 
            onPointerMove={(event) => setPosition({x: event.clientX, y: event.clientY})} 
            className={style.container}
        >
            <div 
                className={style.dot}
                style={{transform: `translate(${position.x}px, ${position.y}px)`}}
            />
        </div>
        </>
    );
}

export default MovingDot; 