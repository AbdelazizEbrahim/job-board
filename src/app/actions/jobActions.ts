'use server';

import { JobModel } from "@/models/JobModel";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(data: FormData) {
        console.log("Attempting to connect to MongoDB...");

        // Connect to MongoDB
        console.log("mongo URI: ", process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Successfully connected to MongoDB.");

        // Convert FormData to an object and log it
        const jobData = Object.fromEntries(data);
        console.log("Job data to be saved:", jobData);

        // Create the job document in the database
        const jobDoc = await JobModel.create(jobData);
        console.log("Job document created:", jobDoc);

        // Check if 'orgId' is in the data and revalidate the path
        if ('orgId' in jobData) {
            console.log(`Revalidating path for orgId: ${jobData.orgId}`);
            await revalidatePath('/jobs/' + jobData.orgId);
            console.log("Path revalidated.");
        }

        // Return the created job document
        return JSON.parse(JSON.stringify(jobDoc));
}
