import React, { useRef, useState, useEffect, Fragment } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

import './Styles.css';
import { getCountryColor } from "./functionchartUtil";

function WorldMap({selectCountry}) {
  const mapRef = useRef(null);
  var [countries,setCountries] = useState([]);

  useEffect(() => {
    var dataselect=d3.select(mapRef.current).selectAll("*");
    console.log(dataselect);
    d3.select(mapRef.current).selectAll("*").remove();

    // Set the dimensions and margins of the map
    const margin = { top: 0, right: 0, bottom: 70, left: 0 },
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var tooltip = d3.select("#tooltip");

    // Create SVG element for the map
    const svg = d3.select(mapRef.current)
      .append('svg')
      .attr('width', "100%")
      .attr('height', "100%")
      .attr("viewBox", "300 -30 140 425");

    // Add a group to the SVG element for the map
    const map = svg.append('g')
      .attr('class', 'map');

      svg.append("text")
      .attr("class", "title")
      .attr("x", width/2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("World Map");

    // Load the world map data using D3's built-in function
    //https://d3js.org/world-110m.v1.json
    d3.json('https://raw.githubusercontent.com/Sucharitha-Inapanuri/CSVDataFiles/main/geoworld.json').then(function (world) {

      // Convert the TopoJSON to GeoJSON
      const countries = topojson.feature(world, world.objects.world).features;

      // Create a projection for the map
      const projection = d3.geoMercator()
        .scale(90)
        .translate([width / 2, height / 1.5]);

      // Create a path generator using the projection
      const path = d3.geoPath()
        .projection(projection);

      

      let mouseOver = function (event, d) {
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .5)   
        tooltip.transition()
         .duration(50)
         .style("font-size",18)
         .style("opacity", 3);
        tooltip.html(d.properties['name'])
         .style("left", (event.pageX) + "px")
         .style("top", (event.pageY - 28) + "px")
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 2)
          .style("stroke", "white")
          // .style("fill","orange")
      }

      let mouseLeave = function (d) {
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .8)
        d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "transparent")
          // .style('fill', '#b8b8b8')
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);

      }

//onclick event function 

let onClick=function (evnet,d) {
  d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", 0.25)   
        if(!d3.select(this).classed("selected")){
          d3.select(this).classed("selected",true)
          // .transition()
          // .duration(200)
          .style("fill", function(d) { if (d!=null) { return (getCountryColor(d.properties['name']));} })
        
        } else {
            d3.select(this).classed("selected", false)
            // .transition()
            // .duration(200)
            .style("stroke", "transparent")
            .style('fill', '#b8b8b8')
        }
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
          
    selectCountry(d.properties['name']);
}

//.style("fill", function(d) { if (d.id == countryCode) { return color(colorCountry(d, d.id));} });
      // Draw the map using the path generator
      map.selectAll('.country')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'country')
        .classed("selected",function(d) { return d.properties.name === "India" ?true : false;} )
        .attr('d', path)
        .style('stroke', '#ffffff')
        .style('stroke-width', 0.5)
        //.style("fill", function(selectCountry) { if (selectCountry!=null) { return (getCountryColor(selectCountry.properties['name']));} })
        .style('fill', '#b8b8b8')
        .style("fill", function(d) { return d.properties.name === "India" ? getCountryColor("India") : "#b8b8b8"; })
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
        .on("click", onClick);

    });

  }, []);

  return (
    <div style={{height: "100%"}} ref={mapRef} />
  );
}

export default WorldMap;
