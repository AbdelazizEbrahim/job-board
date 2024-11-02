'use server';

import { JobModel } from "@/models/JobModel";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData: FormData) {

        await mongoose.connect(process.env.MONGODB_URI as string);
        const {id, ...jobData} = Object.fromEntries(formData);
        const jobDoc = (id)
        ? await JobModel.findByIdAndUpdate(id, jobData) : 
        await JobModel.create(jobData);
        if ('orgId' in jobData) {
            revalidatePath('/jobs/' + jobData.orgId);
        }

        return JSON.parse(JSON.stringify(jobDoc));
}
