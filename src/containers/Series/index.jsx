import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Background, Info, Poster, Container, ContainerButtons } from "./styles"
import Button from "../../components/Button"
import Slider from "../../components/Slider"
import { getImages } from '../../utils/getImages'
import Modal from "../../components/Modal"
import { getMovies, getPopularSeries, getTopPeoples, getTopSeries } from "../../services/getData"



function Series() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()    
    const [topSeries, setTopSeries] = useState()
    const [PopularSeries, setPopularSeries] = useState()
    const [topPeoples, setTopPeoples] = useState()
   
    const navegate = useNavigate()


    useEffect(() => {
        

        async function getAllData() {

            Promise.all([
                getMovies(),                
                getTopSeries(),
                getPopularSeries(),
                getTopPeoples(),
              
            ])
            .then(([movie, topSeries, popularSeries, topPeople]) => {
             
            setMovie(movie)         
            setTopSeries(topSeries)
            setPopularSeries(popularSeries)
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
            
            {topSeries && <Slider info={topSeries} title={'Top Series'} />}
            {PopularSeries && <Slider info={PopularSeries} title={'Séries Populares'} />}
            {topPeoples && <Slider info={topPeoples} title={'top Artistas'} />}
        </>
    )
}

export default Series