import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdDetail() {
  const { id } = useParams();
  const [adInfos, setAdInfos] = useState(null);

  useEffect(() => {
    const getAdById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`);
        const data = response.data;
        console.log(data);
        setAdInfos(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdById();
  }, []);

  return (
    <>
          <h1>{adInfos?.name}</h1>
          <h1>{adInfos?.user.name}</h1>
    </>
  );
}
