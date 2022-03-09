import React, { useState } from "react";
import "../Css/Stage.css";
import axios from 'axios'

const Stage = (props) => {

    const initialDivisionsState = {
        divisions:[]
    }

    const initialFighterState = {
        fighters: []
    }

    const initialFighterOne = {
        division: "t",
        fid: 0,
        fname: "",
        height: "",
        lname: "",
        loses: 0,
        reach: "",
        sapm: "",
        slpm: "",
        stance: "",
        stracc: "",
        strdef: "",
        subavg: "",
        tdacc: "",
        tdavg: "",
        tddef: "",
        tieordq: 0,
        wins: 0
    }

    const initialFighterTwo = {
        division: "t",
        fid: 0,
        fname: "",
        height: "",
        lname: "",
        loses: 0,
        reach: "",
        sapm: "",
        slpm: "",
        stance: "",
        stracc: "",
        strdef: "",
        subavg: "",
        tdacc: "",
        tdavg: "",
        tddef: "",
        tieordq: 0,
        wins: 0
    }

    const [divisions, setDivisions] = useState(initialDivisionsState)
    const [fighters, setFighters] = useState(initialFighterState)
    const [fighterOne, setFighterOne] = useState(initialFighterOne)
    const [fighterTwo, setFighterTwo] = useState(initialFighterTwo)

    function handleDivisonChange(input) {
        var result = []
        for(var i = 0; i < input.length; i++ ){
            result.push(input[i].division)
        }
        setDivisions(result)
    }

    axios.get("http://localhost:3001/fighters/api/divisions", divisions)
    .then(res => {
        handleDivisonChange(res.data)
    })
    .catch(err => {
        console.log(err)
    })

  return (
    <div className="main-stage">
      <div className="container">
        <div className="left-box">Left</div>
        <div>Radar chart</div>
        <div className="right-box">Right</div>
      </div>
    </div>
  );
};

export default Stage;
