import { useState } from "react";
import { api } from "./api/api";
import imagePreviewModel from "../public/avatar-null.jpg";
import { Link } from "react-router-dom";

interface IImage {
  image: any | undefined;
}
export function Initial() {
  const [image, setImage] = useState<IImage>();
  const [result, setResult] = useState("");
  const [id, setId] = useState();
  const [cssColor, setCssColor] = useState("#0000000");

  const register = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", image as any);
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await api
      .post(`/images/upload`, formData, headers)
      .then((res) => {
        console.log(res);
        setId(res.data.image.id);
        setCssColor("#008000");
        setResult(res.data.message);
      })
      .catch((error) => {
        setCssColor("#FF0000");
        setResult(error.response.data.message);
      });
  };

  return (
    <>
      <div className="App">
        {!result ? (
          ""
        ) : (
          <p
            style={{ background: `${cssColor}`, color: "white" }}
          >{`${result}`}</p>
        )}
        {image ? (
          <img
            src={URL.createObjectURL(image as any)}
            width="150"
            height="150"
            style={{ borderRadius: 100 }}
          />
        ) : (
          <img
            src={imagePreviewModel}
            width="150"
            style={{ borderRadius: 100 }}
          />
        )}
        <form
          className="form"
          method="post"
          onSubmit={register}
          encType="multipart/form-data"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-xl-12 col-sm-12 col-md-12 jumbotron">
                <div className="form-row">
                  <div className="col-lg-6 col-sm-6">
                    <span className="btn btn-default btn-file">
                      <input
                        type="file"
                        name="file"
                        onChange={(e: any) => setImage(e.target.files[0])}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                <br />
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
              <br />
            </div>
          </div>
        </form>
        <Link to={!id ? "#" : `/image/${id}`}> Ver esta imagem</Link>
      </div>
    </>
  );
}
