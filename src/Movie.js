import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import CommonStyle from './style/Global';
import { BsX, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import MovieSlide from 'react-slick';
import 'slick-carousel/slick/slick.css';

// style 시작

const Wrapper = styled.div`
background: #212529;
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
min-height: 25%;
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

display: grid;
grid-template-columns: repeat(2, 1fr);
background: #020e32;
color: #fff;

width: 800px;
`

const MoviePopupIMG = styled.img`
width: 100%;
`

const MoviePopupDesc = styled.div`
position: relative;
display: flex;
flex-direction: column;
padding: 50px;

overflow: hidden;
`

const MoviePopupDescTitle = styled.div`
font-size: 20px;
font-weight: 700;
margin: 0 0 10px 0;
`
const MoviePopupDescfull = styled.p`
font-size: 14px;
font-weight: 300;
line-height: 1.3;
`
const MoviePopupDescyear = styled.p`
margin: auto 0 10px 0;
font-size: 14px;
font-weight: 300;

`
const MoviePopupDescgenres = styled.ul`
font-size: 14px;
font-weight: 500;

display: flex;
flex-wrap: wrap;
gap: 10px;
`
const Genres = styled.li`
`

const MovieDetailClose = styled.span`
position: absolute;
inset: 0 0 auto auto;
font-size: 30px;
background: #999;
padding: 5px;
`

const MovieSldieWrapper = styled.div`
position: relative;
color: #fff;
margin: 0 0 30px 0;
`

const MovieSlideLeftArrow = styled.div`
position: absolute;
inset: 50% auto auto 0;
transform: translate(0, -50%);

font-size:30px;
padding: 15px;
background: rgba(0,0,0,0.5);
`
const MovieSlideRightArrow = styled.div`
position: absolute;
inset: 50% 0 auto auto;
transform: translate(0, -50%);

font-size:30px;
padding: 15px;
background: rgba(0,0,0,0.5);
`


const InputResult = styled.div`
margin: 20px 30px;
display: flex;
flex-wrap: wrap;
gap: 20px;
justify-content: center;
color: #ddd;
font-size: 13px;
font-weight: 300;
`

// style 끝


const DetailMovie = ({ movie, on, setOn }) => {
    const { id } = useParams();
    // 1 === '1'
    const detailMovie = movie.find(it => String(it.id) === id);
    const cover = useRef();
    //https://stackoverflow.com/questions/65455975/using-useref-addeventlistener 참조
    // Useref는 rerender를 트리거하지 않고 useEffect 이전에 바인딩된 ref 객체입니다. 요소 없이 el.current를 사용하십시오.
    const scrollHandler = e => {
        e.preventDefault()
    }
    useEffect(() => {
        if (cover.current) {
            cover.current.addEventListener('wheel', scrollHandler);
            // return () => {
            //     cover.current.removeEventListener("scroll", scrollHandler);
            // };
        }
    }, [cover.current]);

    return (
        <>
            {
                detailMovie && on &&
                <MoviePopupWrapper
                    // onClick={() => setOn(false)}
                    // onWheel={wheelStop}
                    ref={cover}
                >
                    <MoviePopup>
                        <div>
                            <MoviePopupIMG src={detailMovie.large_cover_image} alt="" />
                        </div>
                        <MoviePopupDesc>
                            <MoviePopupDescTitle>{detailMovie.title}</MoviePopupDescTitle>
                            <MoviePopupDescfull>{detailMovie.description_full.substr(0, 400)}</MoviePopupDescfull>
                            <MoviePopupDescyear>{detailMovie.year}</MoviePopupDescyear>
                            <MoviePopupDescgenres>
                                {
                                    detailMovie.genres?.map((it, idx) => {
                                        return <Genres key={idx}>{it}</Genres>
                                    })
                                }
                            </MoviePopupDescgenres>
                            <MovieDetailClose onClick={() => setOn(false)}><BsX /></MovieDetailClose>
                        </MoviePopupDesc>
                    </MoviePopup>
                </MoviePopupWrapper>
            }
        </>
    )
}

const SearchMovie = ({ search, on, setOn }) => {
    const { id } = useParams();
    // 1 === '1'
    const detailMovie = search?.find(it => String(it.id) === id);
    const cover = useRef();
    //https://stackoverflow.com/questions/65455975/using-useref-addeventlistener 참조
    // Useref는 rerender를 트리거하지 않고 useEffect 이전에 바인딩된 ref 객체입니다. 요소 없이 el.current를 사용하십시오.
    const scrollHandler = e => {
        e.preventDefault()
    }
    useEffect(() => {
        if (cover.current) {
            cover.current.addEventListener('wheel', scrollHandler);
            // return () => {
            //     cover.current.removeEventListener("scroll", scrollHandler);
            // };
        }
    }, [cover.current]);
    return (
        <>
            {
                detailMovie && on &&
                <MoviePopupWrapper
                    ref={cover}
                >
                    <MoviePopup>
                        <div>
                            <img src={detailMovie.large_cover_image} alt="" />
                        </div>
                        <MoviePopupDesc>
                            <MoviePopupDescTitle>{detailMovie.title}</MoviePopupDescTitle>
                            <MoviePopupDescfull>{detailMovie.description_full.substr(0, 400)}</MoviePopupDescfull>
                            <MoviePopupDescyear>{detailMovie.year}</MoviePopupDescyear>
                            <MoviePopupDescgenres>
                                {
                                    detailMovie.genres?.map((it, idx) => {
                                        return <Genres key={idx}>{it}</Genres>
                                    })
                                }
                            </MoviePopupDescgenres>
                            <MovieDetailClose onClick={() => setOn(false)}><BsX /></MovieDetailClose>
                        </MoviePopupDesc>
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
    const [search, setSearch] = useState([]);
    const [inputList, setInputList] = useState(null);
    const [input, setInput] = useState('');

    const MainSlide = useRef(null);
    const inputRef = useRef(null);


    const limit = 48; // 50 이하만 가능
    const pageLimit = 10;
    const listtotal = Array.from({ length: parseInt(movieList.movie_count / limit) })

    const getMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${pageNum}`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies)
    }

    const searchMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${inputList}`);
        setSearch(r.data.data.movies)
    }

    useEffect(() => {
        getMovie()
    }, [pageNum])

    useEffect(() => {
        searchMovie()
    }, [inputList])


    { console.log(movie, movieList) }

    const MainSlideOption = {
        slidesToShow: 7,
        arrows: false,
    }

    const searchHandler = e => {
        e.preventDefault();
        if (input.length < 3) {
            alert('더 입력하세요...');
            setInput('');
            inputRef.current.focus();
            return
        }
        setInputList(input);
        console.log(inputList)
    }
    return (
        <Wrapper>
            <CommonStyle />
            <Header>
                <H1>hee's Movie</H1>
                <MainTitle>It is a site that collects my favorite movies. Enjoy it.</MainTitle>
                <form onSubmit={searchHandler}>
                    <Input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        ref={inputRef}
                    /><Button>SEARCH</Button>
                </form>
                <InputResult>
                    {
                        search &&
                        search.map(it => {
                            return (
                                <Link to={`/search/${it.id}`}
                                    onClick={() => setOn(true)}
                                    key={it.id}>
                                    {it.title}
                                </Link>
                            )
                        })
                    }
                </InputResult>
            </Header>

            {/* MovieSlide */}
            <MovieSldieWrapper>
                <MovieSlide {...MainSlideOption} ref={MainSlide}>
                    {
                        movie.map((it, idx) => {
                            return (
                                <GridItm key={it.id} onClick={() => setOn(true)}>
                                    <Link to={`/detail/${it.id}`}>
                                        <IMG src={it.large_cover_image} alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`} />
                                        <Title>{it.title_long}</Title>
                                        {
                                            it.summary.length > 10 &&
                                            <Desc>
                                                {it.summary.substr(0, 100)}
                                                {it.summary.length > 100 ? '...' : ''}
                                            </Desc>
                                        }
                                    </Link>
                                </GridItm>
                            )

                        })
                    }
                </MovieSlide>
                <MovieSlideLeftArrow onClick={() => MainSlide.current.slickPrev()}><BsArrowLeft /></MovieSlideLeftArrow>
                <MovieSlideRightArrow onClick={() => MainSlide.current.slickNext()}> <BsArrowRight /></MovieSlideRightArrow>
            </MovieSldieWrapper>

            <Routes>
                <Route path='/' element={null} />
                <Route path='/detail/:id' element={<DetailMovie movie={movie} on={on} setOn={setOn} />} />
                <Route path='/search/:id' element={<SearchMovie search={search} on={on} setOn={setOn} />} />
            </Routes>


            <ListBtnWrapper>
                {
                    list > 1 &&
                    <ListBtn onClick={() => setList(list - pageLimit)}>PREV</ListBtn>
                }
                {
                    listtotal.map((_, idx) => {
                        return <ListBtn onClick={() => setpageNum(idx + 1)} key={idx}>{idx + 1}</ListBtn>
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
                                            it.summary.length > 10 &&
                                            <Desc>
                                                {it.summary.substr(0, 100)}
                                                {it.summary.length > 100 ? '...' : ''}
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