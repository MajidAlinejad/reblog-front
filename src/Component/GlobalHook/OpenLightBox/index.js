import React from "react";
import { useLightbox } from "simple-react-lightbox";
import { FullscreenOutlined } from "@ant-design/icons";

/*
We can use the provided hook in case you want
to open the lightbox from a button or anything :)
*/

const OpenLightBox = props => {
  const { openLightbox } = useLightbox();

  return (
    <FullscreenOutlined
      className="bigger-btn"
      onClick={() => openLightbox(props.imageToOpen)}
    />
  );
};

export default OpenLightBox;
