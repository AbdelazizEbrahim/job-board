import { withAuth } from "@workos-inc/authkit-nextjs";
import Hero from "./components/Hero";
import Jobs from './components/Jobs';
import { addOrgAndUserData, JobModel } from "@/models/JobModel";
import mongoose from "mongoose";

export default async function Home() {

  const {user} = await withAuth();
  await mongoose.connect(process.env.MONGODB_URI as string)
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, {limit:5, sort:'-createdAt'}),
    user,
  )
  // console.log("jobs: ", latestJobs);

  return (
    <div>
      <Hero/>
      <Jobs header={''} jobs={latestJobs}/>
    </div>
  );
}
