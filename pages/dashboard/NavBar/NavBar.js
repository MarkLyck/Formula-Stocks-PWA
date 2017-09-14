import React from 'react'
import Button from 'material-ui/Button'
import Logo from './logo_horizontal.svg'
import { Bar } from './styles'

export default () => (
    <Bar>
        <div>
            <Button color="primary" onClick={() => {}}>Entry</Button>
            <Button color="primary" onClick={() => {}}>Premium</Button>
            <Button color="primary" onClick={() => {}}>Business</Button>
            <Button color="primary" onClick={() => {}}>Fund</Button>
        </div>
        <Logo />
    </Bar>
)
