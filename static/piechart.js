function fetchDataAndUpdateChartpie() {
    fetch('/get-d1')
      .then(response => response.json())
      .then(piedata => {
        updateChartpie(piedata);
      })
      .catch(error => console.error('Error:', error))
  }

  function updateChartpie(piedata) {
    am5.ready(function() {

      // Create root element
      var root = am5.Root.new("piechart");
      var myTheme = am5.Theme.new(root);

        myTheme.rule("Label").setAll({
          fill: am5.color(0x000000)
        });

        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);
      
      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      var chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      }));
      chart.children.unshift(am5.Label.new(root, {
        text: "Sales of each productline",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "left",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));
      
      
      // Create series
      var series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      }));
      
      
      // Set data
      series.data.setAll(piedata)


    // Create legend
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 15,
      marginBottom: 15
    }));

    legend.data.setAll(series.dataItems);
          
      
      // Play initial series animation
      series.appear(1000, 100);
      
      });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChartpie();
  });