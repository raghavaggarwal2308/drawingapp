import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import { Redirect } from "react-router-dom";

function Container({ socket }) {
  window.addEventListener("click", () => {
    // console.log("clicked");
  });
  window.onclose = function () {
    // console.log("called");
  };
  window.onbeforeunload = function (e) {
    // console.log(e.currentTarget);
    // console.log(performance.navigation.TYPE_RELOAD);
    // console.log(window.onclose);
    sessionStorage.setItem("reloaded", true);
    return "Do you want to refresh?";
  };
  window.addEventListener("popstate", () => {
    // console.log(window.location.href);
    if (window.location.href === "http://localhost:3000/join") {
      // console.log("disconnected");
      socket.emit("disconnectUser", { username, roomname });
    }
  });
  const [shape, setShape] = useState("pencil");
  const [deselect, setdeselect] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("black");
  const [fillColor, setFillColor] = useState("");
  const [lineStyle, setLineStyle] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const username = window.location.pathname.split("/")[2].trim().toLowerCase();
  const roomname = window.location.pathname.split("/")[3].trim().toLowerCase();
  const deselectAll = (e) => {
    if (e.target.className !== "upper-canvas ") {
      setdeselect(true);
    }
  };
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated === "true" ? (
        <div onClick={deselectAll}>
          <ToolBar
            shape={shape}
            setShape={setShape}
            username={username}
            roomname={roomname}
          />
          <Board
            shape={shape}
            setShape={setShape}
            socket={socket}
            deselect={deselect}
            setdeselect={setdeselect}
            lineColor={lineColor}
            lineWidth={lineWidth}
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            username={username}
            roomname={roomname}
            fillColor={fillColor}
            setFillColor={setFillColor}
            lineStyle={lineStyle}
            setLineStyle={setLineStyle}
            opacity={opacity}
            setOpacity={setOpacity}
          />
          <SideBar
            shape={shape}
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            lineColor={lineColor}
            lineWidth={lineWidth}
            username={username}
            roomname={roomname}
            fillColor={fillColor}
            setFillColor={setFillColor}
            lineStyle={lineStyle}
            setLineStyle={setLineStyle}
            opacity={opacity}
            setOpacity={setOpacity}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Container;
