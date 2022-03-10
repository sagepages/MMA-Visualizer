import React, { useState, useEffect } from "react";
import "../Css/Stage.css";
import RadarChart from "./RadarChart";
import axios from "axios";

const Stage = (props) => {
  const fighterStateOne = {
    fid: 0,
    fname: "",
    lname: "",
    wins: 0,
    loses: 0,
    tieordq: 0,
    height: "",
    division: "",
    reach: "",
    stance: "",
    slpm: "",
    stracc: "",
    strdef: "",
    sapm: "",
    tdavg: "",
    tddef: "",
    tdacc: "",
    subavg: "",
  };
  const fighterStateTwo = {
    fid: 0,
    fname: "",
    lname: "",
    wins: 0,
    loses: 0,
    tieordq: 0,
    height: "",
    division: "",
    reach: "",
    stance: "",
    slpm: "",
    stracc: "",
    strdef: "",
    sapm: "",
    tdavg: "",
    tddef: "",
    tdacc: "",
    subavg: "",
  };

  const [divisions, setDivisions] = useState([]);
  const [divisionDropOne, setDivisionDropOne] = useState();
  const [divisionDropTwo, setDivisionDropTwo] = useState();
  const [fightersDropOne, setFightersDropOne] = useState([]);
  const [fightersDropTwo, setFightersDropTwo] = useState([]);
  const [fighterOne, setFighterOne] = useState();
  const [fighterTwo, setFighterTwo] = useState();
  const [fighterOneStats, setFighterOneStats] = useState(fighterStateOne);
  const [fighterTwoStats, setFighterTwoStats] = useState(fighterStateTwo);

  useEffect((divisions) => {
    axios
      .get("http://localhost:3001/fighters/api/divisions")
      .then((res) => {
        setDivisions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDivisionSelectionOne = (event) => {
    const result = event.target.value;
    setDivisionDropOne(result);
    axios
      .get(`http://localhost:3001/fighters/api/${result}`)
      .then((res) => {
        setFightersDropOne(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDivisionSelectionTwo = (event) => {
    const result = event.target.value;
    setDivisionDropTwo(result);
    axios
      .get(`http://localhost:3001/fighters/api/${result}`)
      .then((res) => {
        setFightersDropTwo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFighterOne = (event) => {
    const result = event.target.value;
    setFighterOne(result);
    axios
      .get(`http://localhost:3001/fighters/${result}`)
      .then((res) => {
        setFighterOneStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFighterTwo = (event) => {
    const result = event.target.value;
    setFighterTwo(result);
    axios
      .get(`http://localhost:3001/fighters/${result}`)
      .then((res) => {
        setFighterTwoStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Use better proportion metrics and possibly change the sapm to be the inverse of the proportion since
  // lower is better.  
  function formatData(fighter) {
    const result = Object.keys(fighter)
      .map(function (key) {
        return fighter[key];
      })
      .slice(10);
    const slpm_proportion = (Number(result[0]) / 10.0) * 100;
    const sapm_proportion = (Number(result[3]) / 5.0) * 100;
    const tdavg_proportion = (Number(result[4]) / 10.0) * 100;
    const subavg_proportion = (Number(result[7]) / 10.0) * 100;
    result[0] = String(slpm_proportion);
    result[3] = String(sapm_proportion);
    result[4] = String(tdavg_proportion);
    result[7] = String(subavg_proportion);
    return result;
  }

  const data = {
    labels: Object.keys(fighterOneStats).slice(10),
    datasets: [
      {
        label: fighterOneStats.fname + " " + fighterOneStats.lname,
        data: formatData(fighterOneStats),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: fighterTwoStats.fname + " " + fighterTwoStats.lname,
        data: formatData(fighterTwoStats),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  return (
    <div className="main-stage">
      <div className="container">
        <div className="fighter-stats-one">{console.log(fighterOneStats)}</div>
        <div className="fighter-stats-two">{console.log(fighterTwoStats)}</div>
        <div className="left-box">
          <select
            className="division-drop-one"
            value={divisionDropOne}
            onChange={handleDivisionSelectionOne}
          >
            <option>Division</option>
            {divisions.map((d) => {
              return (
                <option key={d.division} value={d.division}>
                  {d.division}
                </option>
              );
            })}
          </select>
          <select
            className="fighter-drop-one"
            value={fighterOne}
            onChange={handleFighterOne}
          >
            <option>Fighter</option>
            {fightersDropOne.map((f, index) => {
              return (
                <option key={f.fid} value={f.fid}>
                  {index + 1 + "). " + f.fname + " " + f.lname}
                </option>
              );
            })}
          </select>
        </div>
        <div>Radar chart</div>
        <div className="right-box">
          <select
            className="division-drop-two"
            value={divisionDropTwo}
            onChange={handleDivisionSelectionTwo}
          >
            <option>Division</option>
            {divisions.map((d) => {
              return (
                <option key={d.division} value={d.division}>
                  {d.division}
                </option>
              );
            })}
          </select>
          <select
            className="fighter-drop-two"
            value={fighterTwo}
            onChange={handleFighterTwo}
          >
            <option>Fighter</option>
            {fightersDropTwo.map((f, index) => {
              return (
                <option key={f.fid} value={f.fid}>
                  {index + 1 + "). " + f.fname + " " + f.lname}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div style={{ width: 1000 }}>
        <RadarChart chartData={data} />
      </div>
    </div>
  );
};

export default Stage;
