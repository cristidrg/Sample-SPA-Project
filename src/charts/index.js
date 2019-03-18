export {default as BarChart} from './Bar.vue';
export {default as PieChart} from './Pie.vue';
export {default as DoughnutChart} from './Doughnut.vue';

Chart.defaults.global.defaultFontFamily = "'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif";

Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.percentage;
            var support = centerConfig.text;
            var color = centerConfig.color || '#000';

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = "4rem " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            ctx.fillText(txt, centerX, centerY - 50);
            //Draw support text under
            ctx.font = "2.5rem " + fontStyle;
            ctx.fillStyle = '#000';

            ctx.fillText(support, centerX, centerY + 20);
        }
    }
});