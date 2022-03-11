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
    slpm: "0.00",
    stracc: "0.00",
    strdef: "0.00",
    sapm: "0.00",
    tdavg: "0.00",
    tddef: "0.00",
    tdacc: "0.00",
    subavg: "0.00",
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
    slpm: "0.00",
    stracc: "0.00",
    strdef: "0.00",
    sapm: "0.00",
    tdavg: "0.00",
    tddef: "0.00",
    tdacc: "0.00",
    subavg: "0.00",
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
    // change endpoint
    axios
      .get(`${process.env.HOST_ADDRESS}/fighters/api/divisions`)
      .then((res) => {
        setDivisions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDivisionSelectionOne = (event) => {
    // change endpoint
    const result = event.target.value;
    setDivisionDropOne(result);
    axios
      .get(`${process.env.HOST_ADDRESS}/fighters/api/${result}`)
      .then((res) => {
        setFightersDropOne(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDivisionSelectionTwo = (event) => {
    // change endpoint
    const result = event.target.value;
    setDivisionDropTwo(result);
    axios
      .get(`${process.env.HOST_ADDRESS}/fighters/api/${result}`)
      .then((res) => {
        setFightersDropTwo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFighterOne = (event) => {
    // change endpoint
    const result = event.target.value;
    setFighterOne(result);
    axios
      .get(`${process.env.HOST_ADDRESS}/fighters/${result}`)
      .then((res) => {
        setFighterOneStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFighterTwo = (event) => {
    // change endpoint
    const result = event.target.value;
    setFighterTwo(result);
    axios
      .get(`${process.env.HOST_ADDRESS}/fighters/${result}`)
      .then((res) => {
        setFighterTwoStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function formatData(fighter) {
    // change endpoint
    const result = Object.keys(fighter)
      .map(function (key) {
        return fighter[key];
      })
      .slice(10);
    var slpm_proportion = (Number(result[0]) / 10.0) * 100;
    var sapm_proportion = null;
    if (result[3] !== "0.00") {
      sapm_proportion = (1 - Number(result[3]) / 10.0) * 100;
    } else {
      sapm_proportion = "";
    }
    var tdavg_proportion = (Number(result[4]) / 10.0) * 100;
    var subavg_proportion = (Number(result[7]) / 10.0) * 100;
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
        <div className="box-container">
          <div className="alignment-box-left">
            <div className="left-box">
              <div className="select padMe">
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
              </div>
              <div className="select padMe">
              <select
                className="fighter-drop-one"
                value={fighterOne}
                onChange={handleFighterOne}
              >
                <option>Fighter</option>
                {fightersDropOne.map((f, index) => {
                  if (index === 0) {
                    return (
                      <option key={f.fid} value={f.fid}>
                        {"C). " + f.fname + " " + f.lname}
                      </option>
                    );
                  } else {
                    return (
                      <option key={f.fid} value={f.fid}>
                        {index + "). " + f.fname + " " + f.lname}
                      </option>
                    );
                  }
                })}
              </select>
              </div>
            </div>
            <div className="flex-center">
              <div className="info-container">
                <div className="info-container-left">
              <p><p style={{fontWeight: "bold", display: "inline"}}>SLpm -</p>  {fighterOneStats.slpm}</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>Str. Acc -</p>  {Number(fighterOneStats.stracc).toFixed()}%</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>SApM -</p>  {fighterOneStats.sapm}</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>Str. Def -</p>  {Number(fighterOneStats.strdef).toFixed()}%</p>
              </div>
              <div className="info-container-right">
              <p><p style={{fontWeight: "bold", display: "inline"}}>TD Avg. -</p>  {fighterOneStats.tdavg}</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>TD Acc. -</p>  {Number(fighterOneStats.tdacc).toFixed()}%</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>TD Def. -</p>  {Number(fighterOneStats.tddef).toFixed()}%</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>Sub Avg. -</p>  {fighterOneStats.subavg}</p>
              </div>
            </div>
            </div>
          </div>
          <div className="radarChart" style={{ width: 500 }}>
          <RadarChart chartData={data} />
        </div>
          <div className="alignment-box-right">
            <div className="right-box">
              <div className="select padMe">
              <select
                className=""
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
              </div>
              <div className="select padMe">
              <select
                className="fighter-drop-two"
                value={fighterTwo}
                onChange={handleFighterTwo}
              >
                <option>Fighter</option>
                {fightersDropTwo.map((f, index) => {
                  if (index === 0) {
                    return (
                      <option key={f.fid} value={f.fid}>
                        {"C). " + f.fname + " " + f.lname}
                      </option>
                    );
                  } else {
                    return (
                      <option key={f.fid} value={f.fid}>
                        {index + "). " + f.fname + " " + f.lname}
                      </option>
                    );
                  }
                })}
              </select>
              </div>
            </div>
            <div className="flex-center">
              <div className="info-container">
                <div className="info-container-left">
              <p><p style={{fontWeight: "bold", display: "inline"}}>SLpm -</p>  {fighterTwoStats.slpm}</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>Str. Acc -</p>  {Number(fighterTwoStats.stracc).toFixed()}%</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>SApM -</p>  {fighterTwoStats.sapm}</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>Str. Def -</p>  {Number(fighterTwoStats.strdef).toFixed()}%</p>
              </div>
              <div className="info-container-right">
              <p><p style={{fontWeight: "bold", display: "inline"}}>TD Avg. -</p>  {fighterTwoStats.tdavg}</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>TD Acc. -</p>  {Number(fighterTwoStats.tdacc).toFixed()}%</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>TD Def. -</p>  {Number(fighterTwoStats.tddef).toFixed()}%</p>
              <p><p style={{fontWeight: "bold", display: "inline"}}>Sub Avg. -</p>  {fighterTwoStats.subavg}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-box">
          <div className="row-left">
            <div className="description-box-left">
              <div className="info-box">
                <p className="bold-it">SLpM</p>
                <p> - Significant Strikes Landed per Minute</p>
              </div>
              <div className="info-box">
                <p className="bold-it">Str. Acc.</p>
                <p> - Significant Striking Accuracy</p>
              </div>
              <div className="info-box">
                <p className="bold-it">SApM</p>
                <p> - Significant Strikes Absorbed per Minute</p>
              </div>
              <div className="info-box">
                <p className="bold-it">Str. Def.</p>
                <p>
      
                  - Significant Strike Defence (% of opponents strikes that
                  did not land)
                </p>
              </div>
            </div>
            </div>
            <div className="row-right">
            <div className="description-box-right">
              <div className="info-box">
                <p className="bold-it">TD Avg.</p>
                <p> - Average Takedowns Landed per 15 minutes</p>
              </div>
              <div className="info-box">
                <p className="bold-it">TD Acc.</p>
                <p> - Takedown Accuracy</p>
              </div>
              <div className="info-box">
                <p className="bold-it">TD Def.</p>
                <p>
                  {" "}
                  - Takedown Defense (the % of opponents TD attempts that did
                  not land)
                </p>
              </div>
              <div className="info-box">
                <p className="bold-it">Sub. Avg.</p>
                <p> - Average Submissions Attempted per 15 minutes</p>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Stage;
