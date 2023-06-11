import React, { Fragment, useState } from "react";
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
import { Padding } from "@mui/icons-material";

function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [schooldata, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(2020);
  const [PCPRangeValue, SetPCPRangeValue] = useState([1995, 2020]);
  const [GDPPerCapita, SetGDPPerCapita] = useState([]);
  const [Education, setEduData] = useState([]);
  const [Population, setPopulationData] = useState([]);

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  React.useEffect(() => {
    var loadmeanschoolingjson = [];
    var loadGDPpercapitajson = [];
    var loadEdujson = [];
    var loadPopulationjson=[];
    d3.csv("https://raw.githubusercontent.com/Sucharitha-Inapanuri/CSVDataFiles/main/mean-years-of-schooling-long-run.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadmeanschoolingjson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "AverageSchooling": d[i]['AverageSchooling'] });
      }
      setData(loadmeanschoolingjson);
    });

    d3.csv("https://raw.githubusercontent.com/SahithyaChandrasekar/CSVData_VIS/main/GDP.csv").then((d) => {
      for (var i = 0; i < d.length; i++) {
        loadGDPpercapitajson.push({ "entity": d[i]['Entity'], "year": d[i]['year'], "GDP": d[i]['GDP'] });
      }
      SetGDPPerCapita(loadGDPpercapitajson);
    });

    d3.csv("https://raw.githubusercontent.com/SahithyaChandrasekar/CSVData_VIS/main/popl.csv").then((d) => {
      
      for (var i = 0; i < d.length; i++) {
        loadEdujson.push({ "entity": d[i]['Entity'], "year": d[i]['Year'], "education": d[i]['edu'] });
      }
      setEduData(loadEdujson);
    });

    
    d3.csv("https://raw.githubusercontent.com/SahithyaChandrasekar/CSVData_VIS/main/Population.csv").then((d) => {
      for (var i=0; i<d.length; i++){
        loadPopulationjson.push({"entity":d[i]['Entity'],"year":d[i]['Year'],"population":d[i]['Population']});
      }
      setPopulationData(loadPopulationjson);
    });


    return () => undefined;
  }, []);
  return (
    <Fragment >
       <header className="dashboard-header">World Education Statistics</header>
      <Grid container height="100%">
        <Grid container style={{gridGap: "4%"}} row height="350px">
          <Grid className="dashboard-container"  item xs={5} height="110%" width="100%">
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
          <Grid  className="dashboard-container" item xs={6.5} height="110%" width="100%">
            <PCP data={getPCPdata({ Population }, { Education }, countries, PCPRangeValue)} />
          </Grid>
        </Grid>
        <Grid container style={{gridGap: "2%" }} row  height="420px">
          <Grid item xs={5.3} className="dashboard-container " height="100%" >
            <ScatterPlot
              data={getScatterPlotData(
                { GDPPerCapita },
                { Education },
                countries,
                [1995,rangeValue]
              )} />
          </Grid>
          <Grid item xs={0.8}  justifyContent="center"  height="100%" >
            <Slider  getAriaLabel={() => "Years range"}
              value={rangeValue}
              style= {{height : 300, marginTop: '50px', color:'#77763C'}}
              onChange={handleRangeChange}
              valueLabelFormat={valuetext}
              orientation="vertical"
              marks={getYearsData(rangeValue)}
              min={1995}
              step = {5}
              max={2020}
            />
          </Grid>
          <Grid item xs={5.3} className="dashboard-container" height="100%" >
            <BarChart
              data={getBarChartData(
                { Population },
                countries,
                [1995,rangeValue]
              )} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Dashboard;
