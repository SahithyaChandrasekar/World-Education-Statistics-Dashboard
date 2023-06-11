import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {getCountryColor} from './functionchartUtil';
import './ScatterPlot.css';

const ScatterPlot = ({ data }) => {
  console.log("here",data);
  const svgRef = useRef(null);
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const g = +svg.attr("viewBox","350 -40 1 740");

    // create x scale
    const x = d3.scaleLinear()
      .range([0, width])
      .domain([0,95000000]);
     
     
    // create y scale
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0,65000]);
    // horizontal gridlines
    svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x)
      .tickSize(-height)
      .tickFormat('')
    ).selectAll('.tick line')
    .attr('class', 'stroke-dasharray');

  // vertical gridlines
  svg.append('g')
    .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat('')
    ).selectAll('.tick line')
    .attr('class', 'stroke-dasharray');

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
        .attr('cx', d => x(parseFloat(d.y)))
        .attr('cy', d => {
          
          if (typeof d.x === 'string' && d.x.includes(',')) {
            return y(parseFloat(d.x.replace(',', '')));
          } else {
            return y(parseFloat(d.x));
          }
        })
        .attr('r', 10)
        .style("opacity", 0.5)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', d => getCountryColor(d.Country));

        svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", 375)
        .attr("y", height + 55)
        .attr("text-anchor", "middle")
        .style("font-size", "22px") 
        .text("Population holding a degree");
    
      // create y-axis label
      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", - (height / 2))
        .attr("y", -85)
        .attr("text-anchor", "middle")
        .style("font-size", "22px")
        .text("GDP per capita (in millions)");

      // create title
svg.append("text")
.attr("class", "title")
.attr("x", width/2)
.attr("y", -10)
.attr("text-anchor", "middle")
.style("font-size", "24px")
.style("font-weight", "bold")
.text("Scatter Plot - Population holding a degree vs GDP");


    // create x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      //.call(d3.axisBottom(x));
      .call(d3.axisBottom(x).ticks(5)).style('font-size', '18px');

    // create y-axis
    svg.append('g')
    .call(d3.axisLeft(y).ticks(5)).style('font-size', '18px');
  }, [data]);
  return (
    <svg ref={svgRef} width="800" height="500">
      <g transform="translate(40, 20)"></g>
    </svg>
  );
}

export default ScatterPlot;
