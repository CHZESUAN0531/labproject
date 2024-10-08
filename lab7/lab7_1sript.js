$(document).ready(function() {

    console.log('run');


    d3.csv("lab7_1csv.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(dataset) {
        wombatSightings = dataset;  // Saving dataset to a variable
    
        lineChart(dataset);  // Calling your lineChart function with the dataset
    });


});


function lineChart(dataset){
    console.log(dataset);

    console.table(dataset,["date","number"]);

    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
    

    var svg = d3.select("#scatterplot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Step 2: Set up the scales
    var xScale = d3.scaleTime()
        .domain(d3.extent(dataset, function(d) { return d.date; })) // Use extent for min and max
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.number; })])
        .range([height, 0]);

        // Step 3: Set up the area generator
    var area = d3.area()
        .x(function(d) { return xScale(d.date); }) // Date on x-axis
        .y0(function() { return yScale.range()[0]; }) // Base line (bottom of the area)
        .y1(function(d) { return yScale(d.number); }); // Top of the area (based on data)


        // Append the area to the SVG
        svg.append("path")
        .datum(dataset) // Bind the dataset
        .attr("class", "area") // Apply CSS class for styling
        .attr("d", area)
        .style("fill", "black") // Fill the area with color
        .style("opacity", 0.6); // Set opacity for a softer look


    // Step 3: Set up the line
    var line = d3.line()
        .x(function(d) { return xScale(d.date); }) // Date on x-axis
        .y(function(d) { return yScale(d.number); }); // Unemployment number on y-axis



    // Append the line to the SVG
    svg.append("path")
        .datum(dataset) // Bind the dataset
        .attr("class", "line") // Apply CSS class for styling
        .attr("d", line);

    // Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    // Step 5: Add annotation for half a million unemployed
    svg.append("line")
        .attr("class", "halfMilMark") // Apply CSS class for styling
        .attr("x1", 0) // Start of the line (left side)
        .attr("x2", width) // End of the line (right side)
        .attr("y1", yScale(500000)) // y position for half a million
        .attr("y2", yScale(500000)) // y position for half a million
        .style("stroke", "red") // Add some CSS styling
        .style("stroke-width", "2");

    svg.append("text")
        .attr("class", "halfMilLabel") // Apply CSS class for styling
        .attr("x", 10) // Position near the y-axis
        .attr("y", yScale(500000) - 7) // Slightly above the line
        .text("Half a million unemployed")
        .style("fill", "red"); // Match the label color to the line
}