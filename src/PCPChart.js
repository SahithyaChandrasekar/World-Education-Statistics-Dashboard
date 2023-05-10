import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const PCPChart = ({data}) => {
const chartRef = useRef(null);
const [state, setState] = useState();
  const [dimensions, setDimensions] = useState();
  var dragging = {};
  var line = d3.line();
  var background_lines, foreground_lines;
  var tempDims;
  const create_dimensions = (tempState) => {
    let dimensionz = [];
    let tempObj = {};
    if(tempState && tempState.length > 0){
        Object.keys(tempState[0]).map(function(key, index) {
            if (key != "color") {
              if (typeof tempState[0][key] === "number") {
                tempObj = {
                  name: key,
                  scale: d3.scaleLinear().range([height, 0]),
                  type: "number",
                };
              } else {
                tempObj = {
                  name: key,
                  scale: d3.scaleBand().range([0, height]),
                  type: "string",
                };
              }
              dimensionz.push(tempObj);
            }
          });  
    }
    setDimensions(dimensionz);
          tempDims = dimensionz;
  };
    useEffect(() => {
      d3.select(chartRef.current).selectAll("*").remove();
      // Set up chart dimensions and margins
      const margin = { top: 30, right: 50, bottom: 10, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
     
      const svg = d3.select(chartRef.current)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

  // Color scale: give me a specie name, I return a color
  const color = d3.scaleOrdinal()
  .domain(['setosa', 'versicolor', 'virginica'])
  .range(['#440154ff', '#21908dff', '#fde725ff']);
  
    });

}
    
    