import axios from "axios";
const URL = "http://localhost:5000";

const addFigureAPI = async (figure) => {
  await axios.post(`${URL}/addFigure`, figure);
};

const updateFigure = async (figure) => {
  await axios.patch(`${URL}/updateFigure`, figure);
};

const getFigures = async (roomname, username) => {
  return await axios.get(`${URL}/getFigures`, {
    params: {
      roomname,
      username,
    },
  });
};

const clearCanvas = async (roomname) => {
  await axios.patch(`${URL}/clearCanvas`, { roomname });
};

const changeLineColor = async (lineColor, roomname, username) => {
  await axios.patch(`${URL}/changeLineColor`, {
    lineColor,
    roomname,
    username,
  });
};

const changeLineWidth = async (lineWidth, roomname, username) => {
  await axios.patch(`${URL}/changeLineWidth`, {
    lineWidth,
    roomname,
    username,
  });
};

const changeShape = async (shape, roomname, username) => {
  await axios.patch(`${URL}/changeShape`, { shape, roomname, username });
};

// const undoFigure = async (figure, roomname, id) => {
//   await axios.patch(`${URL}/undoFigure`, { figure, roomname, id });
// };
const undoFigure = async (figures, roomname) => {
  await axios.patch(`${URL}/undoFigure`, { figures, roomname });
};
const redoFigure = async (figures, roomname) => {
  await axios.patch(`${URL}/redoFigure`, { figures, roomname });
};
export {
  addFigureAPI,
  updateFigure,
  getFigures,
  clearCanvas,
  changeLineColor,
  changeLineWidth,
  changeShape,
  undoFigure,
  redoFigure,
};
