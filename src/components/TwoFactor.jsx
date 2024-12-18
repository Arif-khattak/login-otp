import React from "react";

function TwoFactor({
  emptyArray,
  inputRef,
  handleInput,
  inputs,
  handleKeyDown,
  handlePaste,
  handleSubmite,
  missing,
}) {
  return (
    <div className="two-factor">
      <h1>Two Factor code Input</h1>
      <div>
        {emptyArray.map((item, i) => {
          return (
            <input
              value={inputs[i]}
              key={i}
              ref={inputRef[i]}
              type="text"
              maxLength="1"
              onPaste={handlePaste}
              onChange={(e) => handleInput(e, i)}
              className={missing.includes(i) ? "error" : ""}
              onKeyDown={(e) => {
                handleKeyDown(e, i);
              }}
            />
          );
        })}
      </div>
      <button onClick={handleSubmite}>Submite</button>
    </div>
  );
}

export default TwoFactor;
