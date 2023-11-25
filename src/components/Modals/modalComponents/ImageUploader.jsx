import React, { useState, useRef } from "react";
import style from "../../../Styles/imageDropzone.module.css";
import { GrCloudUpload } from "react-icons/gr";

const ImageUploader = ({ initialImage, onImageChange }) => {
    const [imagePreview, setImagePreview] = useState(initialImage);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                onImageChange(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOverlayClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={style.dropzone}>
            <div
                className={style["dropzone-overlay"]}
                onClick={handleOverlayClick}
            ></div>
            {imagePreview ? (
                <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    className={style.preview}
                />
            ) : (
                <div className={style.instruction}>
                    <GrCloudUpload className={style.icon} />
                    <p className={style.text}>Drop or Click to upload</p>
                </div>
            )}
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
