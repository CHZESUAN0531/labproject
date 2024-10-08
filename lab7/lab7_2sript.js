$(document).ready(function() {
    console.log('run');
    
    var margin = { top: 10, right: 250, bottom: 100, left: 50 }, // Adjust margins as needed
        w = 600 - margin.left - margin.right,  
        h = 600 - margin.top - margin.bottom;  

    // Doughnut chart settings
    var outerRadius = Math.min(w, h) / 2;
    var innerRadius = outerRadius * 0.5;  // Inner radius for donut chart

    // Color scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Define arc for donut chart
    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    //pie
    // var outerRadius = Math.min(w, h) / 2;
    // var innerRadius = 0;

    var pie = d3.pie();

    // Example dataset
    var dataset = [10, 20, 30, 40]; 

    // Create svg element
    var svg = d3.select("#scatterplot")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                // Adjust transform to center the chart correctly
                .attr("transform", "translate(" + ((w + margin.left + margin.right) / 2) + "," + ((h + margin.top + margin.bottom) / 2) + ")");

    var arcs = svg.selectAll("g.arc")
                  .data(pie(dataset))
                  .enter()
                  .append("g")
                  .attr("class", "arc");

    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

    arcs.append("text")
        .text(function(d) {
            return d.value;
        })
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", "14px");
});
