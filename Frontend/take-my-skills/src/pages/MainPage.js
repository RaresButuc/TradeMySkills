import videoBg from "../video/-60.mp4";

export default function MainPage() {
  return (
    <div className="homePage">
      <video src={videoBg} autoPlay loop muted />
      {/* <h2 className="slogan">"Every Service at Your Fingertips."</h2> */}
      <h1 className="slogan">Every Service Is NOW More Accesible Than Ever</h1>
      <button  className="post-offer" > <a className="post-a" href="/post-offer">Post Your Ads Now FOR FREE</a> </button>
    </div>
  );
}
