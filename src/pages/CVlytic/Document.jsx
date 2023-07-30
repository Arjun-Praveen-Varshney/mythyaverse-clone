import { faEye, faSliders, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PieChart } from "react-minimal-pie-chart";
import IconDocumentColor from "../../assets/CVlytic/icon-document-color.png";
import IconDocument from "../../assets/CVlytic/icon-document.png";

export default function Document() {
  const [Resume, setResume] = useState({});
  const { getRootProps: getRSRootProps, getInputProps: getRSInputProps } =
    useDropzone({
      accept: "application/pdf",
      onDrop: (acceptedFile) => {
        setResume(
          Object.assign(acceptedFile[0], {
            preview: URL.createObjectURL(acceptedFile[0]),
          })
        );
      },
    });

  return (
    <div className="flex flex-col w-full pr-10 space-y-5">
      <div className="rounded-lg bg-[#252525] text-white p-6">
        <div className="flex items-center">
          <img
            src={IconDocumentColor}
            className="aspect-square h-full mr-4"
            alt="resume rating icon"
          />
          Document stats
        </div>
        <div className="w-full mx-auto flex px-10 py-6">
          <div className="w-1/3 flex justify-center">
            <div className="grid grid-cols-[auto,1fr,auto] grid-rows-3 gap-4">
              <div className=" flex items-center justify-start">Total</div>
              <div className="flex items-center justify-center">
                <div className="xl:w-[200px] w-[100px]">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className=" flex items-center justify-start">282</div>
              <div className="row-start-2 flex items-center justify-start">
                Verified
              </div>
              <div className="row-start-2 flex items-center justify-center">
                <div className="row-start-2 w-full">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="bg-[#34d1bf] h-2.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row-start-2 flex items-center justify-start">
                180
              </div>
              <div className="row-start-3 flex items-center justify-start">
                Unverified
              </div>
              <div className="row-start-3 flex items-center justify-center">
                <div className="row-start-3 w-full">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="bg-[#fdca40] h-2.5 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row-start-3 flex items-center justify-start">
                102
              </div>
            </div>
          </div>
          <div className="w-1/3 max-h-40 text-center space-y-3 border-x-2 border-x-gray px-5 mx-16">
            <PieChart
              data={[{ value: 20, color: "#29B2FF" }]}
              rounded
              lineWidth={15}
              startAngle={0}
              totalValue={100}
              label={({ dataEntry }) => dataEntry.value + "%"}
              labelStyle={{
                fontSize: "20px",
                fontFamily: "sans-serif",
                fill: "white",
                fontWeight: "bold",
              }}
              labelPosition={0}
              background="#3b3b3b"
            />
            <p>Verified</p>
          </div>
          <div className="w-1/3 flex">
            <label
              for="dropzone-resume-file"
              class="flex flex-col items-center justify-center w-full rounded-lg grow cursor-pointer bg-[#171718]"
              {...getRSRootProps()}
            >
              <div class="flex flex-col items-center justify-center p-5">
                <p class="text-white text-lg opacity-20">
                  {Resume.path
                    ? Resume.path
                    : "Drag or upload CV, Resume, PDF."}
                </p>
              </div>
              <input
                id="dropzone-resume-file"
                type="file"
                class="hidden"
                name="resume"
                {...getRSInputProps()}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-[#252525] text-white p-6">
        <div className="flex justify-between">
          Uploaded Documents
          <button className="rounded-lg p-2  text-white">
            Filter <FontAwesomeIcon icon={faSliders} className="ml-5" />
          </button>
        </div>
        <ul className="space-y-2">
          <li className="bg-[#1d1d22] p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="space-x-2 flex items-center">
                <img src={IconDocument} alt="" />
                <span>Rtc.pdf</span>
              </span>
              <span className="space-x-2 flex items-center">
                <button className="bg-white p-2 px-4 text-[#1d1d22] rounded-full font-semibold">
                  Analyse
                </button>
                <div>
                  <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </span>
            </div>
          </li>
          <li className="bg-[#1d1d22] p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="space-x-2 flex items-center">
                <img src={IconDocument} alt="" />
                <span>Rtc.pdf</span>
              </span>
              <span className="space-x-2 flex items-center">
                <button className="bg-white p-2 px-4 text-[#1d1d22] rounded-full font-semibold">
                  Analyse
                </button>
                <div>
                  <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </span>
            </div>
          </li>{" "}
          <li className="bg-[#1d1d22] p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="space-x-2 flex items-center">
                <img src={IconDocument} alt="" />
                <span>Rtc.pdf</span>
              </span>
              <span className="space-x-2 flex items-center">
                <button className="bg-white p-2 px-4 text-[#1d1d22] rounded-full font-semibold">
                  Analyse
                </button>
                <div>
                  <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </span>
            </div>
          </li>{" "}
          <li className="bg-[#1d1d22] p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="space-x-2 flex items-center">
                <img src={IconDocument} alt="" />
                <span>Rtc.pdf</span>
              </span>
              <span className="space-x-2 flex items-center">
                <button className="bg-white p-2 px-4 text-[#1d1d22] rounded-full font-semibold">
                  Analyse
                </button>
                <div>
                  <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </span>
            </div>
          </li>{" "}
          <li className="bg-[#1d1d22] p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="space-x-2 flex items-center">
                <img src={IconDocument} alt="" />
                <span>Rtc.pdf</span>
              </span>
              <span className="space-x-2 flex items-center">
                <button className="bg-white p-2 px-4 text-[#1d1d22] rounded-full font-semibold">
                  Analyse
                </button>
                <div>
                  <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                <button className="bg-[#363639] p-3 rounded-full w-[50px] h-[50px] text-[#1d1d22]">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
