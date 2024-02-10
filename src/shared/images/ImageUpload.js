import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import "./imageUpload.css";

function ImageUpload(props) {
  const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (e) => {
    let pickedFileUrl;

    if (e.target.files && e.target.files.length === 1) {
      pickedFileUrl = e.target.files[0];
      setFile(pickedFileUrl);
    }

    const { setFormInputs, formInputs } = props;
    setFormInputs({ ...formInputs, image: pickedFileUrl });
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div>
      <input
        type="file"
        name="image"
        ref={filePickerRef}
        style={{ display: "none" }}
        onChange={pickHandler}
        accept=".jpg, .png, .jpeg"
      />
      <div className="image-upload"></div>
      <div className="image-upload__preview">
        <img src={previewUrl} alt="preview" />
      </div>
      <Button type="button" onClickHander={pickImageHandler}>
        PICK IMAGE
      </Button>
    </div>
  );
}

export default ImageUpload;
