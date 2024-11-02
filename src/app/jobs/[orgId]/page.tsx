import Jobs from "@/app/components/Jobs";
import { JobModel } from "@/models/JobModel";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        orgId: string;
    }
};


export default async function CompanyJObsPage(props:PageProps){
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    await mongoose.connect(process.env.MONGODB_URI as string);
    const jobDocs =JSON.parse(JSON.stringify( await JobModel.find({orgId: org.id})));
    // const orgs = [];
    for (const job of jobDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
    }
    return(
        <div>
            <div className="container">
                <h1 className="text-xl my-6">{org.name} Jobs</h1>
            </div>
            <Jobs jobs={jobDocs} header={"Job posted by " + org.name}/>
        </div>
    )
}