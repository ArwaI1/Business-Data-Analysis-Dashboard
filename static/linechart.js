function fetchDataAndUpdateChartline() {
    fetch('/get-d3')
      .then(response => response.json())
      .then(linedata => {
        updateChartline(linedata);
      })
  }
  
  function updateChartline(linedata) {
  am5.ready(function() {
  
  
    // Create root element
    var root = am5.Root.new("linechart");
    
    
    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    var myTheme = am5.Theme.new(root);

    myTheme.rule("Label").setAll({
      fill: am5.color(0x000000)
    });
    
    // Create chart
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true,
      paddingLeft: 0
    }));
    chart.children.unshift(am5.Label.new(root, {
      text: "Sales Trend over Time",
      fontSize: 15,
      fontWeight: "500",
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 0
    }));
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled:true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        pan:"zoom"
      })  
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "Date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    
    
    // // Add scrollbar
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //   orientation: "horizontal"
    // }));
    
    
    // Set data
    series.data.processor = am5.DataProcessor.new(root,{
      dateFormat: "dd-MM-yyyy",
      dateFields: ["Date"]
    });
    series.data.setAll(linedata);

    
    
    
    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
    
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChartline();
  });