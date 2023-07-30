import ReactSlider from "react-slider";
import PageContent from "./PageConent";
import "../../App.css";
import "./style.css";
import Page from "./PageLegend";
import { useEffect } from "react";

export default function PageScroller({
  orientation,
  onChange,
  currentIndex,
  subMenuState,
}) {
  return (
    <ReactSlider
      className={`${orientation}-slider ${
        orientation === "horizontal" ? "grow" : ""
      }`}
      markClassName={subMenuState ? "sm-open example-mark" : "example-mark"}
      onChange={onChange}
      trackClassName={
        subMenuState ? "sm-open-track example-track" : "example-track"
      }
      defaultValue={0}
      value={currentIndex}
      min={0}
      max={PageContent.length - 1}
      marks
      renderMark={(props) => {
        if (props.key < currentIndex) {
          props.className = subMenuState
            ? "sm-open example-mark example-mark-completed"
            : "example-mark example-mark-completed";
        } else if (props.key === currentIndex) {
          props.className = subMenuState
            ? "sm-open example-mark example-mark-active"
            : "example-mark example-mark-active";
        }
        return <span {...props} />;
      }}
      orientation={orientation}
    />
  );
}
