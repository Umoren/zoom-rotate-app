import "./styles.css";
import ImageZoom from "react-image-zooom";
import { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [imageURL, setImageURL] = useState();
  const [rotateValue, setRotateValue] = useState(0);

  const rotateImages = () => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: "sammy365"
      }
    });
    const rotateImg = cld
      .image("cld-sample-5.jpg")
      .rotate(byAngle(rotateValue));
    setImageURL(rotateImg.toURL());
  };

  const baseURL = "https://res.cloudinary.com/sammy365/image";

  const getImages = async () => {
    const res = await fetch(
      "https://res.cloudinary.com/sammy365/image/list/animals.json"
    );
    const data = await res.json();
    setImageData(data);
  };

  useEffect(() => {
    getImages();
    rotateImages();
  });

  return (
    <div className="App">
      <h1>Zoom and Rotate Images in React.js</h1>
      <div className="gallery">
        {imageData &&
          imageData.resources.map((item) => {
            const { format, public_id, version, type } = item;
            return (
              <div key={version} className="gallery-img">
                <ImageZoom
                  src={`${baseURL}/${type}/v${version}/${public_id}.${format}`}
                  alt="Zoom-images"
                  zoom="300"
                />
              </div>
            );
          })}
      </div>
      <div className="rotate">
        <img src={imageURL} alt="snow-boy" width={500} height={500} />
        <div className="controls m-3">
          <button
            onClick={() => setRotateValue(rotateValue - 90)}
            className="m-1 btn-primary"
          >
            <BsArrowCounterclockwise />
          </button>

          <button
            onClick={() => setRotateValue(rotateValue + 90)}
            className="m-1 btn-primary"
          >
            <BsArrowClockwise />
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
