import React, { useEffect, useState } from "react";
export default function Board() {
  const [pattern, setPattern] = useState([]);
  const [notMovingPattern,setNotMovingPattern] = useState([])
  const rows = 25
  const cols = 10
  function patternBuilder(col, count) { 
    const arr = new Array(rows);
    let limit = count % 2 == 0 ? 0 : cols-1;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols).fill("BLACK");
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i][col] = "RED";
      if (col > limit) {
        col--;
      } else if (col < limit) {
        col++;
      } else {
        if (limit == 0) {
          limit = cols-1;
          col = 1;
        } else {
          limit = 0;
          col = cols-2;
        }
      }
    }
    return arr;
  }
  
  useEffect(() => {
    setNotMovingPattern(patternBuilder(0,0))

    let col = 0;
    let count = 0;
   const interval =  setInterval(() => {
      setPattern(patternBuilder(col, count));
      if (count % 2 == 0) {
        col++;
      } else {
        col--;
      }
      if (col >= cols) {
        count++;
        col = cols-2;
      } else if (col < 0) {
        count++;
        col = 1;
      }
    }, 100);
    return ()=>{
      clearInterval(interval)
    }
  }, []);

  return (
    <>
      <div className={`h-[auto] w-[auto] grid gap-0`} style={{gridTemplateColumns:`repeat(${cols},50px)`}}>
        {pattern.map((column, row) =>
          column.map((color, col) => (
            <span
              key={col}
              style={{ backgroundColor: `${color == "RED" ? "red" : `${notMovingPattern[row][col]=="RED"?"blue":""}`}` }}
              className="h-[50px] w-[50px] bg-black border-[1px] border-white text-white flex items-center justify-center"
            >
              {row * 10 + col}
            </span>
          ))
        )}
      </div>
    </>
  );
}
