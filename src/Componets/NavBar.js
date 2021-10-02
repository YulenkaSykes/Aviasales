import React, { useContext, useState } from "react";
import { Context } from "../App";

const NavBar = () => {
  const { data, dispatch } = useContext(Context);
  const [active, setActive] = useState("cheap");

  return (
    <div className="row centered btn">
      <div className="button row">
        <button
          className={`${active === "cheap" && "active"}`}
          onClick={() => {
            setActive("cheap");
            dispatch({
              type: "filters",
              payload: [...data.tickets].sort(
                (el1, el2) => el2.price - el1.price
              ),
            });
          }}
          clicked={active === "cheap"}
        >
          Cheap
        </button>
        <button
          className={`${active === "speed" ? "active" : "button"}`}
          onClick={() => {
            setActive("speed");
            dispatch({
              type: "filters",
              payload: [...data.tickets].sort(
                (el1, el2) =>
                  el2.segments[0].duration - el1.segments[0].duration
              ),
            });
          }}
          clicked={active === "speed"}
        >
          Speed
        </button>
        <button
          className={`${active === "optimal" ? "active" : "button"}`}
          onClick={() => {
            setActive("optimal");
            dispatch({ type: "filters", payload: data.tickets });
          }}
          clicked={active === "optimal"}
        >
          Optimal
        </button>
      </div>
    </div>
  );
};

export default NavBar;
