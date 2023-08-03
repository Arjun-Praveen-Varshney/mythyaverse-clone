import { PieChart } from "react-minimal-pie-chart";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SampleData from "../../assets/CVlytic/results.json";
import "./style.css";

export default function Analytics() {
  const jsonString = localStorage.getItem("mythyaverseparseddata");
  const parsedData = JSON.parse(jsonString);
  // console.log(parsedData);
  // const data = SampleData[0].results;

  const score = parsedData.score;
  // const skills = parsedData.technical_skills;
  const personalDetails = parsedData.personal_info;
  // const colorArray = ["#72d782", "#29b2ff", "#7087ff", "#ffa15b"];

  function convertToTitleCase(inputString) {
    let words = inputString.split("_");
    let capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    let titleCaseString = capitalizedWords.join(" ");
    return titleCaseString;
  }

  return (
    <div className="w-full space-y-8 pr-8">
      <div className="space-x-5 flex">
        <div className={"flex flex-col w-1/4 space-y-5"}>
          <div>
            <button className="bg-[#29b2ff] p-2 px-4 text-white rounded-full font-medium">
              Resume Score
            </button>
          </div>
          <div className="rounded-3xl bg-[#252525] text-white">
            <div className="px-20 py-5">
              <PieChart
                data={[{ value: score.score, color: "#29B2FF" }]}
                rounded
                lineWidth={15}
                startAngle={270}
                totalValue={10}
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={{
                  fontSize: "25px",
                  fontFamily: "sans-serif",
                  fill: "white",
                  fontWeight: "bold",
                }}
                labelPosition={0}
                background="#3b3b3b"
              />
            </div>
          </div>
        </div>
        <div className="w-3/4 space-y-5 flex flex-col">
          <div>
            <button className="bg-[#29b2ff] p-2 px-4 text-white rounded-full font-medium">
              Summary
            </button>
          </div>
          <div className="rounded-3xl bg-[#252525] text-white p-6">
            <div className="">{personalDetails.Summary}</div>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <button className="bg-[#29b2ff] py-2 px-6 text-white rounded-full font-medium">
          <FontAwesomeIcon
            icon={faFileSignature}
            className="mr-2 text-lg my-auto"
          />
          Feedback
        </button>
        <div className="rounded-3xl bg-[#252525] text-white p-6 grow">
          <Tabs selectedTabClassName="activeTab">
            <TabList className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-2 w-fit rounded-full mb-8 p-2">
              {Object.keys(score.feedback).map((key) => {
                let outputString = convertToTitleCase(key);
                return (
                  <Tab className="mr-2" key={key}>
                    <a
                      href="#"
                      className="inline-block px-4 py-3 text-white font-semibold rounded-full active"
                      aria-current="page"
                    >
                      {outputString}
                    </a>
                  </Tab>
                );
              })}
            </TabList>
            {Object.keys(score.feedback).map((key) => {
              return (
                <TabPanel className="space-y-8" key={key}>
                  {Object.entries(score.feedback[key]).map(([key, value]) => {
                    let outputString = convertToTitleCase(key);
                    return (
                      <div className="flex flex-col space-y-5" key={key}>
                        <div>
                          <button className="text-[#29b2ff] py-3 px-6 bg-white rounded-full font-semibold">
                            {outputString}
                          </button>
                        </div>
                        <div className="rounded-3xl bg-[#2f2f2f] text-white p-6">
                          <div className="border-l-4 border-[#29b2ff] pl-3">
                            {value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
