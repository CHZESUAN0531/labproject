$(document).ready(function() {

    MapChart();
});


function MapChart() {
    console.log("MapChart Initialized");

    var w = 800; // Dynamic width
    var h = 500; // Dynamic height

    // Define a projection method (Mercator projection centered on coordinates)
    var projection = d3.geoMercator()
                       .scale(2450)
                       .center([145.5, -37.5]) 
                       .translate([w / 2, h / 2]); 

    // Define path generator using the projection
    var path = d3.geoPath().projection(projection);

    // Append an SVG element to the DOM
    var svg = d3.select("#mapchart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("background-color", "#f0f0f0"); // Improved background styling

    // Define a color scale for better visualization
    var color = d3.scaleSequential(d3.interpolateBlues)
                  .domain([0, 10]); // Adjust domain based on your data

    // Load GeoJSON data
    d3.json("LGA_VIC.json").then(function(json) {
        // Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#333") // Improved stroke for boundaries
        .attr("fill", function(d, i) {
            d.originalColor = color(i % 10); // Store the original color in the data object
            return d.originalColor; // Use this original color for the fill
        })
        .on("mouseover", function(event, d) {
            d3.select(this)
              .attr("fill", "#ffcc00"); // Highlight on hover
        })
        .on("mouseout", function(event, d) {
            d3.select(this)
              .attr("fill", d.originalColor); // Reset color to the original on mouse out
        });
 
    }).catch(function(error) {
        console.error("Error loading the GeoJSON data: ", error); // Error handling
    });
}