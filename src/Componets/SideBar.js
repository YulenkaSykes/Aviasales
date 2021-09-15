import React, { useState, useContext } from "react";
import { Context } from "../App";

const SideBar = () => {
  const { data, dispatch } = useContext(Context);
  const [filters, setFilters] = useState("all");
  return (
    <div className="sideBar col shadow">
      <p>Transfers</p>
      <span className="checkbox">
        <input
          type="checkbox"
          onChange={() => {
            setFilters("all");
            dispatch({ type: "filters", payload: data.tickets });
          }}
          checked={filters === "all"}
        />
        All
      </span>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            setFilters("none");
            dispatch({
              type: "filters",
              payload: data.tickets.filter((e) =>
                e.segments.every((el) => el.stops.length === 0)
              ),
            });
          }}
          checked={filters === "none"}
        />
        Without transfers
      </span>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            setFilters("t1");
            dispatch({
              type: "filters",
              payload: data.tickets.filter((e) =>
                e.segments.every((el) => el.stops.length === 1)
              ),
            });
          }}
          checked={filters === "t1"}
        />
        1 transfer
      </span>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            setFilters("t2");
            dispatch({
              type: "filters",
              payload: data.tickets.filter((e) =>
                e.segments.every((el) => el.stops.length === 2)
              ),
            });
          }}
          checked={filters === "t2"}
        />
        2 transfers
      </span>
      <span>
        <input
          type="checkbox"
          onChange={() => {
            setFilters("t3");
            dispatch({
              type: "filters",
              payload: data.tickets.filter((e) =>
                e.segments.every((el) => el.stops.length === 3)
              ),
            });
          }}
          checked={filters === "t3"}
        />
        3 transfers
      </span>
    </div>
  );
};

export default SideBar;
