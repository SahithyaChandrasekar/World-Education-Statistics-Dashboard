import React from "react";
import * as d3 from "d3";


export const marks = [
    {
      value: 2000,
      label: "2000",
    },
    {
      value: 2001,
      label: "",
    },
    {
      value: 2002,
      label: "",
    },
    {
      value: 2003,
      label: "",
    },
    {
      value: 2004,
      label: "2004",
    },
    {
      value: 2005,
      label: "",
    },
    {
      value: 2006,
      label: "",
    },
    {
      value: 2007,
      label: "",
    },
    {
      value: 2008,
      label: "2008",
    },
    {
      value: 2009,
      label: "",
    },
    {
      value: 2010,
      label: "",
    },
    {
      value: 2011,
      label: "",
    },
    {
      value: 2012,
      label: "2012",
    },
    {
      value: 2013,
      label: "",
    },
    {
      value: 2014,
      label: "",
    },
    {
      value: 2015,
      label: "",
    },
    {
      value: 2016,
      label: "2016",
    },
    {
      value: 2017,
      label: "",
    },
    {
      value: 2018,
      label: "",
    },
    {
      value: 2019,
      label: "",
    },
    {
      value: 2020,
      label: "2020",
    },
  ];


  export const colorsData = {
    Afghanistan: "#A165F6",
    Argentina: "#E365F6" ,
    Australia: "#486060",
    Bangladesh: "#06AC0F",
    "South Africa": "#1AC9F5" ,
    Canada: "#9B9A82",
     Malaysia: "#3E88CC",
     Indonesia: "#FA7A54",
     Germany: "#B8F93E",
     Switzerland: "#FC4B93",
     Greenland: "#728C00",
    China: "#FF0000",
    Colombia: "#1F95F9",
    Germany: "#636EF9",
    France: "#F963C5",
    "United Kingdom": "#8769FC",
    India: "#00008B",
    Japan: "#7D0552",
    Kazakhstan: "#699EFC",
    Pakistan: "#69D3FC",
    Russia: "#006A4E",
    Thailand: "#69FCC1",
    Tajikistan: "#54FB7E",
    Uganda: "#B0FB54",
    Ukraine: "#FBC510",
    "United States of America": "#B8860B",
    Uzbekistan: "#FB6C10",
    Brazil: "#6F2DA8",
    "United States":"#B8860B",
    "Venezuela":"#3A3B3C",
    "Chile":"#2916F5",
    "Peru":"#046307",
    "Uruguay":"#00FF00",
    "Bolivia":"#F2BB66"
    
  };
  
  export const toLabel = (val) => {
    return "MeanSchooling";
};
export const displayValueText=(val)=>{
  if (parseInt(val) >=24) {
    return `${parseInt(val)}`;
  } else if (parseInt(val) >= 20) {
     return `${parseInt(val)}`;
   } else if (parseInt(val) >= 15) {
     return `${parseInt(val)}`;
   } else 
  return `${parseInt(val)}`;
}
export const displayText = (val) => {
  
    if (parseInt(val) >=24) {
      return `${parseInt(val)}`;
    } else if (parseInt(val) >= 20) {
       return `${parseInt(val)}`;
     } else if (parseInt(val) >= 15) {
       return `${parseInt(val)}`;
     } else 
    return `${val}`;
  };
  export function valuetext(value) {
    return `${value}`;
  };
  
  export const getYearsData=(range)=>{
    var YearData={marks:[]};
    for(var j=1995;j<=range;j=j+5)
  {
    YearData.marks.push({
          "value":j,
          "label":j
        })
  }
    return YearData.marks;
  }

export const getBarChartData = (data,countries,range) => {
    let   datatoreturn = {};
 
  var countriesmean=[];
  for(var j=range[0];j<=range[1];j++)
  {
    for(var i=0;i<countries.length;i++)
    {
      var loopfind=data.Population.find(c => c.year ==j && c.entity==countries[i]);
   
      if(loopfind!=undefined){countriesmean.push (loopfind);}
    }
   }

    for (var i = 0; i < countriesmean.length; i++) {
      datatoreturn[countriesmean[i]['entity']] = countriesmean[i]['population'];
    }
    //console.log(datatoreturn);
    return datatoreturn;
  };

  export const getScatterPlotData = (GDPPerCapita,Education,countries, range) => {
    let scatterPlotData = [];
    var countriesGDP=[];
    var countriesEdu=[];
    // console.log(countries);
  if(countries===[]){
    return scatterPlotData;
  }

  console.log("scatterPlotData", scatterPlotData);
  for(var i=0;i<countries.length;i++)
  {
  for(var j = range[0]; j <= range[1]; j++)
  {
    
      // var loopmeanaverage=data.schooldata.find(c => c.year ==j && c.entity==countries[i]);
      var loopGDP=GDPPerCapita.GDPPerCapita.find(c => c.year ==j && c.entity==countries[i]);
      var loopEdu=Education.Education.find(c => c.year ==j && c.entity==countries[i]);
     // console.log(loopfind);
      if(loopGDP!=undefined){countriesGDP.push (loopGDP);}
      if(loopEdu!=undefined){countriesEdu.push (loopEdu);}
    
   }
 }
console.log("Selected country unemployemnt data");
console.log(countriesGDP);
 //console.log("Selected countries GDP ");
 //console.log(countriesEdu);

for(var i=0;i<countries.length;i++)
{
   for (var j=range[0];j<=range[1];j=j+5)
   {
    let obj = {
         "Year": String(j),
         "Country":countries[i],
         "x":GDPData(countriesGDP,j,countries[i]),
         "y":educationData(countriesEdu,j,countries[i]),
         
       };
       scatterPlotData.push(obj);
   }
 }
// console.log("PCPdata");
// console.log(PCPdata);
    return scatterPlotData;
 };


  export const getPCPdata = (Population,Education,countries, range) => {
    if(countries.length == 0) {
      countries.push("India");
    }
    let PCPdata = [];
    var countriesPop=[];
    var countriesEdu=[];
    // console.log(countries);
  if(countries===[]){
    return PCPdata;
  }
  
  for(var i=0;i<countries.length;i++)
  {
  for(var j = range[0]; j <= range[1]; j++)
  {
    
      // var loopmeanaverage=data.schooldata.find(c => c.year ==j && c.entity==countries[i]);
      var loopPop=Population.Population.find(c => c.year ==j && c.entity==countries[i]);
      var loopEdu=Education.Education.find(c => c.year ==j && c.entity==countries[i]);
     // console.log(loopfind);
      if(loopPop!=undefined){countriesPop.push (loopPop);}
      if(loopEdu!=undefined){countriesEdu.push (loopEdu);}
    
   }
 }

 //console.log("Selected countries GDP ");
 //console.log(countriesEdu);

for(var i=0;i<countries.length;i++)
{
   for (var j=range[0];j<=range[1];j=j+5)
   {
    let obj = {
         "Year": String(j),
         "Country":countries[i],
         "Population": PopulationData(countriesPop,j,countries[i]),
         "Degree":educationData(countriesEdu,j,countries[i]),
         
       };
       PCPdata.push(obj);
   }
 }
// console.log("PCPdata");
// console.log(PCPdata);
    return PCPdata;
 };
 export const educationData=(countriesEdu,range,country)=>{

  var educationData=0;
  var getgdpbyyear=countriesEdu.find(c => c.year ==range && c.entity==country);
  if(getgdpbyyear!=undefined)
  {
    educationData=getgdpbyyear['education']; 
  } 
   if(educationData==0)
      { 
      for(var prevyear=range-1; educationData==0 && prevyear>range-5;prevyear--)
      {
       var getgdpbynxtyear=countriesEdu.find(c => c.year == prevyear && c.entity==country)
       if(getgdpbynxtyear!=undefined)
       {
         educationData=getgdpbynxtyear['education']; 
         console.log("Year :" +prevyear +"Country :"+country+" EduData :"+educationData);
       }
      
      }
  }   
 
 return educationData;

 }
 export const PopulationData=(countriesPop,range,country)=>{

  var unempdata=0;
  var getunempratebyprvyear=countriesPop.find(c => c.year ==range && c.entity==country);
  
  if(getunempratebyprvyear!=undefined)
  {
    unempdata=getunempratebyprvyear['population']; 
  }
  if(unempdata==0)
  { 
   for(var prevyear=range-1;unempdata==0 && prevyear>range-5;prevyear--){
   var  getunempratebyprvyear=countriesPop.find(c => c.year == prevyear && c.entity==country)
   console.log(unempdata)
    if(getunempratebyprvyear!=undefined)
    {
      unempdata=getunempratebyprvyear['population']; 
     // console.log("Year :" +prevyear +"Country :"+country+" GDP :"+ unempdata);
    } 
    }
   }
   console.log("population",unempdata);
    return unempdata;
   
 }
 export const GDPData=(countriesGDP,range,country)=>{

  var unempdata=0;
  var getunempratebyprvyear=countriesGDP.find(c => c.year ==range && c.entity==country);
  
  if(getunempratebyprvyear!=undefined)
  {
    unempdata=getunempratebyprvyear['GDP']; 
  }
  if(unempdata==0)
  { 
   for(var prevyear=range-1;unempdata==0 && prevyear>range-5;prevyear--){
   var  getunempratebyprvyear=countriesGDP.find(c => c.year == prevyear && c.entity==country)
   console.log(unempdata)
    if(getunempratebyprvyear!=undefined)
    {
      unempdata=getunempratebyprvyear['GDP']; 
      console.log("Year :" +prevyear +"Country :"+country+" GDP :"+ unempdata);
    } 
    }
   }
   console.log("GDP",unempdata);
    return unempdata;
   
 }
 export const getStackedAreaData = (data,countries, range) => {
    var ans = [];
      var Stackeddata=[];
      var countriesmean=[];
 for(var j = range[0]; j <= range[1]; j++)
   {
        for(var i=0;i<countries.length;i++)
        {
          var loopfind=data.schooldata.find(c => c.year ==j && c.entity==countries[i]);
         // console.log(loopfind);
          if(loopfind!=undefined){countriesmean.push (loopfind);}
        }
    }
    
    for (var i = 0; i < countriesmean.length; i++) {
      let sub = [],
        obj = {};
      for (var j = range[0]; j <= range[1]; j++) {
        // var loopfind=countriesmean.find(c => c.year ==j && c.entity==countries[i]);
        // Stackeddata.push(loopfind);
        if (ans.length == 0) {
          obj = {
            country: countriesmean[i]['entity'],
            year: j,
            value0: 0,
            value1: parseInt(countriesmean[i]['meanschooling']),
          };
        } else {
          obj = {
            country: countriesmean[i]['entity'],
            year: j,
            value0: ans[ans.length - 1][j - range[0]].value1,
            value1:
              ans[ans.length - 1][j - range[0]].value1 +
              parseInt(countriesmean[i]['meanschooling']),
          };
        }
        sub.push(obj);
      }
      ans.push(sub);
    }
    // console.log(ans);
    return ans;
  };

  
  
export const getCountryColor = (country) => {
    if(colorsData[country]) return colorsData[country];
    return hashStringToColor(country);
}

function djb2(str){
  debugger;
    var hash = 5381;
    console.log(str);
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
  }
  
 export function hashStringToColor(str) {
    var hash = djb2(str);
    var r = (hash & 0xFF0000) >> 16;
    var g = (hash & 0x00FF00) >> 8;
    var b = hash & 0x0000FF;
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
  }