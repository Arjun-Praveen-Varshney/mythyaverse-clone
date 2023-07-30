import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import BtnAdd from "../../assets/CVlytic/btn-add.png";
import HeroImage from "../../assets/CVlytic/hero-image.png";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const [Resume, setResume] = useState({});
  const [JobDescription, setJobDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const { getRootProps: getJDRootProps, getInputProps: getJDInputProps } =
    useDropzone({
      accept: "application/pdf",
      onDrop: (acceptedFile) => {
        setJobDescription(
          Object.assign(acceptedFile[0], {
            preview: URL.createObjectURL(acceptedFile[0]),
          })
        );
      },
    });
  const handleAnalyze = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("resume", Resume);
    if (JobDescription) {
      data.append("job_description", JobDescription);
    }

    fetch("https://resume-analyzer-bzfrmtxtbq-de.a.run.app/api/analyze", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        res.json().then((json) => {
          // Issues with JSON response structure
          // Object.keys(json).map((key) =>
          //   key.replace(/\n/g, "").replace(/"\{/g, "{").replace(/\}"/g, "}")
          // );
          const parsedData = {
            ...json,
            personal_info: JSON.parse(json.personal_info),
            technical_skills: JSON.parse(json.technical_skills),
          };
          const jsonString = JSON.stringify(parsedData);
          localStorage.setItem("mythyaverseparseddata", jsonString);
          // console.log(json);
          // console.log(parsedData);
          setLoading(false);
          navigate("/cvlytic/analytics");
        });
      })
      .catch((err) => {
        setLoading(false);
        alert("Error: " + err.message);
      });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-screen h-screen fixed">
      <main className=" pt-10 h-screen flex flex-col items-center justify-center">
        <img
          src={HeroImage}
          alt="statistical vector graphic"
          className="absolute xl:bottom-20 bottom-40 right-0 xl:w-auto w-1/2"
        />
        <h1 className="absolute top-10 left-10 text-3xl text-left font-bold text-white border-l-4 border-l-white pl-4">
          Empowering Companies <br />
          to Hire <span className="text-gray-400">with Confidence</span>
        </h1>

        <form
          action=""
          className="w-1/3 mx-auto text-center space-y-8 relative -top-10"
          onSubmit={handleAnalyze}
        >
          <div class="w-full">
            <div className="text-4xl text-white mb-4">
              <FontAwesomeIcon icon={faUpload} />
            </div>
            <div className="flex">
              <label
                for="dropzone-resume-file"
                class="flex flex-col items-center justify-center w-full rounded-full cursor-pointer bg-[#171718]"
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
              <div className="flex items-center justify-center ml-4 relative">
                <label
                  htmlFor="dropzone-jd-file
                "
                  {...getJDRootProps()}
                >
                  <img
                    src={BtnAdd}
                    alt=""
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="cursor-pointer"
                  />
                  {showTooltip && (
                    <span className="absolute -top-14 left-1/2 -translate-x-1/2 rounded-lg text-xs text-white p-2 bg-[#888888]">
                      Add Job Description
                    </span>
                  )}
                </label>
                <input
                  id="dropzone-jd-file"
                  type="file"
                  class="hidden"
                  name="job-description"
                  {...getJDInputProps()}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center mx-auto py-2 px-4">
              <Oval
                height="50"
                width="50"
                radius="9"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-white text-black font-semibold text-lg rounded-full mx-auto py-2 px-4"
            >
              Analyse
            </button>
          )}
        </form>
      </main>
    </div>
  );
}
