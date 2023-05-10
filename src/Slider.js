import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { sliderBottom } from 'd3-simple-slider';

function Slider() {
  const sliderRef = useRef(null);
  const [year, setYear] = useState(1990);

  useEffect(() => {
    const slider = d3
      sliderBottom()
      .min(1875)
      .max(2025)
      .step(5)
      .width(300)
      .tickFormat(d3.format("d"))
      .default(1990)
      .on("onchange", (value) => {
        setYear(value);
      });

    d3.select(sliderRef.current).call(slider);
  }, []);

  return (
    <div>
      <div ref={sliderRef}></div>
      <p>Year: {year}</p>
    </div>
  );
}

export default Slider;
