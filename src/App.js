import React, { useState } from "react";
import "./App.css";
import { Button, TextField, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [colorVal, setColorVal] = useState("#dfdfdf");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  //Function to get the HEX Values
  const getHex = () => {
    let hex = document.getElementById("hex").value;
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
      document.getElementById("hex").value = "#" + hex;
      document.getElementById("red").value = parseInt(hex.substring(0, 2));
      document.getElementById("green").value = parseInt(hex.substring(2, 4));
      document.getElementById("blue").value = parseInt(hex.substring(4, 6));
      document.getElementById("red").focus();
      document.getElementById("green").focus();
      document.getElementById("blue").focus();

      setColorVal("#" + hex);
      return;
    } else {
      setOpen(true);
    }
  };

  //Function to get RGB Color
  const getRGB = () => {
    let red = document.getElementById("red").value;
    let green = document.getElementById("green").value;
    let blue = document.getElementById("blue").value;

    if (
      red === "" ||
      green === "" ||
      blue === "" ||
      red > 255 ||
      green > 255 ||
      blue > 255
    ) {
      setOpen2(true);
    } else {
      let r = (+red).toString(16);
      r = r.length < 2 ? "0" + r : r;

      let g = (+green).toString(16);
      g = g.length < 2 ? "0" + g : g;

      let b = (+blue).toString(16);
      b = b.length < 2 ? "0" + b : b;

      let rgb = "#" + r + g + b;
      document.getElementById("hex").value = rgb;
      document.getElementById("hex").focus();
      setColorVal(rgb);
    }
  };

  //Function to get color from sample colors
  const getColor = (e) => {
    if (e.target.className === "samp") {
      let colorArr = e.target.id.split(",");
      document.getElementById("red").value = colorArr[0];
      document.getElementById("green").value = colorArr[1];
      document.getElementById("blue").value = colorArr[2];
    }
    getRGB();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpen2(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <h1>Color Picker App</h1>
      <i>Pick the values of your favourite Color from here..</i>

      <div className="main">
        <div className="first">
          <input type="color" id="palatte" value={colorVal} disabled style={{boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'}}/>
        </div>

        <div className="second" style={{ marginLeft: "5vw" }}>
          <h3 style={{ textAlign: "left" }}>Get color using HEX value</h3>
          <br />
          <div style={{ display: "flex" }}>
            <TextField
              id="hex"
              label="Hex Code"
              className="hexColor"
              type="text"
              helperText="RRGGBB"
            />

            <Button
              variant="contained"
              sx={{ maxHeight: "3.5rem", marginLeft: "1vw" }}
              onClick={getHex}
            >
              Get Color
            </Button>
          </div>

          <br />
          <br />
          <h3 style={{ textAlign: "left" }}>Get color using RGB</h3>
          <div style={{ display: "flex", marginTop: "4vh" }}>
            <TextField
              id="red"
              label="Red"
              type="number"
              style={{ width: "10vw" }}
              helperText="value: 0-255"
            />
            &emsp;
            <TextField
              id="green"
              label="Green"
              type="number"
              style={{ width: "10vw" }}
              helperText="value: 0-255"
            />
            &emsp;
            <TextField
              id="blue"
              label="Blue"
              type="number"
              style={{ width: "10vw" }}
              helperText="value: 0-255"
            />
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "2vh", height: "3.5rem", marginRight:"30vw" }}
            onClick={getRGB}
          >
            Get Color
          </Button>
        </div>
      </div>

      <em style={{ textAlign: "left" }}>Some Popular Sample Colours:</em>
      <div className="sample" onClick={getColor}>
        <div
          className="samp"
          id="234,7,237"
          style={{ backgroundColor: "rgb(234, 7, 237)",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        ></div>
        <div
          className="samp"
          id="255,0,0"
          style={{ backgroundColor: "rgb(255, 0, 0)",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        ></div>
        <div
          className="samp"
          id="0,255,0"
          style={{ backgroundColor: "rgb(0, 255, 0)",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        ></div>
        <div
          className="samp"
          id="0,0,255"
          style={{ backgroundColor: "rgb(0, 0, 255)",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        ></div>
        <div
          className="samp"
          id="5,255,251"
          style={{ backgroundColor: "rgb(5, 255, 251)",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        ></div>
        <div
          className="samp"
          id="238,255,95"
          style={{ backgroundColor: "rgb(238, 255, 95)",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        ></div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="required hex code format not matched"
        action={action}
      />

      <Snackbar
        open={open2}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Values must be in between 0-255"
        action={action}
      />
    </div>
  );
}

export default App;
