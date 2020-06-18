// const url = "data/samples.json";

function getPlots(id) {
    d3.json("samples.json").then (sampleData =>{
        console.log(sampleData)
        var ids = sampleData.samples;
        var response = ids.filter(sample=> sample.id == id);
        var result = response[0];
        console.log(ids)
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        yAxis = otu_ids.slice(0,10).map(otu_ID=> `OTU ${otu_ID}`).reverse();
        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: yAxis,
            text: otu_labels.slice(0,10).reverse(),
            marker: {
            color: 'red'},
            type: "bar",
            orientation: "h"
        };
        var data = [trace];

        var layout = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    Plotly.newPlot("bar", data, layout);
    // bubble
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels

        };
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };


        var data1 = [trace1];
    Plotly.newPlot("bubble", data1, layout_2);
        
    });
}
function getDemoInfo(id) {
   d3.json("samples.json").then ((sampleData) =>{
    var metadata = sampleData.metadata;
    var response = metadata.filter(sample=> sample.id == id);
    var result = response[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value])=> {
        PANEL.append("h6").text(`${key.toUpperCase()}:${value}`);
    });
   });
}
function optionChanged(id) {
    console.log(id);
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
            
        
    });
}

init();