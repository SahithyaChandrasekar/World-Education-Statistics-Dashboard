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
    x.domain([
      0,
      d3.max(sourceCount, function(d) {
        return d+1;
      }),
    ]);
    y.domain(sourceNames);
  
    let svg = d3.select(svgRef.current);
    svg.attr("height", svgHeight)
    .attr("width", 900)
    .attr("viewBox","250 50 250 600");

    svg = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("transform", "translate(0, 392)")  

      .call(d3.axisBottom(x).tickFormat((d, i) => displayText(d)))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-60)");

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
    .attr("dy", ".3em")
    // .attr("transform", "rotate(90)")
    .style("text-anchor", "start")
    .style("font-size","15")
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

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("font-size", "15px")
      .attr("font-weight", "bold")
      .attr("x", "420")
      .attr("y", "445")
      .text("Average Schooling (in years)");


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
      .attr("stroke", "grey")
      .attr("fill", "#386BB6")
      .style("opacity","0.3")
      

      //  .transition()
      //  .duration(1000)
      .attr("height", function(d) {
        return y.bandwidth();
      });

    bars
      .append("text")
      .text(function(d) {
        return displayText(data[d]);
      })
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
