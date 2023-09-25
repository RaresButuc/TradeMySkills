import Ads from "../components/Ads";
import logoMap from "../photo/icons/MapPointer.png";
import logoMoney from "../photo/icons/PayMoney.png";
import Filter from "../components/Filter";
import Category from "../components/Category";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdsPageOnCategory(adsLink) {
  //   const params = useParams();
  //   const [ads, setAds] = useState([]);

  //   useEffect(() => {
  //     const fetchAds = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:8080/category/" + params.category);
  //         const data = response.data;
  //         setAds(data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchAds();
  //   }, []);

  //   const writeAWordWithoutFullUppercase = (adCategory) => {
  //     return adCategory.charAt(0).toUpperCase() + adCategory.slice(1).toLowerCase();
  //   };

  //   return (
  //     <div>
  //       <Category />
  //       <Filter />
  //       <div>
  //       <div className="container-xl">
  //         <div className="row">
  //           {ads &&
  //             ads.map((ad, index) => (
  //               <div
  //                 className="card mt-4 col-md-3 mx-auto"
  //                 style={{ width: "18rem" }}
  //                 key={index}
  //               >
  //                 <div className="card-header fw-bold">
  //                   {writeAWordWithoutFullUppercase(ad.typeOfAd.nameOfCategory)}
  //                 </div>
  //                 <div className="card-body">
  //                   <a
  //                     className="h5 card-title mb-4 text-decoration-none"
  //                     href="***"
  //                   >
  //                     {ad.name}
  //                   </a>
  //                   {/* Interior Elements */}
  //                   <div className="container">
  //                     <div className="row">
  //                       <div className="col-sm">
  //                         <h5 className="card-title text-start fw-bold">
  //                           <img
  //                             src={logoMap}
  //                             alt="Location"
  //                             className="mb-1 ms-2"
  //                             style={{ width: 45 }}
  //                           />
  //                           {ad.location}
  //                         </h5>
  //                       </div>
  //                       <div className="col-sm">
  //                         <h5 className="card-title text-end  fw-bold">
  //                           <img
  //                             src={logoMoney}
  //                             alt="Price"
  //                             className="mb-1"
  //                             style={{ width: 45 }}
  //                           />
  //                           <br></br>
  //                           {ad.price}
  //                         </h5>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //     </div>
  //   );
  const params = useParams();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/category/" + params.category
        );
        const data = response.data;
        setAds(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAds();
  }, [params.category]);

  return (
    <div>
      <Category />
      <Filter />
      <Ads ads={ads} /> {/* Pass the ads data as a prop to the Ads component */}
    </div>
  );
}
