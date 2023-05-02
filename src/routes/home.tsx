import HomeBannerBackground from '../assets/home-banner-background.png';
import SecondaryBannerBackground from '../assets/secondary-banner-background.png';

export function Home() {
  console.log('Home');
  return (
    <main>
      <h1>Home</h1>

      <div className="home-banner-image-container">
        <img src={HomeBannerBackground} alt="Background" />
      </div>

      {/* <div className="about-section-image-container">
        <img src={SecondaryBannerBackground} alt="" />
      </div> */}
    </main>
  );
}
