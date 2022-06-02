import React, { useState } from "react";
import "./style.css";

let tempArray = [];
let inputArray = [];
const Calculator = () => {
    const [doubleEqualPressedCheck, setDoubleEqualPressedCheck] = useState(0);
    const [displayArray, setDisplayArray] = useState([]);
    const operator = ["x", "/", "+", "-", "^", "%"];

    //new approach {logic}

    const operators = {
        "+": (a, b) => {
            return a + b;
        },
        "-": (a, b) => {
            return a - b;
        },
        "x": (a, b) => {
            return a * b;
        },
        "/": (a, b) => {
            return a / b;
        },
        "^": (a, b) => {
            return Math.pow(a, b);
        },
        "%": (a, b) => {
            return a % b;
        },
    };

    const getIndexOf = (operator) => {
        let indexes = [];
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] === operator) indexes.push(i);
        }
        return indexes;
    };

    const bODMASRule = (operatorSign) => {
        let indexArray = getIndexOf(operatorSign);
        console.log(inputArray + " and " + indexArray);
        let maintaining = 0;   //we are deleting 3 item and adding one means decreasing size of inputarray by 1 on one loop so maintaining index using this variable
        for (let i = 0; i < indexArray.length; i++) {
            let a = parseInt(inputArray[indexArray[i] - 1 - maintaining]);
            let b = parseInt(inputArray[indexArray[i] + 1 - maintaining]);
            console.log("a: " + a + "b: " + b + "i: " + i);
            try {
                inputArray.splice(indexArray[i]-1 - maintaining, 3, operators[`${inputArray[indexArray[i] - maintaining]}`](a, b));
            } catch (err) {
                console.log("Error: " + err);
                document.querySelector(".result").textContent = "Error !!";
            }
            maintaining += 2;
        }
        document.querySelector(".result").textContent = inputArray;
    };

    const getResult = () => {
        console.log(inputArray);
        bODMASRule("^");
        bODMASRule("x");
        bODMASRule("/");
        bODMASRule("+");
        bODMASRule("-");
    };

    const onNumberClick = (e) => {
        setDoubleEqualPressedCheck(0);
        tempArray.push(e.target.textContent);
    };

    const onOperatorClick = (e) => {
        if (e.target.textContent === "=") {
            setDoubleEqualPressedCheck(doubleEqualPressedCheck + 1);
            console.log("Equal Check: " + doubleEqualPressedCheck);
            if (doubleEqualPressedCheck >= 1) {
                console.log("equal to pressed consecutively!!");
            } else {
                tempArray.length === 0
                    ? console.log("empty temp Array")
                    : inputArray.push(tempArray.join(""));
                tempArray = [];
                getResult();
            }
        } else {
            setDoubleEqualPressedCheck(0);
            tempArray.length === 0
                ? console.log("empty temp Array")
                : inputArray.push(tempArray.join(""));
            inputArray.push(e.target.textContent);
            tempArray = [];
            console.log("checkingLastItem: " + inputArray);
            console.log("checkingLastItemTemp: " + tempArray);
        }
    };

    return (
        <div>
            <div className="display">
                <div className="userInputs">
                    {displayArray?.map((input) => {
                        return <>{input}</>;
                    })}
                </div>
                <div className="result"></div>
            </div>
            <div className="body">
                <div className="row1">
                    <button
                        className=""
                        onClick={() => {
                            tempArray = [];
                            inputArray = [];
                            setDisplayArray([]);
                            document.querySelector(".result").textContent = "0";
                        }}
                    >
                        AC
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onOperatorClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        ^
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            alert("in development!!");g
                            // inputArray.pop();
                            // console.log("hehe" + inputArray);
                            // setDisplayArray([
                            //     displayArray.slice(0,-1)
                            // ]);
                        }}
                    >
                      Del
                    </button>
                    <button
                        className="yellow"
                        onClick={(e) => {
                            onOperatorClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        /
                    </button>
                </div>
                <div className="row2">
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        7
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        8
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        9
                    </button>
                    <button
                        className="yellow"
                        onClick={(e) => {
                            onOperatorClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        x
                    </button>
                </div>
                <div className="row3">
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        4
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        5
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        6
                    </button>
                    <button
                        className="yellow"
                        onClick={(e) => {
                            onOperatorClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        -
                    </button>
                </div>
                <div className="row4">
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        1
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        2
                    </button>
                    <button
                        className=""
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        3
                    </button>
                    <button
                        className="yellow"
                        onClick={(e) => {
                            onOperatorClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="row5">
                    <button
                        className="twoCol"
                        onClick={(e) => {
                            onNumberClick(e);
                            setDisplayArray([
                                ...displayArray,
                                e.target.textContent,
                            ]);
                        }}
                    >
                        0
                    </button>
                    <button className="" onClick={(e) => onNumberClick(e)}>
                        .
                    </button>
                    <button
                        className="yellow"
                        onClick={(e) => {
                            onOperatorClick(e);
                        }}
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
