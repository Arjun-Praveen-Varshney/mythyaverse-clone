import { initializeApp } from "firebase/app";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6ijwhhpA-b0JWwPxbO2lBZJORCx2ceQE",
  authDomain: "mythyaverse-web.firebaseapp.com",
  projectId: "mythyaverse-web",
  storageBucket: "mythyaverse-web.appspot.com",
  messagingSenderId: "734555658580",
  appId: "1:734555658580:web:e4c60446667a75d62f10c1",
  measurementId: "G-DW5KLNWPK7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const entriesCol = collection(db, "contact-form");
    await addDoc(entriesCol, {
      email,
      message,
    });
    alert("Your message was sent successfully!");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="my-5 w-full">
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="block p-2 mb-5 bg-transparent border-2 border-white md:w-[60%] w-full"
        />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={5}
          className="block p-2 mb-5 bg-transparent border-2 border-white md:w-[60%] w-full"
        />
      </label>
      <button
        type="submit"
        className="mt-5 bg-white text-black text-sm p-4 hvr-sweep-to-right"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
