import React from 'react'
import PropTypes from 'prop-types'
// import AmCharts from '@amcharts/amcharts3-react'
import platform from 'platform'

const LineGraph = ({
    id,
    data,
    graphs,
    chartTheme,
    unit,
    unitPosition,
    minimum,
    maximum,
    baseValue,
    logarithmic,
    minorGridEnabled,
    marginRight,
    marginTop,
    guides,
    axisAlpha,
    gridOpacity, cursorColor,
    insideY,
    insideX,
}) => {
    if (!insideY && typeof window !== 'undefined' && window.innerWidth < 550) {
        insideY = true
    }

    const config = {
        type: 'serial',
        theme: chartTheme || 'light',
        addClassNames: true,
        dataProvider: data,
        marginRight: marginRight || 0,
        marginTop: marginTop || 0,
        balloon: {
            color: '#49494A',
            fillAlpha: 1,
            borderColor: '#27A5F9',
            borderThickness: 2,
        },
        graphs,
        valueAxes: [{
            axisAlpha: axisAlpha || 0,
            logarithmic,
            unit,
            unitPosition: unitPosition || 'left',
            gridAlpha: gridOpacity || 0.15,
            minorGridEnabled,
            dashLength: 0,
            inside: insideY,
            baseValue: baseValue || 0,
            minimum,
            maximum,
            strictMinMax: true,
        }],
        guides: guides || [],
        chartCursor: {
            valueLineEnabled: true,
            valueLineAlpha: 0.5,
            cursorAlpha: 0.5,
            cursorColor: cursorColor || '#49494A',
        },
        categoryField: 'date',
        categoryAxis: {
            parseDates: true,
            equalSpacing: true,
            inside: insideX,
            gridAlpha: gridOpacity || 0.15,
            axisAlpha: axisAlpha || 0,
        },
        export: {
            enabled: false,
        },
    }

    if (platform.name === 'Safari') {
        config.dataDateFormat = 'YYYY-M-D'
        config.categoryAxis = {
            equalSpacing: false,
        }
    }
    if (data.length && graphs.length) {
        if (typeof window !== 'undefined') {
            window.AmCharts.makeChart(id, { ...config })
        }
        // return <AmCharts.React {...config} />
    }
    return <div id={id} style={{ height: '400px', width: '100%' }} />
}

LineGraph.defaultProps = {
    data: [],
    graphs: [],
}

LineGraph.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array,
    graphs: PropTypes.array,
    chartTheme: PropTypes.string,
    unit: PropTypes.string,
    unitPosition: PropTypes.any,
    minimum: PropTypes.number,
    maximum: PropTypes.number,
    baseValue: PropTypes.number,
    logarithmic: PropTypes.bool,
    minorGridEnabled: PropTypes.bool,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    guides: PropTypes.array,
    axisAlpha: PropTypes.number,
    gridOpacity: PropTypes.number,
    cursorColor: PropTypes.string,
    insideY: PropTypes.bool,
    insideX: PropTypes.bool,
}

export default LineGraph
