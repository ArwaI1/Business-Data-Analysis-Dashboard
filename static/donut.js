function fetchDataAndUpdateChartdonut() {
  fetch('/get-data8')
    .then(response => response.json())
    .then(donutdata => {
      updateChartdonut(donutdata);
    })
    .catch(error => console.error('Error:', error))
}

function updateChartdonut(donutdata) {
am5.ready(function() {
  var root = am5.Root.new("donutchart");
  var myTheme = am5.Theme.new(root);

  myTheme.rule("Label").setAll({
    fill: am5.color(0x000000)
  });
  
  root.setThemes([
    am5themes_Animated.new(root)
  ]);


  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    layout: root.verticalLayout,
    innerRadius: am5.percent(50)
  }));
  chart.children.unshift(am5.Label.new(root, {
    text: "Customer Type Distribution",
    fontSize: 15,
    fontWeight: "500",
    x: am5.percent(50),
    centerX: am5.percent(50),
    paddingTop: 0,
    paddingBottom: 0
  }));

  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    alignLabels: false
  }));

  series.labels.template.setAll({
    textType: "circular",
    centerX: 0,
    centerY: 0
  });

  var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    marginTop: 15,
    marginBottom: 15,
  }));

  series.data.setAll(donutdata);
  legend.data.setAll(series.dataItems);
 series.appear(1000, 100);

  });
}
document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdateChartdonut();
});
