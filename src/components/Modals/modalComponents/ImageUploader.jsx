import React, { useState, useRef, useEffect } from "react";
import style from "../../../Styles/imageDropzone.module.css";
import { GrCloudUpload } from "react-icons/gr";
const ImageUploader = ({ image, setState }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [showInstruction, setShowInstruction] = useState(true);
  const fileInputRef = useRef(null);
  useEffect(() => {
    setImagePreview(image?.img);
  }, [image]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        image.image = reader?.result;
      };
      reader.readAsDataURL(file);
      setShowInstruction(false);
      setState(file);
    } else {
      setState({});
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        // setState(reader.result);
        image.image = reader.result;
      };
      reader.readAsDataURL(file);
      setShowInstruction(false);
      setState(file);
    } else {
      setState({});
    }
  };
  const highlightDropzone = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add("highlight");
  };
  const unhighlightDropzone = (event) => {
    event.currentTarget.classList.remove("highlight");
  };
  const handleOverlayClick = (event) => {
    event.stopPropagation();
    fileInputRef.current.click();
  };
  return (
    <div className={style.dropzone}>
      <div
        className={style["dropzone-overlay"]}
        onClick={handleOverlayClick}
        onDragOver={highlightDropzone}
        onDragLeave={unhighlightDropzone}
        onDrop={handleDrop}></div>
      {imagePreview ? (
        <img src={imagePreview} alt="Item Preview" className={style.preview} />
      ) : (
        <>
          {showInstruction ? (
            <div className={style.instruction}>
              <GrCloudUpload className={style.icon} />
              <p className={style.text}>Drop or Click to upload</p>
            </div>
          ) : (
            ""
          )}
        </>
      )}{" "}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className={style["file-input"]}
      />
    </div>
  );
};
export default ImageUploader;