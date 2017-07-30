import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { HeroContainer, Content, SliderImage, StyledSlider, Overlay, Bold } from './styles'

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

const title = (
    <Typography type="title">A <Bold>better</Bold> way to <Bold>invest</Bold></Typography>
)

const renderSubtitles = (portfolioReturn, statistics) => (
    <div id="subtitles">
        <Typography type="subheading">Achieve your goals</Typography>
        <Typography type="subheading">+{Math.floor(portfolioReturn)}% capital growth since 2009</Typography>
        <Typography type="subheading">Less risk</Typography>
        <Typography type="subheading">Easy to use</Typography>
        <Typography type="subheading">Lower costs</Typography>
        <Typography type="subheading">+{statistics.winRate}% win ratio</Typography>
    </div>
)

const Hero = ({ portfolioReturn, statistics }) => (
    <HeroContainer>
        <Content>
            <div>
                {title}
                <span id="subtitle" />
                {renderSubtitles(portfolioReturn, statistics)}
            </div>
        </Content>
        <Overlay />
        <StyledSlider {...slickSettings}>
            <SliderImage data-image="/static/images/achieveGoals.jpg" />
            <SliderImage data-image="/static/images/speedster.jpg" />
            <SliderImage data-image="/static/images/net.jpg" />
            <SliderImage data-image="/static/images/boat.jpg" />
            <SliderImage data-image="/static/images/family.jpg" />
            <SliderImage data-image="/static/images/target.jpg" />
        </StyledSlider>
    </HeroContainer>
)

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
