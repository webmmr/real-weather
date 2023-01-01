// For Fusion Chart
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import line from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, line, FusionTheme);

const ShowChart = ({ chartData }) => {
  console.log(chartData);
  const chartConfigs = {
    type: "line", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart

    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Temperature by Hourly",

        //Set the x-axis name
        xAxisName: "Hour",
        //Set the y-axis name
        yAxisName: "Temperature",
        numberSuffix: "°C",
        showValues: "1",
        bgColor: "#E2E8F0",
        //Set the theme for your chart
        theme: "fusion",
      },
      // Chart Data
      data: chartData[0],
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ShowChart;
