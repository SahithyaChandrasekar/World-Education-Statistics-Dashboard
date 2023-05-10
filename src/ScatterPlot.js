import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {getCountryColor} from './functionchartUtil';

const ScatterPlot = ({ data }) => {
  console.log("here",data);
  const svgRef = useRef(null);
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const g = +svg.attr("viewBox","400 -5 1 670");

    // create x scale
    const x = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, d => +d.y));
     
    // create y scale
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain(d3.extent(data, d => +d.x));

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
        .attr('cx', d => x(d.y))
        .attr('cy', d => y(d.x))
        .attr('r', 10)
        .style("opacity", 0.5)
        .attr('fill', d => getCountryColor(d.Country));

    // create x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // create y-axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={svgRef} width="800" height="500">
    </svg>
  );
}

export default ScatterPlot;
