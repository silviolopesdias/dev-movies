import React from "react"
import { useState, useEffect } from "react"
import api from "../../services/api"
import { Background, Info, Poster, Container, ContainerButtons } from "./styles"
import Button from "../../components/Button"
import Slider from "../../components/Slider"


function Home() {
    const [movie, setMovie] = useState()
    const [topmovies, setTopMovies] = useState()

    useEffect(() => {

        async function getMovies() {

            const { data: { results } } = await api.get('/movie/popular')

            setMovie(results[1])

        }

        async function getTopMovies() {

            const { data: { results } } = await api.get('/movie/top_rated')

             
            setTopMovies(results)


        }

        getMovies()
        getTopMovies()


    }, [])

    return (

        <>
            {movie && (

                <Background img={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}>
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red={true}>Assista Agora</Button>
                                <Button red={false}>Assista o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img alt="capa-do-filme" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                        </Poster>
                    </Container>
                </Background>
            )}
           {topmovies && <Slider info={topmovies} title={'Top Filmes'}/>}
        </>
    )
}

export default Home