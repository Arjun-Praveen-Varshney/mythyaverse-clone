import { PieChart } from "react-minimal-pie-chart";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IconDownload from "../../assets/CVlytic/icon-download.png";
import IconResumeRating from "../../assets/CVlytic/icon-rating.png";
import IconVerify from "../../assets/CVlytic/icon-verified.png";
// import SampleData from "../../assets/CVlytic/results.json";

import "./style.css";

export default function Analytics() {
  const jsonString = localStorage.getItem("mythyaverseparseddata");
  const parsedData = JSON.parse(jsonString);
  // console.log(parsedData);

  // const data = SampleData[0].results;
  const score = parsedData.score;
  const skills = parsedData.technical_skills;
  const personalDetails = parsedData.personal_info;
  // localStorage.removeItem("mythyaverseparseddata");

  function convertToTitleCase(inputString) {
    let words = inputString.split("_");
    let capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    let titleCaseString = capitalizedWords.join(" ");
    return titleCaseString;
  }
  // const colorArray = ["#72d782", "#29b2ff", "#7087ff", "#ffa15b"];

  return (
    <div className="flex w-full space-x-5">
      <div className={"flex flex-col w-1/4 space-y-5"}>
        {score && (
          <div className="rounded-lg bg-[#252525] text-white p-6 pb-0">
            <div className="flex items-center">
              <img
                src={IconResumeRating}
                className="aspect-square h-full mr-4"
                alt="resume rating icon"
              />
              Resume Rating
            </div>
            <div className="px-20 py-5">
              <PieChart
                data={[{ value: score.split(" ")[0], color: "#29B2FF" }]}
                rounded
                lineWidth={15}
                startAngle={270}
                totalValue={10}
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={{
                  fontSize: "15px",
                  fontFamily: "sans-serif",
                  fill: "white",
                }}
                labelPosition={0}
                background="#3b3b3b"
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-2/3 space-y-5 flex flex-col">
        <div className="flex space-x-5">
          <div className="rounded-lg bg-[#252525] text-white p-6">
            <div className="flex items-center justify-center text-lg font-semibold mb-4 border-b-2 border-b-gray-500">
              Overview
            </div>

            <div className="">
              <ul className="list-none space-y-2">
                <li>
                  <strong>Name: </strong>
                  {personalDetails.Name}
                </li>
                <li>
                  <strong>Education: </strong>
                  {personalDetails["Highest Education"]}
                </li>
                <li>
                  <strong>Designation: </strong>
                  {personalDetails["Current Position"]}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#252525] text-white p-6 grow">
          <Tabs selectedTabClassName="activeTab">
            <TabList className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              {Object.keys(skills).map((key) => {
                let outputString = convertToTitleCase(key);
                return (
                  <Tab className="mr-2" key={key}>
                    <a
                      href="#"
                      className="inline-block px-4 py-3 text-white bg-[#1e1e1e] rounded-full active"
                      aria-current="page"
                    >
                      {outputString}
                    </a>
                  </Tab>
                );
              })}
            </TabList>
            <TabPanel className="flex">
              <div className="w-1/2 mr-4">
                <span className="inline-block bg-[#303030] rounded-lg p-2 px-4 text-xs my-2">
                  Skills
                </span>
                <div className="bg-[#303030] p-4 rounded-lg text-center">
                  {/* <div className="text-left">{skills.technical_skill.name}</div> */}
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                <span className="inline-block bg-[#303030] rounded-lg p-2 px-4 text-xs my-2 w-fit">
                  {/* Skill Category */}
                  Proficiency Score
                </span>
                <div className="bg-transparent rounded-lg text-left max-h-[95%] overflow-y-auto">
                  {/* <ul>{skills.technical_skill.proficiency_score}</ul> */}
                </div>
              </div>
            </TabPanel>
            <TabPanel className="flex">
              <div className="w-1/2 mr-4">
                <span className="inline-block bg-[#303030] rounded-lg p-2 px-4 text-xs my-2">
                  {/* Educational Details */}
                  Programming Language
                </span>
                <div className="bg-[#303030] p-4 rounded-lg text-left ">
                  {/* {skills.programming_language.name} */}
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                <span className="inline-block bg-[#303030] rounded-lg p-2 px-4 text-xs my-2 w-fit">
                  {/* Certifications */}
                  Proficiency Score
                </span>
                <div className="bg-transparent rounded-lg text-left  overflow-y-auto">
                  {/* <ul>{skills.programming_language.proficiency_score}</ul> */}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <div className="flex justify-between">
          <button className="flex bg-[#1d1d22] text-white rounded-full p-2 px-4">
            <img src={IconVerify} alt="" className="mr-2" /> Verify
          </button>
          <button className="flex bg-white rounded-full p-2 px-4">
            <img src={IconDownload} alt="" className="mr-2" /> Download
          </button>
        </div>
      </div>
    </div>
  );
}
