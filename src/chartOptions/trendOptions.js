import colours from '../constants/colours';

const trendOptions = {
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '10%',
            endingShape: 'rounded'
        }
    },
    fill: {
        opacity: [1, 0.4, 1]
    },
    markers: {
        size: 0
    },
    title: {
        text: 'Team\'s Trend',
        align: 'center',
    },
    xaxis: {
        type: 'datetime',
        forceNiceScale: true,
        tickAmount: 1,
        labels: {
            show: true,
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
            borderType: 'solid',
            color: 'gray',
            height: 4,
            offsetX: 0,
            offsetY: 0
        }
    },
    yaxis: {
        min: 0,
        opposite: true,
        forceNiceScale: true,
        labels: {
            show: true,
        }
    },
    chart: {
        type: 'line',
        background: 'transparent'
    },
    legend: {
        position: 'bottom',
        labels: {
            useSeriesColors: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
        onItemClick: {
            toggleDataSeries: false
        }
    }
};

export default trendOptions;
