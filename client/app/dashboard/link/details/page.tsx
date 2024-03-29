"use client";
// import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getLinkData } from "../linkUtils";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
  const searchParams = useSearchParams();
  const [linkData, setLinkData] = useState({
    shortenedSuffix: "",
  });
  const searchLinkId = searchParams.get("id");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  var Root_Url = process.env.NEXT_PUBLIC_ROOT_URL_LIVE;
  // var form_Url = `${Root_Url}` + `l/` + `${searchLinkId}}`;

  useEffect(() => {
    async function getFormResponse() {
      setLinkData(await getLinkData(searchLinkId));
    }
    getFormResponse();
  }, []);

  var [qrCodeOptions, setQrCodeOptions] = useState({
    width: 300,
    height: 300,
    // margin: 5,
    // data: `${Root_Url}` + `l/` + `${linkData.shortenedSuffix}`,
    image:
      "https://raw.githubusercontent.com/0xvashishth/FLIC/main/client/app/assets/logos/flic-transperent.png",
    dotsOptions: {
      color: "#4267b2",
      type: "square",
      // gradient: {
      //   color1: "#6a1a4c",
      //   color2: "#6a1a4c",
      //   rotation: 0,
      // },
    },
    // backgroundOptions: {
    //   color: "#e9ebee",
    //   // gradient: {
    //   //   color1: "#ffffff",
    //   //   color2: "#ffffff",
    //   //   rotation: 0,
    //   // },
    // },
    imageOptions: {
      crossOrigin: "anonymous",
      hideBackgroundDots: true,
      imageSize: 0.3,
    },
    cornersSquareOptions: {
      type: "square",
      // colorType: {
      //   single: true,
      //   gradient: false,
      // },
      color: "#000000",
      // gradient: {
      //   type: "linear",
      //   color1: "#000000",
      //   color2: "#000000",
      //   rotation: 0,
      // },
    },
    // cornersDotOptions: {
    //   type: "",
    //   colorType: {
    //     single: true,
    //     gradient: false,
    //   },
    //   color: "#000000",
    //   gradient: {
    //     type: "linear",
    //     color1: "#000000",
    //     color2: "#000000",
    //     rotation: 0,
    //   },
    // },
    // qrOptions: {
    //   typeNumber: 0,
    //   mode: "Byte",
    //   errorCorrectionLevel: "Q",
    // },
  });

  var [newQrCodeOptions, setnewQrCodeOptions] = useState({
    light: "#ffffffff",
    dark: "#000000ff",
  });
  const handleInputChange = (event: any) => {
    var { id, value, type, checked, files } = event.target;
    // const inputValue =
    //   type === "checkbox" ? checked : type === "file" ? files[0] : value;
    // console.log(qrCodeOptions);
    // // Split the id into an array to represent the nested structure
    // const idArray = id.split(".");

    // // Handle nested properties
    // if (idArray.length === 2) {
    //   // For example, if id is "qrCodeOptions.dotsOptions.type"
    //   const [parent, child] = idArray;
    //   setQrCodeOptions((prevOptions: any) => ({
    //     ...prevOptions,
    //     [parent]: {
    //       ...prevOptions[parent],
    //       [child]: inputValue,
    //     },
    //   }));
    // } else {
    //   // Handle non-nested properties
    //   setQrCodeOptions((prevOptions) => ({
    //     ...prevOptions,
    //     [id]: inputValue,
    //   }));
    // }

    setnewQrCodeOptions((prevOptions) => ({
      ...prevOptions,
      [id]: value,
    }));
  };

  const handleGenerateQRCode = (e: any) => {
    const toastId = toast.loading("Generating QR.. 🚀");

    // Check if an image file is uploaded
    // const imageInput = document.getElementById("image") as HTMLInputElement;
    // const uploadedImage = imageInput?.files?.[0];

    // Update qrCodeOptions if an image is uploaded
    // var updatedQrCodeOptions = {
    //   ...newQrCodeOptions,
    //   data: `${Root_Url}` + `l/` + `${linkData.shortenedSuffix}`,
    // };
    // if (uploadedImage) {
    //   updatedQrCodeOptions.image = uploadedImage;
    // }

    // console.log(updatedQrCodeOptions);
    const light = newQrCodeOptions.light.replace(/^#/, "");
    const dark = newQrCodeOptions.dark.replace(/^#/, "");

    axios
      .get(
        `${process.env.NEXT_PUBLIC_ROOT_URL}getqr?data=${Root_Url}` +
          `l/` +
          `${linkData.shortenedSuffix}&light=${light}&dark=${dark}`
      )
      .then((response) => {
        const data = response.data;
        if (data) {
          // console.log(data)
          setImageSrc(data.pngFile);
          toast.success("QR Code Generated! Please Download It", {
            id: toastId,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        toast.success("Something went wrong 😥", {
          id: toastId,
        });
      });
  };

  return (
    <div className="rounded-lg my-3 ">
      <div className="my-3 flex">
        <h2 className="align-middle ml-3 mr-3 mt-3">Your Shortened URL</h2>
        <p className="font-mono input input-bordered w-1/2 py-3 bordered">
          {`${Root_Url}` + `l/` + `${linkData.shortenedSuffix}`}
        </p>
      </div>
      <div className="my-3 flex">
        <section className="container p-3">
          <div className="row row--body">
            <h1 className="text-2xl mb-4">QR Style Options</h1>
            <div className="flex m-2">
              <label
                htmlFor="dark"
                className="dotsOptionsHelper.colorType.single m-2"
              >
                Dots Color
              </label>
              <div className="dotsOptionsHelper.colorType.single">
                <input
                  id="dark"
                  onChange={handleInputChange}
                  type="color"
                  value={newQrCodeOptions.dark}
                />
              </div>
            </div>

            <div className="flex m-2">
              <label
                htmlFor="light"
                className="dotsOptionsHelper.colorType.single m-2"
              >
                Background Color
              </label>
              <div className="dotsOptionsHelper.colorType.single">
                <input
                  id="light"
                  onChange={handleInputChange}
                  type="color"
                  value={newQrCodeOptions.light}
                />
              </div>
            </div>
            {/* <label htmlFor="form-data">Data</label>
            <input
              id="form-data"
              type="text"
              className="input m-3 input-bordered"
              value={qrCodeOptions.data}
              onChange={handleInputChange}
            /> */}

            {/* <label htmlFor="image" className="m-2 text-xl font-medium">
              Image File
            </label>
            <div className="buttons-container">
              <input
                id="image"
                type="file"
                className="file-input w-full max-w-xs input-bordered"
                // onChange={handleInputChange}
                // value={qrCodeOptions.image!}
              />
              <button type="button" className="btn m-1" id="button-cancel">
                Cancel
              </button>
            </div>

            <div className="flex m-3">
              <label htmlFor="width" className="m-2">
                Width
              </label>
              <div>
                <input
                  id="width"
                  type="number"
                  className="input input-bordered"
                  min="100"
                  max="10000"
                  value={qrCodeOptions.width}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex m-3">
              <label htmlFor="height" className="m-2">
                Height
              </label>
              <div>
                <input
                  id="height"
                  type="number"
                  className="input input-bordered"
                  min="100"
                  max="10000"
                  value={qrCodeOptions.height}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}

            {/* <div className="collapse collapse-arrow join-item border border-base-300 my-2">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Dots Options
              </div>

              <div className="collapse-content">
                <div className="flex m-2">
                  <label htmlFor="dotsOptions.type" className="m-2 text-md">
                    Dots Style
                  </label>
                  <div>
                    <select
                      id="dotsOptions.type"
                      className="select select-ghost w-full max-w-xs border-red-600"
                      value={qrCodeOptions.dotsOptions.type}
                      onChange={handleInputChange}
                    >
                      <option value="square">Square</option>
                      <option value="dots">Dots</option>
                      <option value="rounded">Rounded</option>
                      <option value="extra-rounded">Extra rounded</option>
                      <option value="classy">Classy</option>
                      <option value="classy-rounded">Classy rounded</option>
                    </select>
                  </div>
                </div>

                <div className="flex m-2">
                  <label
                    htmlFor="dotsOptions.color"
                    className="dotsOptionsHelper.colorType.single m-2"
                  >
                    Dots Color
                  </label>
                  <div className="dotsOptionsHelper.colorType.single">
                    <input
                      id="dotsOptions.color"
                      onChange={handleInputChange}
                      type="color"
                      value={qrCodeOptions.dotsOptions.color}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300 my-4">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Corner Dots Options
              </div>

              <div className="collapse-content">
                <div className="flex m-2">
                  <label
                    htmlFor="cornersSquareOptions.type"
                    className="m-2 text-md"
                  >
                    Dots Style
                  </label>
                  <div>
                    <select
                      id="cornersSquareOptions.type"
                      className="select select-ghost w-full max-w-xs border-red-600"
                      value={qrCodeOptions.cornersSquareOptions.type}
                      onChange={handleInputChange}
                    >
                      <option value="none">None</option>
                      <option value="square">Square</option>
                      <option value="dot">Dot</option>
                      <option value="extra-rounded">Extra rounded</option>
                    </select>
                  </div>
                </div>

                <div className="flex m-2">
                  <label
                    htmlFor="cornersSquareOptions.color"
                    className="dotsOptionsHelper.colorType.single m-2"
                  >
                    Dots Color
                  </label>
                  <div className="dotsOptionsHelper.colorType.single">
                    <input
                      id="cornersSquareOptions.color"
                      onChange={handleInputChange}
                      value={qrCodeOptions.cornersSquareOptions.color}
                      type="color"
                    />
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col qr-code-container">
          <div className="qr-code" id="qr-code-generated"></div>
          <div className="qr-download-group">
            <button id="qr-download">Download</button>
            <label className="hide" htmlFor="qr-extension">
              Extension
            </label>
            <select
              id="qr-extension"
              onChange={handleInputChange}
              value={qrCodeOptions.type}
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
        </div> */}

            <div className="my-4">
              <button
                className="btn btn-outline"
                onClick={handleGenerateQRCode}
              >
                Generate QR
              </button>
            </div>

            <div className="my-5">
              {imageSrc && (
                <img src={imageSrc} alt="SVG Image" className="rounded-xl" />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
