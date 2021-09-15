import "./App.css";
import "./frame.css";
import React, { useReducer, createContext, useEffect, useState } from "react";
import Card from "./Componets/Card";
import SideBar from "./Componets/SideBar";
import NavBar from "./Componets/NavBar";
import { Icon } from "@material-ui/core";
export const Context = createContext(null);

const reducer = (data, action) => {
  switch (action.type) {
    case "searchId":
      return { ...data, searchId: action.payload };
    case "tickets":
      return { ...data, tickets: action.payload };
    case "filters":
      return { ...data, filters: action.payload };
    default:
      return data;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, {});
  const [theme, setTheme] = useState({ background: "rgb(230, 240, 251)" });

  useEffect(() => {
    fetch("https://front-test.beta.aviasales.ru/search")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "searchId", payload: data.searchId });
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "tickets", payload: data.tickets });
      });
  }, [data.searchId]);

  return (
    <Context.Provider value={{ data, dispatch }}>
      <div className="App col centered" style={theme}>
        <div className="row centered">
          <div
            className="circle"
            style={{ background: "rgb(180, 180, 233)" }}
            onClick={() => setTheme({ background: " rgb(230, 240, 251)" })}
          ></div>
          <div
            className="circle"
            style={{ background: "black" }}
            onClick={() =>
              setTheme({
                background: "linear-gradient(90deg,#050505, #484c4d)",
                color: "black",
              })
            }
          ></div>
          <div
            className="circle"
            style={{ background: "linear-gradient(90deg,#ce650f, #fb2004)" }}
            onClick={() =>
              setTheme({
                background: "linear-gradient(90deg,#ce650f, #fb2004)",
                color: "black",
              })
            }
          ></div>
        </div>
        <img src="./Logo.png" alt="" className=" logo" />
        <div className="row wrapper">
          <SideBar />
          <div className="col card-wrapper">
            <NavBar />
            {data.filters ? (
              data.filters.map((e) => <Card ticket={e} />)
            ) : data.tickets ? (
              data.tickets.map((e) => <Card ticket={e} />)
            ) : (
              <div>
                <Icon fontSize="large" className="loop">
                  loop
                </Icon>
              </div>
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
