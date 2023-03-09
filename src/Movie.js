import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import CommonStyle from './style/Global';

// style

const Wrapper = styled.div`
background: #474544;
`

const MovieListWrapper = styled.section`
padding: 100px 0;
`

const Inner = styled.div`
width:1600px;
margin: 0 auto;
`

const GridLayout = styled.ul`
display: grid;
grid-template-columns: repeat(6, 1fr);
gap: 10px;
`

const GridItm = styled.li`
position: relative;
`

const IMG = styled.img`
`

const Title = styled.strong`
position: absolute;
top: 20px;
left: 20px;
right: 20px;
color: #fff;
text-shadow: 1px 1px 3px #111;
`
const Desc = styled.span`
position: absolute;
bottom: 0;
left: 0;
right: 0;
color: #fff;
background: rgba(0, 0, 0, 0.5);
padding: 20px;
font-size: 14px;
min-height: 40%;
`

const Header = styled.header`
padding: 50px 0;
text-align: center;
`

const H1 = styled.h1`
font-size: 100px;
font-weight: 900;
color: #FFA556;
margin: 0 0 10px 0;
text-transform: uppercase;

`
const MainTitle = styled.p`
color: #fff;
margin: 0 0 30px 0;
font-size: 14px;
`
const Input = styled.input`
border: none;
outline: none;
border: 3px solid #111;
font-size: 14px;
padding: 5px;
width: 400px;
`
const Button = styled.button`
border: none;
background: #FFA556;
color: #fff;
padding: 8px;
margin: 0 0 0 10px;
`

const ListBtnWrapper = styled.div`
text-align: center;
`

const ListBtn = styled.button`
border: none;
padding: 3px 10px;
margin: 0 2px;
background: #FFA556;
border-radius: 5px;
cursor: pointer;
`
const MoviePopupWrapper = styled.div`
position: fixed;
inset: 0 0 0 0;
z-index: 9999;
background: rgba(0,0,0,0.5);
`

const MoviePopup = styled.div`
position: absolute;
inset: 50% auto auto 50%;
transform: translate(-50%, -50%);
`
//


const DetailMovie = ({ movie, on, setOn }) => {
    const { id } = useParams();
    const detailMovie = movie.find(it => it.id == id)

    // const wheelStop = e => {
    //     e.preventDefault();
    // }
    // const bg = useRef(null);
    // useEffect(() => {
    //     bg.current.addEventListener('wheel', wheelStop)
    // }, [id])

    // const wheelStop = e => {
    //     e.stopPropagation();
    //     return false;
    // }

    // const bg = useRef(null);

    // useEffect(() => {
    //     bg.current.addEventListener('wheel', wheelStop)
    // }, [id])

    return (
        <>
            {
                detailMovie && on &&
                <MoviePopupWrapper
                    onClick={() => setOn(false)}
                // onWheel={wheelStop}
                // ref={bg}
                >
                    <MoviePopup>
                        <img src={detailMovie.large_cover_image} alt="" />
                    </MoviePopup>
                </MoviePopupWrapper>
            }
        </>
    )
}
const Movie = () => {
    //영화 데이터 가져오기 = 데이터는 시간이 걸리는 일이므로 비동기식으로 처리
    //영화 데이터 그리기 = state(리액트가 그려줄 수 있게)

    const [movie, setMovie] = useState([]);
    const [movieList, setMovieList] = useState({});
    const [pageNum, setpageNum] = useState(0);
    const [list, setList] = useState(0);
    const [on, setOn] = useState(true);


    const limit = 48; // 50 이하만 가능
    const pageLimit = 10;
    const listtotal = Array.from({ length: parseInt(movieList.movie_count / limit) })

    const getMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${pageNum}`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies)
    }

    useEffect(() => {
        getMovie()
    }, [pageNum])



    { console.log(movie, movieList) }
    return (
        <Wrapper>
            <CommonStyle />
            <Header>
                <H1>hee's Movie</H1>
                <MainTitle>It is a site that collects my favorite movies. Enjoy it.</MainTitle>
                <form action="">
                    <Input type="text" /><Button>SEARCH</Button>
                </form>
            </Header>

            <Routes>
                <Route path='/' element={<null />} />
                <Route path='/detail/:id' element={<DetailMovie movie={movie} on={on} setOn={setOn} />} />
            </Routes>


            <ListBtnWrapper>
                {
                    list > 1 &&
                    <ListBtn onClick={() => setList(list - pageLimit)}>PREV</ListBtn>
                }
                {
                    listtotal.map((_, idx) => {
                        return <ListBtn onClick={() => setpageNum(idx + 1)}>{idx + 1}</ListBtn>
                    }).slice(list, list + pageLimit)
                }
                {
                    list < parseInt(movieList.movie_count / limit) - pageLimit &&
                    <ListBtn onClick={() => setList(list + pageLimit)}>NEXT</ListBtn>
                }
            </ListBtnWrapper>
            <MovieListWrapper>
                <Inner>
                    <GridLayout >
                        {movie.map((it, idx) => {
                            return (
                                <GridItm key={it.id} onClick={() => setOn(true)}>
                                    <Link to={`/detail/${it.id}`}>
                                        <IMG src={it.large_cover_image} alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`} />
                                        <Title>{it.title_long}</Title>
                                        {
                                            it.description_full.length > 10 &&
                                            <Desc>
                                                {it.description_full.substr(0, 200)}
                                                {it.description_full.length > 200 ? '...' : ''}
                                            </Desc>
                                        }
                                    </Link>
                                </GridItm>
                            )
                        })}
                    </GridLayout>
                </Inner>

            </MovieListWrapper>
        </Wrapper>
    )
}

export default Movie