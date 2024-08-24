import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Background, Info, Poster, Container, ContainerButtons } from "./styles"
import Button from "../../components/Button"
import Slider from "../../components/Slider"
import { getImages } from '../../utils/getImages'
import Modal from "../../components/Modal"
import { getMovies, getPopularSeries, getTopMovies, getTopPeoples, getTopSeries } from "../../services/getData"



function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [PopularSeries, setPopularSeries] = useState()
    const [topPeoples, setTopPeoples] = useState()
    const navegate = useNavigate()


    useEffect(() => {

        async function getAllData() {

            setMovie(await getMovies())
            setTopMovies(await getTopMovies())
            setTopSeries(await getTopSeries())
            setPopularSeries(await getPopularSeries())
            setTopPeoples(await getTopPeoples())

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
            {topSeries && <Slider info={topSeries} title={'Top Series'} />}
            {PopularSeries && <Slider info={PopularSeries} title={'Séries Populares'} />}
            {topPeoples && <Slider info={topPeoples} title={'top Artistas'} />}
        </>
    )
}

export default Home