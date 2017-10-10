import React from 'react'
import PropTypes from 'prop-types'

const PieChart = ({
    id,
    data,
    unit = '',
    colors = [],
}) => {
    const config = {
        type: 'pie',
        dataProvider: data,
        titleField: 'title',
        valueField: 'value',
        balloonText: `[[title]]<br/>[[value]]${unit}`,
        radius: '40%',
        innerRadius: '70%',
        labelsEnabled: false,
        colors,
    }

    if (data.length && typeof window !== 'undefined') {
        window.AmCharts.makeChart(id, { ...config })
    }
    return <div id={id} />
}

PieChart.defaultProps = {
    data: [],
    graphs: [],
    unit: '',
}

PieChart.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array,
    unit: PropTypes.string,
    colors: PropTypes.array,
}

export default PieChart
