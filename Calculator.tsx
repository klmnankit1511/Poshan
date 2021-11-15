import React, { useState } from "react";
import "./Calculator.css";

import reactDom from "react-dom";
import axios from "axios";
function Calculator() {
  const [gender,setGender] = useState("Male");
  const [dis,setDis] = useState(true)
  const handleRange = (e) => {
    (document.getElementById(e.target.id)as HTMLInputElement).style.background =
      "linear-gradient(90deg, #e05754 " +
      e.target.value / 2 +
      "% ,#C4C4C4 " +
      e.target.value / 2 +
      "%)";
    (document.getElementById(e.target.id + "-text")as HTMLInputElement).value = e.target.value;
  };
  const handleBoy = (e) => {
    setGender("Male");
    (document.getElementById("gender-girl") as HTMLInputElement).classList.remove("gender-btn-add-colour");
    (document.getElementById("gender-boy") as HTMLInputElement).classList.add("gender-btn-add-colour");
  };
  const handleGirl = (e) => {
    setGender("Female");
    // document.getElementById("gender-boy").style.
    (document.getElementById("gender-girl") as HTMLInputElement).classList.add(
      "gender-btn-add-colour"
    );
    (
      document.getElementById("gender-boy") as HTMLInputElement
    ).classList.remove("gender-btn-add-colour");
  };
  const handleAge = (e) => {
    // setDis(true);
    var clr = document.getElementById(e.target.id);
    if (clr) {
      clr.style.color = "black";
    }

    var dob = e.target.value.replaceAll("-", "");
    var year = Number(dob.substr(0, 4));
    var month = Number(dob.substr(4, 2)) - 1;
    var day = Number(dob.substr(6, 2));
    dob = new Date();
    dob.setMonth(month);
    dob.setFullYear(year);

    var today = new Date();
    var ageYear = (function () {
      if (dob.getMonth() == today.getMonth()) {
        if (dob.getDate() > today.getDate()) {
          return today.getFullYear() - 1 - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      } else {
        if (dob.getMonth() > today.getMonth()) {
          return today.getFullYear() - 1 - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      }
    })();
    var ageMonth = (function () {
      if (today.getMonth() >= dob.getMonth()) {
        if (today.getDate() >= dob.getDate()) {
          return today.getMonth() - dob.getMonth();
        } else {
          if (today.getMonth() - 1 >= dob.getMonth()) {
            return today.getMonth() - 1 - dob.getMonth();
          } else {
            return today.getMonth() - 1 + 12 - dob.getMonth();
          }
        }
      } else {
        if (today.getDate() >= dob.getDate()) {
          return today.getMonth() + 12 - dob.getMonth();
        } else {
          return today.getMonth() - 1 + 12 - dob.getMonth();
        }
      }
    })();

    if (
      today.getMonth() < month ||
      (today.getMonth() === month && today.getDate() < day)
    ) {
      ageYear--;
    }
    if (today.getMonth() == month && today.getDate() < day) {
      ageMonth = 11;
    }
    // (
    //   document.getElementById("age-number-input-age") as HTMLInputElement
    // ).value = ageYear < 0 ? "0" : ageYear.toString();
    // (
    //   document.getElementById("age-number-input-month") as HTMLInputElement
    // ).value = ageMonth < 0 ? "0" : ageMonth.toString();
  };
  const handleAgeNumber = (e) => {
    if (e.target.value < 0) {
      (document.getElementById(e.target.id) as HTMLInputElement).value = "0";
    }
  };
  const handleValue = (e) => {
    if (e.target.value <= 0) {
      (document.getElementById(e.target.id) as HTMLInputElement).value = "1";
    } else if (e.target.value > 200) {
      (document.getElementById(e.target.id) as HTMLInputElement).value = "200";
      (
        document.getElementById(
          e.target.id.replaceAll("-text", "")
        ) as HTMLInputElement
      ).value = e.target.value;
      (
        document.getElementById(
          e.target.id.replaceAll("-text", "")
        ) as HTMLInputElement
      ).style.background =
        "linear-gradient(90deg, #e05754 " + 100 + "% ,#C4C4C4 " + 0 + "%)";
    } else {
      (
        document.getElementById(
          e.target.id.replaceAll("-text", "")
        ) as HTMLInputElement
      ).value = e.target.value;
      (
        document.getElementById(
          e.target.id.replaceAll("-text", "")
        ) as HTMLInputElement
      ).style.background =
        "linear-gradient(90deg, #e05754 " +
        e.target.value / 2 +
        "% ,#C4C4C4 " +
        e.target.value / 2 +
        "%)";
    }
  };
  const handleSubmit = async (e) => {
    var height = (
      document.getElementById("input-range-slider1-text") as HTMLInputElement
    ).value;
    var weight = (
      document.getElementById("input-range-slider2-text") as HTMLInputElement
    ).value;
    var age = (
      document.getElementById("age-number-input-age") as HTMLInputElement
    ).value;
    var month = (
      document.getElementById("age-number-input-month") as HTMLInputElement
    ).value;
    var dob = (
      document.getElementById("age-calender-input-date") as HTMLInputElement
    ).value
      .split("-")
      .reverse()
      .join("-");
    var ageNum = +age;
    var monthNum = +(month);
    if (!dis && ageNum <= 0 && monthNum <= 0) {
      alert("Please Enter Age");
    } else {
      var data = {
        gender:gender,
        dob: dob,
        age: age === "" ? 0 : age,
        month: month === "" ? 0 : month,
        height: height === "" ? "50" : height,
        weight: weight === "" ? "50" : weight,
      };

      // var url = "";
      // await axios.post(url,data).then((res)=>{
      //   console.log(res);
      // }).catch((err)=>{
      //   console.log(err);
      // })

      console.log("InputData--->", data);
    }
  };
  const handleDis = (e,action)=>{
    if (action == "calender") {
      setDis(true);
    } else {
      setDis(false);
    }
  }
  return (
    <div className="container">
      <div className="calculator">
        <div className="calc-title">Poshan Calculator</div>
        <div className="calc-content">
          Calculator to measure the child growth based on the WHO Child Growth
          Standards
        </div>
        <div className="calc-div">
          <div className="calc-div-sec gender-section">
            <div className="calc-div-title gender-title">
              Gender<small>*</small>
            </div>
            <div className="gender-btn">
              <div
                className="gender-btn-add-colour gender-boy"
                id="gender-boy"
                onClick={(e) => {
                  handleBoy(e);
                }}
              >
                <i className="fas fa-male"></i>BOY
              </div>
              <div
                className="gender-girl"
                id="gender-girl"
                onClick={(e) => {
                  handleGirl(e);
                }}
              >
                <i className="fas fa-female"></i>GIRL
              </div>
            </div>
          </div>
          <div className="calc-div-sec age-section">
            <div className="age-calender" onClick = {(e)=>{handleDis(e,"calender")}}>
              <div className="calc-div-title age-calender-title">
                Date of Birth<small>*</small>
              </div>
              <div className="age-calender-input">
                {" "}
                <input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  onChange={(e) => handleAge(e)}
                  id="age-calender-input-date"
                  disabled={!dis}
                ></input>{" "}
                <br />
                <label></label>
              </div>
            </div>
            <div className="age-calender-or">OR</div>
            <div className="age-number" onClick = {(e)=>{handleDis(e,"age")}}>
              <div className=" calc-div-title age-number-title">
                Age <small>*</small>
              </div>
              <div className="age-number-input">
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    className="input-size"
                    id="age-number-input-age"
                    onChange={(e) => handleAgeNumber(e)}
                    disabled={dis}
                  ></input>
                  <br />
                  <label>Years</label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    className="input-size"
                    id="age-number-input-month"
                    onChange={(e) => handleAgeNumber(e)}
                    disabled={dis}
                  ></input>
                  <br />
                  <label>Months</label>
                </div>
              </div>
            </div>
          </div>
          <div className=" calc-div-sec height-section">
            <div className="calc-div-title height-section-title">
              Height (CM)<small>*</small>
            </div>
            <div className="height-section-input">
              <div className="height-section-input-range">
                <input
                  type="range"
                  min="1"
                  max="200"
                  id="input-range-slider1"
                  className="input-range-slider"
                  onChange={(e) => handleRange(e)}
                ></input>
              </div>
              <div className="height-section-input-text">
                <input
                  type="number"
                  className="input-size"
                  id="input-range-slider1-text"
                  placeholder="50"
                  onChange={(e) => handleValue(e)}
                ></input>{" "}
                <br />
                <label>CM</label>
              </div>
            </div>
          </div>
          <div className="calc-div-sec weight-section">
            <div className="calc-div-title weight-section-title">
              Weight (KG)<small>*</small>
            </div>
            <div className="weight-section-input">
              <div className="weight-section-input-range">
                <input
                  type="range"
                  min="1"
                  max="200"
                  id="input-range-slider2"
                  className="input-range-slider"
                  onChange={(e) => handleRange(e)}
                ></input>
              </div>
              <div className="weight-section-input-text">
                <input
                  type="number"
                  className="input-size"
                  id="input-range-slider2-text"
                  placeholder="50"
                  onChange={(e) => handleValue(e)}
                ></input>
                <br />
                <label>KG</label>
              </div>
            </div>
          </div>
          <div className="result-submit-btn">
            <button onClick={(e) => handleSubmit(e)}>Show Result</button>
          </div>
          <div className="result-section">
            <div className="result-section-div result-stunting">
              <div className="result-section1-div stunting-section1">
                <div className="stunting-title">Stunting</div>
                <div className="stunting-status">
                  <div className="stunting-status-box">Severely Stunted</div>
                </div>
              </div>
              <hr />
              <div className="stunting-section2">
                <p>
                  <span>Suggestions:</span> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit ut aliquam...
                </p>
              </div>
            </div>
            <div className="result-section-div result-underweight">
              <div className="result-section1-div underweight-section1">
                <div className="underweight-title">Underweight</div>
                <div className="underweight-status">
                  <div className="underweight-status-box">
                    Moderately Underweight
                  </div>
                </div>
              </div>
              <hr />
              <div className="underweight-section2">
                <p>
                  <span>Suggestions:</span> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit ut aliquam...
                </p>
              </div>
            </div>
            <div className="result-section-div result-wasting">
              <div className="result-section1-div wasting-section1">
                <div className="wasting-title">Wasting</div>
                <div className="wasting-status">
                  <div className="washing-status-box">Normal</div>
                </div>
              </div>
              <hr />
              <div className="wasting-section2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Calculator;
