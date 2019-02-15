// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top:20,
    right:40,
    bottom:80,
    left: 50
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

d3.csv("data/data.csv").then(function(popstats){
        popstats.forEach(function(record){
        record.smokes = +record.smokes;
        record.age = +record.age;
        record.poverty = +record.poverty;
        record.healthcare = +record.healthcare;
        record.obesity = +record.obesity;
    });
    
    console.log(popstats)
    
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(popstats, d=>d["poverty"]-1),
        d3.max(popstats,d=>d["poverty"])])
        .range([0,chartWidth]);

    console.log("x-axis data");
    console.log(d3.min(popstats, d=>d["poverty"]));
    console.log(d3.max(popstats, d=>d["poverty"]));
    console.log("y-axis data");
    console.log(d3.min(popstats, d=>d["healthcare"]));
    console.log(d3.max(popstats, d=>d["healthcare"]));
    
    console.log(d3.max(popstats, d=>d["obesity"]));
    console.log(d3.min(popstats, d=>d["obesity"]));

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(popstats, d=>d["healthcare"]-1),
            d3.max(popstats, d=>d["healthcare"])])
        .range([chartHeight,0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

 
    chartGroup.append("g")
    .call(leftAxis);

    var gdots =  chartGroup.selectAll("g.dot")
        .data(popstats)
        .enter()
        .append('g');
    gdots.append("circle")
        .attr("cx", d => xLinearScale(d["poverty"]))
        .attr("cy", d => yLinearScale(d["healthcare"]))
        .attr("r", d=>d.obesity / 2)
        .attr("fill", "steelblue")
        .attr("opacity", ".5");

    gdots.append("text").text(d=>d.abbr)
        .attr("x", d => xLinearScale(d.poverty)-4)
        .attr("y", d => yLinearScale(d.healthcare)+2)
        .style("font-size",".6em")
        .classed("fill-text", true);

    console.log(d => xLinearScale(d.poverty));
    console.log(d => yLinearScale(d.healthcare));
  
  
  chartGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") 
    .attr("active", true)
    .text("Poverty Vs. Healthcare");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("axis-text", true)
    .text("Healthcare");
});