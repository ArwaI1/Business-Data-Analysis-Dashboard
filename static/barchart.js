function fetchDataAndUpdateChart() {
    fetch('/get-d')
      .then(response => response.json())
      .then(data => {
        updateChart(data);
      })
      .catch(error => console.error('Error:', error))
  }

  function updateChart(data) {
    // Initialize amCharts
    am5.ready(function () {
  
      // Create root element
      var root = am5.Root.new("barchart");
      var myTheme = am5.Theme.new(root);

      myTheme.rule("Label").setAll({
        fill: am5.color(0x000000)
      });
  
      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
  
      // Create chart
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));
      chart.children.unshift(am5.Label.new(root, {
        text: "Branches vs Sales",
        fontSize: 15,
        fontWeight: "500",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));
  
      // Add cursor
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);
  
      // Create axes
      var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: 0, 
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });
      xRenderer.grid.template.setAll({
        location: 1
      });
  
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviationX: 0.3,
        categoryField: "status",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));
  
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviationY: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));
  
      // Create series
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "status",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));
  
    series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
    });
  

    series.columns.template.adapters.add("fill", function(fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });   
    series.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });    

    xAxis.data.setAll(data) ;
    series.data.setAll(data) ;
    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart();
  });