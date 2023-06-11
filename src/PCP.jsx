import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Grid from "@mui/material/Grid";
import {displayValueText, displayText,getCountryColor} from './functionchartUtil';
//import "./Styles.css";

const colors = [
  "#65AAF6",
  "#F69765",
  "#F6D765",
  "#CDF665",
  "#65F685",
  "#65F6C5",
  "#65EAF6",
  "#65AFF6",
  "#A165F6",
  "#E365F6",
];

export function PCP({data}) {
  console.log("PCPdata")
  let scatterRef = useRef(null);
  const [state, setState] = useState();
  const [dimensions, setDimensions] = useState();
  var margin = {
    top: 30,
    right: 40,
    bottom: 20,
    left: 150
  },
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
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

  var x,y,ygdpline,yunempline;
  var sourceCount_GDP=[],sourceCount_unemp=[];

var gdpname='GDP Per Capita';
var degree = 'Population holding a degree'

  useEffect(() => {
    if (data) {
      let parsedResponse = data;
      let tempState = parsedResponse;
      // var no_of_dimensions = Object.keys(parsedResponse[0]).length - 1;
      create_dimensions(parsedResponse);
      tempDims.forEach(function(dimension) {
        dimension.scale.domain(
          dimension.type === "number"
            ? d3.extent(parsedResponse, function(d) {
                return +d[dimension.name];
              })
            : parsedResponse
                .map(function(d) {
                   return d[dimension.name];
                })
                .sort()
        );
      });
      setState(tempState);
      clearBoard();
      draw();
    }
  }, [data]);

  useEffect(() => {
    clearBoard();
    draw();
  }, [state, dimensions]);

  const clearBoard = () => {
    const accessToRef = d3.select(scatterRef.current);
    accessToRef.selectAll("svg > *").remove();
  };

  const coordinate = (d) => {
    var v = dragging[d.name];
    return v == null ?  gdptranslate(d.name) : v;
  };

  const gdptranslate=(d)=>{
    //var v=dragging[d.name];
    if(d == gdpname)
    {
    return 275;
    }
    else{
      return x(d);
    }
  };

  const transition = (g) => {
    return g.transition().duration(500);
  };

  const path = (d) => {
    return line(
      dimensions.map(function(dimension) {
        var draggingV = dragging[dimension.name];
//        var xpoint = draggingV == undefined ? x(dimension.name) : draggingV;
        var xpoint = draggingV == undefined ? gdptranslate(dimension.name) : draggingV;
        let ypoint =
          dimension.type === "string"
            ? dimension.scale(d[dimension.name]) +
              dimension.scale.bandwidth() / 2
             : dimension.scale(d[dimension.name]);
            // console.log("xpoint",xpoint);
            // console.log("ypoint",ypoint);
        return [xpoint, ypoint];
      })
    );
  };

  const brushstart = (event) => {
  };

  const brush = (svg) => {
    var actives = [];
    svg
      .selectAll(".brush")
      .filter(function(d) {
        return d3.brushSelection(this);
      })
      .each(function(key) {
        actives.push({
          dimension: key,
          extent: d3.brushSelection(this),
        });
      });
    if (actives.length === 0) {
      foreground_lines.style("display", null);
    } else {
      foreground_lines.style("display", function(d) {
        return actives.every(function(brushObj) {
          return (
            brushObj.extent[0] <=
              brushObj.dimension.scale(d[brushObj.dimension.name]) &&
            brushObj.dimension.scale(d[brushObj.dimension.name]) <=
              brushObj.extent[1]
          );
        })
          ? null
          : "none";
      });
    }
  };

  const draw = () => {
    if (state != undefined) {


     for (let key in state) {
    if (state[key].hasOwnProperty('Degree')) {
      sourceCount_unemp.push(parseInt(state[key]['Degree']));
    }
   }
   
   for (let key in state) {
    if (state[key].hasOwnProperty('Population')) {
      sourceCount_GDP.push(parseInt(state[key]['Population']));
    }
   }


x = d3.scalePoint().domain(
          dimensions.map(function(d) {
              return d.name;
          })).range([0, width]);

 y = d3.scaleLinear().domain([0,15]).range([height, 0]);




 yunempline=d3.scaleLinear().domain([0,d3.max(sourceCount_unemp, function(d) {
  return d+1;
  }),]).range([height, 0]);
  ygdpline=d3.scaleLinear().domain([0,d3.max(sourceCount_GDP, function(d) {
    return d+1;}),
    ]).range([height, 0]);

      var svg = d3
        .select(scatterRef.current)
        .attr("width", 768)
        .attr("height", 400)
        .attr("viewBox", "260 -80 100 500")
        .append("g")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      if (state != undefined) {
        background_lines = svg
          .append("g")
          .attr("class", "background")
          .selectAll("path")
          .data(state)
          .enter()
          .append("path");

        foreground_lines = svg
          .append("g")
          .attr("class", "foreground")
          .selectAll("path")
          .data(state)
          .enter()
          .append("path")
          .attr("d", path)
          .style("stroke", function(d) {
            
            return getCountryColor(d.Country);
          });

        var g = svg
          .selectAll(".dimension")
          .data(dimensions)
          .enter()
          .append("g")
          .attr("class", "dimension")
           .attr("transform", function(d) {
                return  "translate(" + gdptranslate(d.name) + ")";
           });

           
           svg.append("text")
  .attr("class", "title")
  .attr("x", width/2)
  .attr("y", -50)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .style("font-family","  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;")
  .text("PCP  Plot - Total Population vs Population holding a degree");

        g.append("g")
          .attr("class", "axis")
          .each(function(d) {
           if(d.name==="Year" || d.name==="Country")
           {
            d3.select(this).call(d3.axisLeft(y).scale(d.scale).tickFormat((d, i) => d)).style("font-size","12px");
           }
           else if(d.name === "Degree")
           {
            d3.select(this).call(d3.axisLeft(yunempline).tickFormat((d) => {
              if (d >= 1000000) {
                return `${d / 1000000}M`;
              } else if (d >= 1000) {
                return `${d / 1000}T`;
              } else {
                return d;
              }
            }))
            .style("font-size","12px");
           }
           else if(d.name === "GDP")
           {
            d3.select(this).call(d3.axisLeft(y).scale(ygdpline).tickFormat((d, i) => displayText(d)));
           }
           else if(d.name === "Population") {
            d3.select(this).call(d3.axisLeft(ygdpline).tickFormat((d) => {
              if (d >= 1000000000) {
                return `${d / 1000000000}B`;
              } else if (d >= 1000000) {
                return `${d / 1000000}M`;
              } else {
                return d;
              }
            })
            )
            .style("font-size","12px");
           }
          })
          .append("text")
          .style("text-anchor", "middle")
          .attr("class", "axis-label")
          .attr("y", -19)
          .style("fill", "black")
          .style("font-size", "16px")
          
          // .style("padding","10px")
          .text(function(d) {
            if(d.name== "Degree"){
              return "Population holding a degree"
            }
            else if(d.name== "Population"){
              return "Total Population";
            }
            else{
              return d.name
            }
          });

        g.append("g")
          .attr("class", "brush")
          .each(function(d) {
            d3.select(this).call(
              (d.scale.brush = d3
                .brushY()
                .extent([
                  [-10, 0],
                  [10, height],
                ])
                .on("start", brushstart)
                .on("brush", function(d) {
                  brush(svg);
                })
                .on("end", function(d) {
                  brush(svg);
                }))
            );
          })
          .selectAll("rect")
          .attr("x", -8)
          .attr("width", 16);
      }
    }
  };
  return state ? (
    <svg ref={scatterRef}></svg>
  ) : (
    <div>Select Countries to plot</div>
  );
}
