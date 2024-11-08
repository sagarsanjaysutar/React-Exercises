import React, {FC} from "react";

function typeVsInterface(){   
    // Both are inherently the same with 1 minor difference.
    // Changing/extending interface is possible.
    interface Point { x: number; y: number; }
    interface Point { z?: number; }

    // Changing/extending type is not possible.
    type Coordinates = { latitude: number; longitude: number };
    // type Coordinates = { altitude?: number; }
}

function typeAssertion(){
    // If we know early hand that root is going to be an Anchor element, we can assert it.
    // Type assertions are a way to tell the compiler “trust me, I know what I’m doing.”
    const randomComponent1 = document.getElementById("root") as HTMLAnchorElement;    
}

function constType(){
    // Notice how the despite being const, request variable is still mutable.
    const request = { method: "GET" };
    request.method = "POST";

    // Solution
    const requestConst = { method: "GET" } as const;
    // requestConst.method = "POST";    // This gives an error
}

function unionType(){
    const randomVariable: string | number = true ? "sagar" : 3;
}

function literalType(){
    // Literal Datatype i.e. assignable values to the variable. 
    var method: "GET" | "POST" |  "UPDATE";
    method = "POST";
    // method = "PUT";  // Error
}

function nullAndUndefinedType(){
    // null and undefined : Primitive values provided by JS. absent & uninitialised.
}

function neverType(){    
    // A void function returns undefined.
    const a = () => {};
    console.log(a());   

    // A never function doesn't have a normal completion, which means it throws an error or never finishes running at all.
    const b = () : never => { throw new Error("Random Error")}

    // Ref: https://stackoverflow.com/a/57472750/22622355
}

function optionalType(){
    const point : { x : number; y: number; z?: number } = { x: 5, y: 6};
    // z is an optional parameter and can be undefined. so it must be checked before accessing
    // if(point.z != undefined) console.log(point.z)
}

function nonNullOperator(){
    // Asserts that randomVariable would not be null bypassing the compile time check.
    const randomVariable = { name: "Sagar" };
    randomVariable!.name;
}

const Types: FC = () => { return <></>};

export default Types;