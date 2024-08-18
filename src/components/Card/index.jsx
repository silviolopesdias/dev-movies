import React from "react";
import { getImages } from "../../utils/getImages";
import PropTypes from 'prop-types'
import { Container } from './styles'

function Card({ item }) {


    return (
      
        <Container>
             <img src={getImages(item.poster_path || item.profile_path || '')} />
             <h3>{item.title || item.name}</h3>
        </Container>

    )
}

export default Card

Card.propTypes = {
    item: PropTypes.string,
}