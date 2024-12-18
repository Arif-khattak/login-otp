import { useEffect, useRef, useState } from "react";
import "./App.css";
import TwoFactor from "./components/TwoFactor";

function App() {
  const emptyArray = ["", "", "", ""];
  const inputRef = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArray);
  const [missing, setMissing] = useState(emptyArray);
  const code = "1234";

  const handleSubmite = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === "") {
          return i;
        }
      })
      .filter((item) => item || item === 0);
    setMissing(missed);
    if (missed.length) return;
    const userInput = inputs.join("");
    const isMatch = userInput === code;
    const msg = isMatch ? "Input is Valid" : "Input is Invalid";
    alert(msg);
  };

  useEffect(() => {
    inputRef[0].current.focus();
  }, []);
  const handleInput = (e, index) => {
    const val = e.target.value;
    if (!Number(val)) {
      // alert("Invalid Inputs!");
      return;
    }

    if (index < inputs.length - 1) {
      inputRef[index + 1].current.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  };

  console.log("inputs ", inputs);
  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);
      if (index !== 0) {
        inputRef[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text");
    const pasteData = data.split("");

    if (pasteData === !Number || pasteData.length > inputs.length) {
      // alert("Invalid Inputs!");
      return;
    }
    setInputs(pasteData);
    inputRef[inputs.length - 1].current.focus();
  };

  return (
    <>
      <TwoFactor
        emptyArray={emptyArray}
        inputRef={inputRef}
        handleInput={handleInput}
        inputs={inputs}
        handleKeyDown={handleKeyDown}
        handlePaste={handlePaste}
        handleSubmite={handleSubmite}
        missing={missing}
      ></TwoFactor>
    </>
  );
}

export default App;
