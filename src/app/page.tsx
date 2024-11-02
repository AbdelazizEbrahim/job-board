import { withAuth } from "@workos-inc/authkit-nextjs";
import Hero from "./components/Hero";
import Jobs from './components/Jobs';
import { addOrgAndUserData, JobModel } from "@/models/JobModel";

export default async function Home() {

  const {user} = await withAuth();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, {limit:5, sort:'-createdAt'}),
    user,
  )

  return (
    <div>
      <Hero/>
      <Jobs header={''} jobs={latestJobs}/>
    </div>
  );
}
