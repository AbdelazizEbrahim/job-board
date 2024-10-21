'use server';

import { JobModel } from "@/models/JobModel";
import mongoose from "mongoose";

export async function saveJobAction(data:FormData){
    await mongoose.connect(process.env.MONGODB_URI as string);
    const jobDoc = await JobModel.create( Object.fromEntries(data));
    return JSON.parse(JSON.stringify(jobDoc));
}

