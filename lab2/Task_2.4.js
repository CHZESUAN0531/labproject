function init(){

    console.log('run');
    d3.csv("Task_2.4_data.csv").then(function(data){

        wombatSightings = data;
        barChart(wombatSightings);
    })

    d3.csv("Task_2.4_optional_data.csv").then(function(dataoptional){

        petowner = dataoptional;

        optionalbarchart(petowner);

    })


    

}


function barChart(){

    var dataset = wombatSightings;

    // Chart dimensions and padding
    var w = 500;
    var h = 100;
    var padding = 3;

    // Create the SVG element
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    // Create bars for the chart
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function(d) {
            return h - d.wombats * 3; // Scale the height
        })
        .attr("width", w / dataset.length - padding)
        .attr("height", function(d) {
            return d.wombats * 3; // Scale the height
        })
        .attr("fill", "yellow");

    // Add labels to the bars
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d.wombats;
        })
        .attr("x", function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
        })
        .attr("y", function(d) {
            return h - (d.wombats * 3) - 5; // text hide
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");


}


function optionalbarchart(){

    var dataset = petowner;
    console.log(dataset);
    var w = 500;
    var h = 100;
    var padding = 3;
    var labelHeight = 30; // Height allocated for labels
    

    var svg = d3.select("#chartoptional")
        .append("svg")
        .attr("width", w)
        .attr("height", h + labelHeight); // Increase SVG height
    
    // Create bars for the chart
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function(d) {
            return h - d.percentage * 3; // Scale the height
        })
        .attr("width", w / dataset.length - padding)
        .attr("height", function(d) {
            return d.percentage * 3; // Scale the height
        })
        .attr("fill", "teal");
    
    // Add labels to the bars
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d.petowner;
        })
        .attr("x", function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
        })
        .attr("y", h + 15) // Position the text below the chart but within the SVG
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "green")
        .attr("text-anchor", "middle");

}

window.onload = init;