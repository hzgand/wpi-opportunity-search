// import "./App.css";
import TestButton from "./app_components/TestButton";
import TestDivider from "./app_components/ListDivider";
import JobCard from "./app_components/JobCard";
import CardHeaderExample from "./app_components/CardHeaderExample";
import JobCardNew from "./app_components/JobCardNew";
import CardList from "./app_components/CardList";

const testJob = {
  _id: "63c34bfc748a33ce2823a7af",
  jobType: "Academic Year",
  positionTitle: "AI Project Worker",
  department: "Computer Science",
  location: "Unity Hall 320",
  studentsRequired: 5,
  hoursPerWeek: 4,
  federalFunding: true,
  jobDescription:
    "Project workers will be a part of an AI-project that analyzes students' math homework uploaded to a digital platform. Candidates will check and annotate over 100,000 images of math homework for personally identifiable information or PII. The work itself will be rote, but you'll be part of a fascinating research project in the congenial Learning Sciences lab in Unity Hall. In the past, when work-study hours run out, we have hired exceptional students to stay on for summer and semester internships.  ",
  requirements:
    "We are looking for someone who is prompt, well-organized, and dogged. Most importantly, attention-to-detail will be crucial for the project work.",
  contact: "Angela Kao",
  email: "akao@wpi.edu",
  phone: "6470",
};

function App() {
  return (
    <div className="App">
      <CardList />
    </div>
  );
}

export default App;
