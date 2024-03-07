export default function Map({ lat, lon }) {

  const generateMapURL = () => {

      return `https://www.bing.com/maps/embed/viewer.aspx?v=3&cp=${lat}~${lon}&lvl=12&w=400&h=200&credentials=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu&form=BMEMJS`;
  };

  return (
    <iframe
      className="mb-3 "
      width="400"
      height="200"
      src={generateMapURL()}
      frameborder="0"
    />
  );
}
