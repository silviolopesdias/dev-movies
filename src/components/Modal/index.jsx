import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { Container, Background } from './styles'
import { getMovieModal } from '../../services/getData.js'


function Modal({ movieId, setShowModal }) {
    const [movie, setMovie] = useState()


    useEffect(() => {
        async function getMovies() {

            setMovie(await getMovieModal(movieId))

        }
        getMovies()

    }, [])



    return (

        <Background onClick={() => setShowModal(false)}>
            {movie && (
                <Container>

                    <iframe src={`https://www.youtube.com/embed/${movie.key}`}
                        title="Youtube Video Player"
                        height="500px"
                        width="100%"

                    ></iframe>

                </Container>
            )}
        </Background>
    )
}

export default Modal


Modal.propTypes = {
    movieId: PropTypes.number,
}
Modal.propTypes = {
    setShowModal: PropTypes.func,
}
