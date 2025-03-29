import React, { useState } from "react";
import { data } from "./data";
import "./accordion.css";
function Accordion() {
  console.log("Accordion loaded");

  const [selected, setSelected] = useState({ id: null });
  const handleClick = (item) => {
    console.log(item);
    setSelected(selected.id === item.id ? { id: null } : item);
  };
  return (
    <div className="">
      <h1>Accordion </h1>
      <div>
        {data.map((item) => {
          return (
            <div key={item.id} onClick={() => handleClick(item)}>
              <h3>
                {item.question}{" "}
                <span>{selected.id === item.id ? "-" : "+"}</span>
              </h3>

              {selected.id === item.id ? <p>{item.answer}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Accordion;
