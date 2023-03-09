import { createGlobalStyle } from "styled-components";


const Reset = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap');
* {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    /* padding 과 border를 포함해서 박스 사이즈가 늘어나는 것을 박스 안쪽으로 가둔다. */
    box-sizing: border-box;
}

*::before,
*::after {
    box-sizing: border-box;
}

ul,
ol,
li {
    list-style: none;
}

em,
i,
address {
    font-style: normal;
}

b,
strong {
    font-weight: normal;
}

a {
    text-decoration: none;
}

img {
    vertical-align: middle;
    max-width: 100%;
}

body {
    font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    line-height: 1;
    color: #444;
}
`

export default Reset;