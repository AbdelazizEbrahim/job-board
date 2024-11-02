import { NextRequest, NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../libs/firebase"; 
import uniqid from 'uniqid';

export async function POST(req: NextRequest) {
  try {
    console.log("Request received.");

    // Retrieve form data and the file
    const data = await req.formData();
    console.log("Form data retrieved.");

    const file = data.get('file') as File;
    console.log("File retrieved from form data:", file);

    if (!file) {
      console.log("No file uploaded.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Generate a unique file name
    const newFileName = `${uniqid()}-${file.name}`;
    
    // Create a storage reference in Firebase with the new file name
    const storageRef = ref(storage, `uploads/jobimages/${newFileName}`);

    // Read the file as a buffer (handling stream properly)
    const chunks: Uint8Array[] = [];
    const reader = file.stream().getReader();

    // Loop through the stream and collect chunks
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        chunks.push(value); // value is Uint8Array
      }
    }

    const buffer = Buffer.concat(chunks);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    const url = await getDownloadURL(snapshot.ref);
    console.log("Download URL retrieved:", url);

    return NextResponse.json({
      newFileName,
      url,
    });
  } catch (error) {
    console.error("Error occurred during file upload:", error);

    // Safely handle the 'unknown' type for error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
