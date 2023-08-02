import { useState } from "react";
// import { useDropzone } from "react-dropzone";

export default function ResumeAnalyser() {
  // const [JobDescription, setJobDescription] = useState({});
  // const [Resume, setResume] = useState({});
  const [JobDescription, setJobDescription] = useState("");
  const [Resume, setResume] = useState("");
  const [similarityScore, setSimilarityScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setResume(e.target.files[0]);
    } else if (e.target.name === "job_description") {
      setJobDescription(e.target.files[0]);
    }
  };
  // const { getRootProps: getJDRootProps, getInputProps: getJDInputProps } =
  //   useDropzone({
  //     accept: "application/pdf",
  //     onDrop: (acceptedFile) => {
  //       setJobDescription(
  //         Object.assign(acceptedFile[0], {
  //           preview: URL.createObjectURL(acceptedFile[0]),
  //         })
  //       );
  //     },
  //   });

  // const { getRootProps: getRSRootProps, getInputProps: getRSInputProps } =
  //   useDropzone({
  //     accept: "application/pdf",
  //     onDrop: (acceptedFile) => {
  //       setResume(
  //         Object.assign(acceptedFile[0], {
  //           preview: URL.createObjectURL(acceptedFile[0]),
  //         })
  //       );
  //     },
  //   });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSimilarityScore(null);
    setLoading(true);
    const data = new FormData();
    data.append("job_description", JobDescription);
    data.append("resume", Resume);
    fetch("https://resume-analyzer.azurewebsites.net/api/analyze", {
      method: "POST",
      body: data,
    }).then(
      (res) => {
        if (res.ok) {
          res.json().then((json) => {
            console.log(json);
            setSimilarityScore(json.similarity_score);
            setLoading(false);
          });
        }
      },
      (err) => {
        alert("Error: " + err.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white w-screen h-screen">
      {" "}
      <h1 className="text-6xl text-center mb-10 pt-3">Resume Analyzer</h1>
      <form
        id="dropzone-form"
        className="dropzone xl:w-1/3 md:w-1/2 w-full md:px-0 px-10 mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-lg py-2">
          Upload your{" "}
          <span className="text-purple-400 font-semibold">job description</span>{" "}
          here:
        </h2>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-jd-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
            // {...getJDRootProps()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {JobDescription
                  ? JobDescription.name
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
            </div>
            <input
              onChange={handleChange}
              id="dropzone-jd-file"
              type="file"
              className="hidden"
              name="job_description"
              // {...getJDInputProps()}
            />
          </label>
        </div>

        <h2 className="text-lg py-2">
          Upload your{" "}
          <span className="text-purple-400 font-semibold">resume</span> here:
        </h2>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-resume-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
            // {...getRSRootProps()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {Resume ? Resume.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
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
        <div className="text-center my-8">
          <button
            type="submit"
            className="w-1/3 mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
          >
            {loading ? <span className="loader"></span> : "Analyze!"}
          </button>
        </div>
      </form>
      {similarityScore !== null && (
        <div className="text-2xl text-center font-semibold">
          Similarity Score:{" "}
          <span className="text-purple-400">
            {similarityScore.toPrecision(2) * 100}%
          </span>
        </div>
      )}
    </div>
  );
}
