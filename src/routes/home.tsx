import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Context } from '../context';
import Marquee from 'react-fast-marquee';
import HomeBannerBackground from '../assets/home-banner-background.png';
import SecondaryBannerBackground from '../assets/secondary-banner-background.png';

const toRotateText = [
  'Educational teaching resources.',
  'Dynamic, curriculum-aligned video content.',
  'Check out our latest videos!',
];

export function Home() {
  const [text, setText] = useState<string>('');
  const navigate = useNavigate();
  const { videos } = useContext(Context);

  const period = 2000;

  const loopNum = useRef<number>(0);
  const isDeleting = useRef<boolean>(false);
  const delta = useRef<number>(300 - Math.random() * 100);

  const tick = useCallback(() => {
    let i = loopNum.current % toRotateText.length;
    let fullText = toRotateText[i];
    let updatedText = isDeleting.current
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting.current) {
      delta.current /= 1.9;
    }

    if (!isDeleting.current && updatedText === fullText) {
      isDeleting.current = true;
      delta.current = period;
    } else if (isDeleting.current && updatedText === '') {
      isDeleting.current = false;
      loopNum.current++;
      delta.current = 400;
    } else if (!isDeleting.current && updatedText !== '') {
      delta.current = 50;
    }
  }, [text]);

  const handleOnClickToPlaylists = () => {
    navigate('/playlists');
  };
  const handleOnClickToVideos = () => {
    navigate('/videos');
  };

  useEffect(() => {
    const ticker = setInterval(tick, delta.current);
    return () => clearInterval(ticker);
  }, [tick]);

  console.log(text)

  return (
    <main className="home-container">
      <div className="home-banner-image-container">
        <img src={HomeBannerBackground} alt="Background" />
      </div>
      <div>
        <h1>Welcome to ClickView</h1>

        <p>
          <span className="txt-rotate">
            <span className="wrap">{text}</span>
          </span>
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quasi
          sequi officia porro esse repellendus suscipit praesentium eos. Ullam
          quos eius doloremque totam eos ab deserunt pariatur soluta velit
          itaque? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Animi vero tempore obcaecati sit! Veritatis totam odio, atque facere
          voluptatibus incidunt, doloremque possimus inventore voluptate alias,
          deserunt quaerat non esse officiis?
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem vero
          iure fugiat possimus, labore repellendus ea velit neque modi similique
          harum quis in dolorem impedit quisquam nemo molestiae ducimus
          incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Odit optio omnis laudantium perspiciatis harum, repudiandae mollitia
          totam explicabo dignissimos nam unde eum aperiam quisquam eveniet
          libero asperiores consequatur molestias sunt?
        </p>
        <div className="button-group">
          <button
            type="button"
            onClick={handleOnClickToPlaylists}
            className="btn-basic btn-bd-primary"
          >
            Go to playlist
          </button>
          <button
            type="button"
            onClick={handleOnClickToVideos}
            className="btn-basic btn-bd-secondary"
          >
            See all videos
          </button>
        </div>
      </div>

      <Marquee pauseOnHover className="marquee">
        {videos.map((video) => (
          <Image
            key={video.id}
            fluid
            rounded
            src={`${video.thumbnail}?size=small`}
            alt={video.name}
            className="w-75"
          />
        ))}
      </Marquee>
    </main>
  );
}
