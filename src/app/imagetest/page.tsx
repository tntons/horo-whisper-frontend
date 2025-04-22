'use client'
import React, { useState,useEffect } from "react";
import { storage } from "@/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from 'uuid';
const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        // Create a unique filename with UUID
        const uniqueFileName = `${image.name}_${v4()}`;
        const imageRef = ref(storage, `images/${uniqueFileName}`);

        // First upload the image and wait for it to complete
        await uploadBytes(imageRef, image);
        
        // Only after upload is complete, get the download URL
        const downloadURL = await getDownloadURL(imageRef);
        console.log("Image URL:", downloadURL);
        alert("Image uploaded successfully");
        
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white rounded-2xl shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-700">Upload an Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-64 object-cover rounded-lg border"
        />
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Upload
      </button>
      <img src="https://firebasestorage.googleapis.com/v0/b/horowhisperfile.firebasestorage.app/o/images%2FScreenshot%202568-04-22%20at%2019.27.12.png89b5074f-8726-48f6-b5f1-a64323eebc68?alt=media&token=477c9404-ae8c-4c39-bd9c-1515084399c9" alt="Uploaded Image" />
    </div>
    
  );
};

export default ImageUploader;
