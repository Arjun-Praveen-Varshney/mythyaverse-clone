import {
  faArrowUpFromBracket,
  faArrowRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconAnalytics from "../../assets/CVlytic/icon-analytics.png";
import HeroImage from "../../assets/CVlytic/hero-image.png";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const [Resume, setResume] = useState("");
  const [JobDescription, setJobDescription] = useState("");
  const [jobDescGenerator, setjobDescGenerator] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showJobDescriptionForm, setShowJobDescriptionForm] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [yearsofexperience, setyearsofexperience] = useState("");
  const [selectExperienceLevel, setselectExperienceLevel] = useState("");
  // const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setResume(e.target.files[0]);
    } else if (e.target.name === "job_desc_generator") {
      setjobDescGenerator(e.target.value);
    } else if (e.target.name === "job_description") {
      setJobDescription(e.target.files[0]);
      setisChecked(false);
    } else if (e.target.name === "yearsofexperience") {
      setyearsofexperience(e.target.value);
    } else if (e.target.name === "selectExperienceLevel") {
      setselectExperienceLevel(e.target.value);
    }
  };

  const handleResumeSubmit = (event) => {
    // Handle resume form submission here if needed
    event.preventDefault();
  };

  const handleContinue = () => {
    setShowJobDescriptionForm(true);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (Resume) {
      setLoading(true);
      const data = new FormData();
      data.append("resume", Resume);
      data.append("job_description", JobDescription);

      fetch("https://resume-analyzer.azurewebsites.net/api/analyze", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          res.json().then((json) => {
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
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen fixed">
      <main className="pt-10 h-screen flex flex-col items-center justify-center">
        <img
          src={HeroImage}
          alt="statistical vector graphic"
          className="absolute xl:bottom-20 bottom-40 right-0 xl:w-auto w-1/2"
        />
        <h1 className="absolute top-10 left-10 text-3xl text-left font-bold text-white border-l-4 border-l-white pl-4">
          Empowering Companies <br />
          to Hire <span className="text-gray-400">with Confidence</span>
        </h1>

        {showJobDescriptionForm ? (
          <form
            action=""
            className="w-2/5 mx-auto text-center relative -top-10 border-[1px] rounded-[3rem] py-12 px-3 border-gray-400 flex flex-col items-center justify-center"
            onSubmit={handleAnalyze}
          >
            {isChecked ? (
              <div className="w-4/5 space-y-8">
                <FontAwesomeIcon
                  onClick={() => {
                    setisChecked(false);
                  }}
                  icon={faCircleChevronLeft}
                  className="text-white flex h-10 w-10"
                />
                <div className="flex space-x-5 items-center justify-center">
                  <label
                    htmlFor="dropzone-jg"
                    className="text-white font-semibold"
                  >
                    Enter Job Role
                  </label>
                  <div className="flex flex-col items-center justify-center w-2/3 rounded-full cursor-pointer bg-[#171718]">
                    <input
                      required={true}
                      placeholder="Enter Job Role"
                      className="bg-[#171718] text-white py-3 px-4 w-full rounded-full text-center outline-none"
                      onChange={handleChange}
                      id="dropzone-jg"
                      type="text"
                      value={jobDescGenerator}
                      name="job_desc_generator"
                    />
                  </div>
                </div>
                <div className="flex space-x-5 items-center justify-center">
                  <label
                    htmlFor="selectExperienceLevel"
                    className="text-white font-semibold"
                  >
                    Experience
                  </label>
                  <div className="flex items-center justify-center rounded-full cursor-pointer bg-[#171718]">
                    <select
                      required={true}
                      id="selectExperienceLevel"
                      name="selectExperienceLevel"
                      className="bg-[#171718] text-white outline-none mx-3 py-3 rounded-full"
                      value={selectExperienceLevel}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Intern/Trainee">Intern/Trainee</option>
                      <option value="Entry-Level">Entry-Level</option>
                      <option value="Junior Level">Junior Level</option>
                      <option value="Mid-Level">Mid-Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Management Level">Management Level</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-center rounded-full cursor-pointer bg-[#171718]">
                    <input
                      required={true}
                      placeholder="Enter Years"
                      className="bg-[#171718] text-white px-4 py-3 w-full h-full rounded-full text-center outline-none"
                      onChange={handleChange}
                      id="yearsofexperience"
                      type="text"
                      value={yearsofexperience}
                      name="yearsofexperience"
                    />
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
                    className="bg-white text-black font-semibold text-lg rounded-full mx-auto py-2 px-8 flex items-center justify-center"
                  >
                    Analyze <img src={IconAnalytics} alt="" className="ml-2" />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-4/5 space-y-8">
                <div className="text-white text-2xl font-semibold">
                  Add Your Job Description
                </div>
                <div>
                  <label
                    htmlFor="dropzone-jd-file"
                    className="flex flex-col items-center justify-center w-full rounded-full cursor-pointer bg-[#171718]"
                  >
                    <div className="flex items-center justify-center p-5">
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        className="text-white"
                      />
                      <p className="text-white opacity-50 px-4">
                        {JobDescription
                          ? JobDescription.name
                          : "Drag or upload Job Description"}
                      </p>
                    </div>
                    <input
                      onChange={handleChange}
                      id="dropzone-jd-file"
                      type="file"
                      className="hidden"
                      name="job_description"
                    />
                  </label>
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
                    className={`bg-white text-black font-semibold text-lg rounded-full mx-auto py-2 px-8 flex items-center justify-center ${
                      !JobDescription ? "invisible" : ""
                    }`}
                  >
                    Analyze <img src={IconAnalytics} alt="" className="ml-2" />
                  </button>
                )}
                <div className="flex items-center justify-center">
                  <div className="flex-1 h-[1px] bg-white"></div>
                  <div className="mx-8 text-white">Or</div>
                  <div className="flex-1 h-[1px] bg-white"></div>
                </div>
                <div className="flex items-center justify-center space-x-6">
                  <input
                    className="h-6 w-6"
                    id="checkgenerated"
                    name="checkgenerated"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      setisChecked(true);
                      setJobDescription("");
                    }}
                  />
                  <label
                    htmlFor="checkgenerated"
                    className="text-white text-left font-semibold"
                  >
                    Would you like the AI to generate a job description for you?
                  </label>
                </div>
              </div>
            )}
          </form>
        ) : (
          <form
            action=""
            className="w-1/3 mx-auto text-center space-y-8 relative -top-10 border-[1px] rounded-[3rem] py-20 border-gray-400 flex flex-col items-center justify-center"
            onSubmit={handleResumeSubmit}
          >
            <div className="">
              <div className="text-4xl text-white mb-4">
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </div>
              <label
                htmlFor="dropzone-resume-file"
                className="flex flex-col items-center justify-center w-full rounded-full cursor-pointer bg-[#171718]"
                // {...getRSRootProps()}
              >
                <div className="flex flex-col items-center justify-center p-5">
                  <p className="text-white text-lg opacity-50 px-4">
                    {Resume ? Resume.name : "Drag or upload CV, Resume, PDF."}
                  </p>
                </div>
                <input
                  onChange={handleChange}
                  id="dropzone-resume-file"
                  type="file"
                  className="hidden"
                  name="resume"
                  // {...getRSInputProps()}
                />
              </label>
            </div>
            <button
              onClick={handleContinue}
              type="submit"
              className={`bg-white text-black font-semibold text-lg rounded-full mx-auto py-2 px-4 flex items-center justify-center ${
                !Resume ? "invisible" : ""
              }`}
            >
              Continue <FontAwesomeIcon icon={faArrowRight} className="mx-2" />
            </button>
          </form>
        )}
        <div className="flex w-1/5 items-center justify-center">
          <div
            className="flex-1 w-1/2 h-2 bg-white mx-2"
            onClick={() => {
              setShowJobDescriptionForm(false);
            }}
          ></div>
          <div
            onClick={() => {
              setShowJobDescriptionForm(true);
            }}
            className={`flex-1 w-1/2 h-2 bg-white ${
              !showJobDescriptionForm ? "opacity-50" : ""
            } mx-2`}
          ></div>
        </div>
      </main>
    </div>
  );
}
