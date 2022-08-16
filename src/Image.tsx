import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "./api/api";

export function Image() {
  const [dataImage, setDataImage] = useState({}) as any;
  const { id } = useParams();

  const getImage = async () => {
    await api.get(`/images/image/${id}`).then((response) => {      
      setDataImage(response.data);
    });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      <div>EIS A FOTO</div>
      <br />
      {
        <div key={dataImage.id}>
          <img
            src={`data:${dataImage.fileExtension};base64,${dataImage.file}`}
            style={{ borderRadius: 100 }}
            width="200"
          />
        </div>
      }
    </>
  );
}
