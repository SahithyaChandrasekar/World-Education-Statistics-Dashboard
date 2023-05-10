import React, { Fragment } from "react";
import * as d3 from "d3";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";

import WorldMap from "./WorldMap";
import BarChart from "./BarChart";
import { PCP } from "./PCP";
import ScatterPlot from "./ScatterPlot";
import "./Dashboard.css";
import {
  getBarChartData,
  getScatterPlotData,
  getPCPdata,
  valuetext, getYearsData
} from "./functionchartUtil";

function Dashboard() {
  const [countries, setCountries] = React.useState([]);
  const [schooldata, setData] = React.useState([]);
  const [GDP, SetGDP] = React.useState([]);
  const [unempolymentRate, SetUnemployementrate] = React.useState([]);
  const [rangeValue, setRangeValue] = React.useState([1995, 2020]);
  const [PCPRangeValue, SetPCPRangeValue] = React.useState([1995, 2020]);
  const [GDPPerCapita, SetGDPPerCapita] = React.useState([]);
  const [Education, setEduData] = React.useState([]);

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  React.useEffect(() => {
    var loadmeanschoolingjson = [];
    var loadunemployementratejson = [];
    var loadGDPjson = [];
    var loadGDPpercapitajson = [];
    var loadEdujson = [];
    d3.csv("https://raw.githubusercontent.com/Sucharitha-Inapanuri/CSVDataFiles/main/mean-years-of-schooling-long-run.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadmeanschoolingjson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "AverageSchooling": d[i]['AverageSchooling'] });
      }
      setData(loadmeanschoolingjson);
    });
    d3.csv("https://raw.githubusercontent.com/Sucharitha-Inapanuri/CSVDataFiles/main/unemployment-rate.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadunemployementratejson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "UnemploymentRate": d[i]['UnemploymentRate'] });
      }
      SetUnemployementrate(loadunemployementratejson);
    });

    d3.csv("https://raw.githubusercontent.com/Sucharitha-Inapanuri/CSVDataFiles/main/total-government-expenditure-on-education-gdp.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadGDPjson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "GDP": d[i]['GDP'] });
      }
      SetGDP(loadGDPjson);
    });

    d3.csv("https://raw.githubusercontent.com/SahithyaChandrasekar/CSVData_VIS/main/GDP.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadGDPpercapitajson.push({ "entity": d[i]['Entity'], "year": d[i]['year'], "GDP": d[i]['GDP'] });
      }
      SetGDPPerCapita(loadGDPpercapitajson);
    });

    d3.csv("https://raw.githubusercontent.com/SahithyaChandrasekar/CSVData_VIS/main/totalexp.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadGDPjson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "GDP": d[i]['totalexp'] });
      }
      SetGDP(loadGDPjson);
    });

    d3.csv("https://raw.githubusercontent.com/SahithyaChandrasekar/CSVData_VIS/main/popl.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadEdujson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "education": d[i]['edu'] });
      }
      setEduData(loadEdujson);
    });

    return () => undefined;
  }, []);

  return (
    <Fragment>
      <header className="dashboard-header">World Education Statistics</header>
      <Grid container spacing={1} height="100%">
        <Grid container item spacing={4} height="380px">
          <Grid item xs={6} height="inherit" width="inherit">
            <WorldMap
              selectCountry={(country) => {
                setCountries((prevState) => {
                  const index = prevState.indexOf(country);
                  if (index > -1) {
                    const updatedState = [...prevState];
                    updatedState.splice(index, 1);
                    return updatedState;
                  } else {
                    return [...prevState, country];
                  }
                });
              }
              }
            />
          </Grid>
          <Grid item xs={6}>
            <PCP data={getPCPdata({ GDPPerCapita }, { Education }, countries, PCPRangeValue)} />
          </Grid>
        </Grid>
        <Grid container item spacing={4} height="415px">
          <Grid item xs={5.5}>
            <ScatterPlot
              data={getScatterPlotData(
                { GDPPerCapita },
                { Education },
                countries,
                rangeValue
              )} />
          </Grid>
          <Grid item spacing={1} justifyContent="center">
            <Slider getAriaLabel={() => "Years range"}
              value={rangeValue}
              onChange={handleRangeChange}
              valueLabelFormat={valuetext}
              orientation="vertical"
              marks={getYearsData(rangeValue)}
              min={1995}
              max={2020}
            />
          </Grid>
          <Grid item xs={5.5}>
            <BarChart
              data={getBarChartData(
                { schooldata },
                countries,
                rangeValue
              )} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Dashboard;
