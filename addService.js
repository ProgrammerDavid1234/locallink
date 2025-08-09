// addService.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addServiceProvider = async () => {
  try {
    const docRef = await addDoc(collection(db, "serviceProviders"), {
      name: "John the Plumber",
      profilePic: "https://your-image-url.com/profile.jpg",
      reviews: 4.5,
      distance: "2.4 km",
      services: ["Pipe fixing", "Drain cleaning"],
      description: "Experienced plumber with over 10 years in service.",
      price: 5000,
      availability: {
        dates: ["2025-08-08", "2025-08-09"],
        time: "10:00 AM - 4:00 PM",
      },
    });

    console.log("Service Provider added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding service provider: ", e);
  }
};
