function fetchDataAndUpdateCharthuman() {
    fetch('/get_data9')
      .then(response => response.json())
      .then(humandata => {
        updateCharthuman(humandata);
      })
  }
  
  function updateCharthuman(humandata) {
  am5.ready(function() {
  
    // Create root element
    var root = am5.Root.new("humanchart");
    var myTheme = am5.Theme.new(root);

    myTheme.rule("Label").setAll({
      fill: am5.color(0x000000)
    });
    
    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
      layout: root.verticalLayout
    }));
    chart.children.unshift(am5.Label.new(root, {
      text: "Gender Distribution",
      fontSize: 15,
      fontWeight: "500",
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 0
    }));
    
    
    // Create series
    var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
      alignLabels: true,
      orientation: "vertical",
      valueField: "value",
      categoryField: "category",
      svgPath: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
    }));
    
    series.labelsContainer.set("width", 100);
    series.ticks.template.set("location", 0.6);
    
    
    // Set data
    series.data.setAll(humandata)
    
    
    // Play initial series animation
    chart.appear(1000, 100);
    
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateCharthuman();
  });