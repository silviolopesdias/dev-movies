import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Background, Info, Poster, Container, ContainerButtons } from "./styles"
import Button from "../../components/Button"
import Slider from "../../components/Slider"
import { getImages } from '../../utils/getImages'
import Modal from "../../components/Modal"
import { getMovies,  getTopMovies, getTopPeoples,} from "../../services/getData"



function Movie() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()   
    const [topPeoples, setTopPeoples] = useState()
    const navegate = useNavigate()


    useEffect(() => {
        

        async function getAllData() {

            Promise.all([
                getMovies(),
                getTopMovies(),               
                getTopPeoples()
            ])
            .then(([movie, topMovies,  topPeople]) => {
              
            setMovie(movie)
            setTopMovies(topMovies)           
            setTopPeoples(topPeople)

            })
            .catch((error) => console.error(error))
         

        }

    getAllData()

    }, [])

    return (

        <>
            {movie && (

                <Background img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red={true} onClick={() => navegate(`/detalhe/${movie.id}`)}>Assista Agora</Button>
                                <Button onClick={() => setShowModal(true)}>Assista o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img alt="capa-do-filme" src={getImages(movie.poster_path)} />
                        </Poster>
                    </Container>
                </Background>
            )}
            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}            
            {topPeoples && <Slider info={topPeoples} title={'top Artistas'} />}
        </>
    )
}

export default Movie