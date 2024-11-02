import { JobModel } from "@/models/JobModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req: NextResponse) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await mongoose.connect(process.env.MONGODB_URI as string);
    await JobModel.deleteOne({
        _id: id,
    });
    return Response.json(true);
}
