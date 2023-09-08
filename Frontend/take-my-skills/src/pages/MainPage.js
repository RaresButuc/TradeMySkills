import videoBg from "../video/-60.mp4";

export default function MainPage() {

    return (
        <div className="homePage">
        <video src={videoBg} autoPlay loop muted/>    
        <h2 className="slogan">"Every Service at Your Fingertips."</h2>
        </div>
    )
}
