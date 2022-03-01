/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// Set dimensions and margins for plots 
const width3 = 900; 
const height3 = 450; 
const margin3 = {left:50, right:50, bottom:50, top:50};


// Set the ranges
const xScale3 = d3.scaleLinear().range([margin3.left, width3 - margin3.right]);
const yScale3 = d3.scaleLinear().range([height3-margin3.bottom,margin3.top]); 


// Append the svg to the body of the page
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width3-margin3.left-margin3.right)
  .attr("height", height3 - margin3.top - margin3.bottom)
  .attr("viewBox", [0, 0, width3, height3]);

// Get the data
d3.csv("data/scatter.csv").then(function(data) {

  //Scale the range of the data 
  xScale3.domain([0, d3.max(data, function(d) {return d.day; })]);
  yScale3.domain([0, d3.max(data, function(d) { return d.score; })]); 

  // Add the y axis 
  svg3.append("g")
   .attr("transform", `translate(${margin3.left}, 0)`) 
   .call(d3.axisLeft(yScale3)) 
   .attr("font-size", '20px'); 

// Add the x axis 
svg3.append("g")
    .attr("transform", `translate(0,${height3 - margin3.bottom})`) 
    .call(d3.axisBottom(xScale3) 
            .ticks(15))  
    .attr("font-size", '20px'); 

// Adds the tooltip to body
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Creates the function that pop up when mouse is in a location
const mouseover3 = function(event, d) {
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Explains the changes that occurs when the mouse moves on the screen 
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.x)+"px") 
          .style("top", (event.y) +"px"); 
}

// Creates the function that occurs once the mouse leaves the given area
const mouseleave3 = function(event, d) { 
  tooltip3.style("opacity", 0); 
}

// Create dynamic dots with data, margins, axes, and tooltips 
svg3.selectAll("dot") 
   .data(data) 
   .enter()  
   .append("circle") 
     .attr("r", "3.5") 
     .attr("cx", (d,i) => xScale3(i)) 
     .attr("cy", (d) => yScale3(d.score)) 
     .attr("height", (d) => (height3 - margin3.bottom) - yScale3(d.score)) 
     .attr("width", (d) => (margin3.left) - xScale3(d.day))
     .on("mouseover", mouseover3) 
     .on("mousemove", mousemove3)
     .on("mouseleave", mouseleave3);
})











