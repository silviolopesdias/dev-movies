import React from "react";
import PropTypes from 'prop-types'
import { ButtonRed, ButtonWhite } from './styles'

function Button({ children, red }) {


    return (
        <>{red ? (
        <ButtonRed>{children}</ButtonRed>) : (
        <ButtonWhite>{children}</ButtonWhite>
        )}

        </>
    )
}

export default Button


Button.propTypes = {
    children: PropTypes.string,
}

Button.propTypes = {
    red: PropTypes.bool
    
}