/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Append the svg to the body of the page
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Function to get the max value for score
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Defines a linear scale for the y-xis 
// Input the domain value for the y-axis using the max score in the data
//The vertical axis range is the height of the SVG 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Contructs a band scale, which is useful for our discrete bands of names
// Input the domain for the x-axis using the number of values
//The horizontal axis range is the width of the SVG
// Padding creates the spacing between the discrete bands 
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Append the y-axis to the svg 
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// Append the x-axis to the svg
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// Add the tooltip to the body of our page
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Creates the function and text thats is diplayed when the mouse is on a specific area
// Makes the box appear when mouse is over object
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Postions the tool tip that pop up  
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// Defines the the tool tip style once the mouse leaves the specific area
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}


/* 

  Bars 

*/

// Creates dynamic bars with out data using the SVG rectangle element
// add a class "bar" to the rectangle element
// Specify x and y postions of each of the bars using scales provided earlier
// Provide a width and height to the bars 
// Defines actions to take when mouse in certain states/postitions

svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);



/*
Csv-bar 
*/


// Set dimensions and margins for plots 
const width2 = 900; 
const height2 = 450; 
const margin2 = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset2 = 15; 

// Set the ranges
const xScale2 = d3.scaleBand().range([margin2.left, width2 - margin2.right]).padding(0.1);
const yScale2 = d3.scaleLinear().range([height2-margin2.bottom,margin2.top]); 


// Append the svg to the body of the page
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width2-margin2.left-margin2.right)
  .attr("height", height2 - margin2.top - margin2.bottom)
  .attr("viewBox", [0, 0, width2, height2]);

// Get the data
d3.csv("data/barchart.csv").then(function(data) {

  //Scale the range of the data 
  xScale2.domain(d3.range(data.length));
  yScale2.domain([0, d3.max(data, function(d) { return d.score; })]); 

  // Add the y axis 
  svg2.append("g")
   .attr("transform", `translate(${margin2.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

// Add the x axis 
svg2.append("g")
    .attr("transform", `translate(0,${height2 - margin2.bottom})`) 
    .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 

// Adds the tooltip to body
const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Creates the function that pop up when mouse is in a location
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Explains the changes that occurs when the mouse moves on the screen 
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset2) +"px"); 
}

// Creates the function that occurs once the mouse leaves the given area
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}

// Create dynamic bars with data, margins, axes, and tooltips 
svg2.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height2 - margin2.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);
})







