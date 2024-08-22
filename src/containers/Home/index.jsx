import React from "react"
import { useState, useEffect } from "react"
import api from "../../services/api"
import { Background, Info, Poster, Container, ContainerButtons } from "./styles"
import Button from "../../components/Button"
import Slider from "../../components/Slider"
import { getImages } from '../../utils/getImages'
import Modal from "../../components/Modal"


function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [PopularSeries, setPopularSeries] = useState()
    const [topPeoples, setTopPeoples] = useState()
    useEffect(() => {

        async function getMovies() {

            const { data: { results } } = await api.get('/movie/popular')

            setMovie(results[1])

        }

        async function getTopMovies() {

            const { data: { results } } = await api.get('/movie/top_rated')


            setTopMovies(results)

        }

        async function getTopSeries() {

            const { data: { results } } = await api.get('/tv/top_rated')


            setTopSeries(results)


        }
        async function getPopularSeries() {

            const { data: { results } } = await api.get('/tv/popular')


            setPopularSeries(results)

        }

        async function getTopPeoples() {

            const { data: { results } } = await api.get('/person/popular')


            setTopPeoples(results)
        }

        getMovies()
        getTopMovies()
        getTopSeries()
        getPopularSeries()
        getTopPeoples()

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
                                <Button red={true}>Assista Agora</Button>
                                <Button onClick={()=> setShowModal(true)}>Assista o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img alt="capa-do-filme" src={getImages(movie.poster_path)} />
                        </Poster>
                    </Container>
                </Background>
            )}
            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
            {topSeries && <Slider info={topSeries} title={'Top Series'} />}
            {PopularSeries && <Slider info={PopularSeries} title={'Séries Populares'} />}
            {topPeoples && <Slider info={topPeoples} title={'top Artistas'} />}
        </>
    )
}

export default Home