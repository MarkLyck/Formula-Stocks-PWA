import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { HeroContainer, SliderImage, StyledSlider } from './styles'

class Hero extends Component {
    render() {
        const { portfolioReturn, statistics } = this.props
        const title = (<Typography>A <span>better</span> way to <span>invest</span></Typography>)
        const subtitles = (
            <div id="subtitles">
                <Typography type="display1">Achieve your goals</Typography>
                <Typography type="display1">+{Math.floor(portfolioReturn)}% capital growth since 2009</Typography>
                <Typography type="display1">Less risk</Typography>
                <Typography type="display1">Easy to use</Typography>
                <Typography type="display1">Lower costs</Typography>
                <Typography type="display1">+{statistics.winRate}% win ratio</Typography>
            </div>
        )

        const slickSettings = {
            focusOnSelect: false,
            infinite: true,
            fade: true,
            speed: 1500,
            autoplay: true,
            swipe: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        return (
            <HeroContainer>
                <div>
                    <div>
                        {title}
                        <span id="subtitle" />
                        {subtitles}
                    </div>
                </div>
                <div className="overlay" />
                <StyledSlider {...slickSettings} ref={this.slider}>
                    <SliderImage image="/static/images/achieveGoals.jpg" />
                    <SliderImage image="/static/images/speedster.jpg" />
                    <SliderImage image="/static/images/net.jpg" />
                    <SliderImage image="/static/images/boat.jpg" />
                    <SliderImage image="/static/images/family.jpg" />
                    <SliderImage image="/static/images/target.jpg" />
                </StyledSlider>
            </HeroContainer>
        )
    }
}

Hero.defaultProps = {
    statistics: {
        winRate: 89,
    },
}

Hero.propTypes = {
    portfolioReturn: PropTypes.number.isRequired,
    statistics: PropTypes.object,
}

export default Hero
