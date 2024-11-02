import { AutoPaginatable, OrganizationMembership, User, WorkOS } from "@workos-inc/node";
import mongoose, { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
    title: {type: String, required: true},
    remote: {type: String, required: true},
    type: {type: String, required: true},
    salary: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    countryId :{type: String, required: true},
    stateId:{type: String, required: true},
    cityId:{type: String, required: true},
    jobIcon: {type: String},
    orgId: {type: String, required: true},
    contactPhoto: {type: String},
    contactName:{type: String, required: true},
    contactPhone: {type: String, required: true},
    contactEmail:{type: String, required: true},
    description: {type: String, required: true},
}, { timestamps: true });

export async function addOrgAndUserData(jobsDocs, user:User|null) {
    jobsDocs = JSON.parse(JSON.stringify(jobsDocs));
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    await mongoose.connect(process.env.MONGODB_URI as string);
    let oms:AutoPaginatable<OrganizationMembership>|null = null;
    if(user){
        oms = await workos.userManagement.listOrganizationMemberships({
            userId: user.id,
        });
    }    
    for (const job of jobsDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
        if (oms && oms.data.length > 0) {
            job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId);
        }
    }
    return jobsDocs;
}

export const JobModel = models.Job || model('Job', JobSchema);