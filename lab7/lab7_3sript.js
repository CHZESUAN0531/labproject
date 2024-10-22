$(document).ready(function() {

    var margin = { top: 20, right: 150, bottom: 30, left: 100 },
    w = 900 - margin.left - margin.right,
    h = 700 - margin.top - margin.bottom;

    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    var stack = d3.stack().keys(["apples", "oranges", "grapes"]);
    var stackedData = stack(dataset);

    var svg = d3.select("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])
        .range([h, 0]);

    svg.selectAll("g.layer")
        .data(stackedData)
        .enter().append("g")
        .classed('layer', true)
        .attr("fill", function(d, i) {
            return ["#ff7f0e", "#2ca02c", "#d62728"][i];
        })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
        .attr("width", xScale.bandwidth());

    // Optional: Add X and Y axis
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    // Add legend
    var legendLabels = ["Apples", "Oranges", "Grapes"];
    var legendColors = ["#ff7f0e", "#2ca02c", "#d62728"];

    var legend = svg.selectAll(".legend")
        .data(legendLabels)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { 
            return "translate(0," + (i * 20) + ")"; 
        });

    // Append rectangles for legend
    legend.append("rect")
        .attr("x", w + 20)
        .attr("y", 10)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
            return legendColors[i];
        });

    // Append text labels for legend
    legend.append("text")
        .attr("x", w + 45)
        .attr("y", 19)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d; });
});
