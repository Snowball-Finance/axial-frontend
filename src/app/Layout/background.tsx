import styled from "@emotion/styled";
import bg from "./components/clouds3-min.png";
import twin from "./components/twinkling.png";
import stars from "./components/stars.png";

export const Background = () => {
  return (
    <Wrapper>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
    </Wrapper>
  );
};
const Wrapper = styled("div")`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;

  @keyframes move-twink-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -10000px 5000px;
    }
  }
  @-webkit-keyframes move-twink-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -10000px 5000px;
    }
  }
  @-moz-keyframes move-twink-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -10000px 5000px;
    }
  }
  @-ms-keyframes move-twink-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -10000px 5000px;
    }
  }

  @keyframes move-clouds-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 10000px 0;
    }
  }
  @-webkit-keyframes move-clouds-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 10000px 0;
    }
  }
  @-moz-keyframes move-clouds-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 10000px 0;
    }
  }
  @-ms-keyframes move-clouds-back {
    from {
      background-position: 0;
    }
    to {
      background-position: 10000px 0;
    }
  }

  .stars,
  .twinkling,
  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .stars {
    background: #000 url(${stars}) repeat top center;
    z-index: 0;
  }

  .twinkling {
    background: transparent url(${twin}) repeat top center;
    z-index: 1;
    -moz-animation: move-twink-back 200s linear infinite;
    -ms-animation: move-twink-back 200s linear infinite;
    -o-animation: move-twink-back 200s linear infinite;
    -webkit-animation: move-twink-back 200s linear infinite;
    animation: move-twink-back 200s linear infinite;
  }

  .clouds {
    background: transparent url(${bg}) repeat top center;
    z-index: 3;
    -moz-animation: move-clouds-back 500s linear infinite;
    -ms-animation: move-clouds-back 500s linear infinite;
    -o-animation: move-clouds-back 500s linear infinite;
    -webkit-animation: move-clouds-back 500s linear infinite;
    animation: move-clouds-back 500s linear infinite;
  }
`;
