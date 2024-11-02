import { JobModel } from "@/models/JobModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    // Delete the job by ID
    const result = await JobModel.deleteOne({
        _id: id,
    });

    // Check if deletion was successful
    if (result.deletedCount === 0) {
        return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }
    
    // Return success response
    return NextResponse.json({ success: true });
}
