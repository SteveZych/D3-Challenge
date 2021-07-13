//set the dimensions and margins of the graph
var margin = {top:10, right:30, bottom:30, left:60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read data
d3.csv("assets/data/data.csv").then(function(data){

    // Cast the hours value to a number for each piece of data
    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    //Add X axis
    var x = d3.scaleLinear()
        .domain([3,28])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //Add Y axis
    var y = d3.scaleLinear()
        .domain([8,24])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append('g')
        .selectAll("#scatter")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.healthcare))
        .attr("cy", d => y(d.poverty))
        .attr("r", 5)
        .style("fill", "#69b3a2")
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.abbr))
        .attr("y", d => y(d.abbr))
        .style("fill", "#000000")
        .style("font-size", "14px");
        
    svg.append("text")
        .attr("class","x label")
        .attr("text-anchor", "end")
        .attr("x", width -100)
        .attr("y", height + 30)
        .text("Lacks Healthcare (%)");
    
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", height - 400)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("In Poverty (%)");
});