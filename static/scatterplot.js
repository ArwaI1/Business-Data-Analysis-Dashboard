function fetchDataAndUpdateChartscatter() {
    fetch('/get-d2')
      .then(response => response.json())
      .then(scatterdata => {
        updateChartscatter(scatterdata);
      })
      .catch(error => console.error('Error:', error))
  }
  
  function updateChartscatter(scatterdata) {
    am5.ready(function() {
      // Create root element
      var root = am5.Root.new("scatterplot");
  
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
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true
      }));
      chart.children.unshift(am5.Label.new(root, {
        text: "  ",
        fontSize: 15,
        fontWeight: "500",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 100
      }));
  
      // Create axes
      var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {})
      }));
  
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));
  
      // Create series
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
        tooltip: am5.Tooltip.new(root, {
          labelText: "x: {valueX}, y: {valueY}, value: {value}"
        })
      }));
  
      series.strokes.template.set("visible", false);
  
      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series]
      }));
  
      // Add graphics to line series which will contain bullets
      var canvasBullets = series.children.push(am5.Graphics.new(root, {}));
  
      canvasBullets.set("draw", (display) => {
        // Loop through all data items
        am5.array.each(series.dataItems, (dataItem) => {
          // Set fill style from data context
          var dataContext = dataItem.dataContext;
          if (dataContext) {
            const point = dataItem.get("point");
            if (point) {
              display.beginPath();
              display.beginFill(dataContext.color);
              display.drawCircle(point.x, point.y, dataContext.value / 2);
              display.endFill();
            }
          }
        });
      });
  
      // User data is set on each redraw, so we use this to mark draw as dirty
      series.strokes.template.on("userData", drawBullets);
  
      function drawBullets() {
        canvasBullets._markDirtyKey("draw");
      }
  
      series.data.setAll(scatterdata);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChartscatter();
  });