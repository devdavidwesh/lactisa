import BusaryProgram from "./busaryProgram"
import Feeding from "./feedingProgram"
import LeadershipTraining from "./leadershipTraining"
import Mentorship from "./mentorship"

const Programs = () => {
  return (
    <div>
      <h2 className="my-2 md:my-4 text-2xl lg:text-3xl text-primary text-center">
            Our Programs
        </h2>
        <BusaryProgram />
        <Mentorship />
        <LeadershipTraining />
        <Feeding />
    </div>
  )
}

export default Programs