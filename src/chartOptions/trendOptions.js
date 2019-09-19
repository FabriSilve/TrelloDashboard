import colours from '../constants/colours';

const trendOptions = {
    stroke: {
        width: [
            1, 2, 2
        ],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '10%',
            endingShape: 'rounded'
        }
    },
    fill: {
        opacity: [0.8, 0.4, 1]
    },
    markers: {
        size: 0
    },
    xaxis: {
        type: 'datetime',
        forceNiceScale: true,
        tickAmount: 1,
        labels: {
            show: false,
            style: {
                colors: colours.BLUE,
                fontSize: '10px'
            }
        },
        axisBorder: {
            show: false
        },
        title: { text: 'Team\'s Trend'},
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
            show: false,
            style: {
                color: colours.BLUE
            }
        }
    },
    chart: {
        type: 'line',
        background: 'transparent'
    },
    legend: {
        position: 'top',
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
