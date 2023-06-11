import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { displayText } from "./functionchartUtil";

const BarChart = ({data,width,height}) => {

  // const margin = { top: 20, right: 30, bottom: 40, left: 90 };
  // const width = 460 - margin.left - margin.right;
  // const height = 350 - margin.top - margin.bottom;
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
  }, []);

  useEffect(() => {
    let svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    draw();
  }, [data]);
  const draw =()=>{
    // debugger; 
    var margin = { top: 65, right: 30, bottom: 30, left: 90 };
   
      let svgWidth = 600,
        svgHeight = 518;
      let height =  400,//svgHeight - margin.top - margin.bottom,
      width = 570;//svgWidth - margin.left - margin.right;
        let sourceNames = [],
        sourceCount = [];

        let x = d3.scaleLinear().rangeRound([0, width]),
         y = d3
        .scaleBand()
        .rangeRound([0, height])
        .padding(0.1);
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        sourceNames.push(key);
        sourceCount.push(parseInt(data[key]));
      }
    }

    let maxPopulation;

    if (sourceNames.includes('India') || sourceNames.includes('China')) {
      maxPopulation = 1500000000;
    } else if (sourceNames.includes('United States') || sourceNames.includes('Indonesia') || sourceNames.includes('Pakistan')  || sourceNames.includes('Brazil')) {
      maxPopulation = 350000000;
    } else if(sourceNames.includes('Bangladesh') || sourceNames.includes('Russia') || sourceNames.includes('Mexico') || sourceNames.includes('Japan') || sourceNames.includes('Ethiopia')  || sourceNames.includes('Egypt') || sourceNames.includes('Philippines')){
      maxPopulation = 150000000;
    }
    else{
      maxPopulation = 85000000;
    }
    x.domain([
      0,
      maxPopulation
    ]);
    y.domain(sourceNames);
  
    let svg = d3.select(svgRef.current);
    svg.attr("height", svgHeight)
    .attr("width", 900)
    .attr("viewBox","200 35 250 600");

    svg = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("transform", "translate(0, 392)")  

      .call(d3.axisBottom(x).tickFormat((d) => {
        if (d >= 1000000000) {
          return `${d / 1000000000}B`;
        } else if (d >= 1000000) {
          return `${d / 1000000}M`;
        } else {
          return d;
        }
      }))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "1.25em")
      .attr("dy", ".9em")
      .style("font-size", "16px")
      

    svg.append("g").call(d3.axisLeft(y))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -70)
     .attr("x",function(d){console.log("y-axis name :" + d)
             if(d.length>=13)
             {
              return -90;
             }
             else{
              return -70;
             }
  })
    .attr("dy", "-0.25em")
    .attr("dx", "1.25em")
    // .attr("transform", "rotate(90)")
    .style("text-anchor", "middle")
    .style("font-size","17px")
    //.style("font-family", "sans-serif");
    .style("font-family","Roboto","Helvetica","Arial","sans-serif");


    const getcountrylength=(d)=>{
          return -88;
    }
    // svg.append("text")
    //     .attr("text-anchor", "end")
    //     .attr("x", width)
    //     .attr("y", height)
    //     .text("Count");

    svg.append("text")
    .attr("class", "title")
    .attr("x", width/2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Bar Plot - Total Population");

    svg.append("text")
    .attr("class", "x-axis-label")
    .attr("x", 275)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    // .style("font-weight", "bold")
    .text("Total Population");


    // Create rectangles
    let bars = svg
      .selectAll(".bar")
      .data(sourceNames)
      .enter()
      .append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return 0;
      })
      .attr("y", function(d) {
        return y(d);
      })
      .attr("width", function(d) {
        return x(data[d]);
      })
      .attr("stroke", "#77763C")
      .attr("fill", "#77763C")
      .style("fill-opacity","0.5")
      .style("opacity","1")
      .attr("stroke", "#77763C")
      

      //  .transition()
      //  .duration(1000)
      .attr("height", function(d) {
        return y.bandwidth();
      });

    bars
      // .append("text")
      // .text(function(d) {
      //   return displayText(data[d]);
      // })
      .attr("x", function(d) {
        return x(data[d]) + 30;
      })
      .attr("y", function(d) {
        return y(d) + y.bandwidth() * 0.5; // here 0.1 is the padding scale
      })
      .attr("font-family","Roboto","Helvetica","Arial","sans-serif")
      .attr("font-size", "16px")
      // .attr("fill", "white")
      .attr("text-anchor", "middle");
 };

  return (
    <div>
     {/* <div style={{textAlign:"center",fontWeight:"bold",fontSize:"16px",paddingRight:"54px"}}></div> */}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
