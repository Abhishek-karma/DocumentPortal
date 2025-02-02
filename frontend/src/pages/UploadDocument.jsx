import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UploadDocument = ({ setDocuments }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDocuments((prev) => [...prev, response.data]);
      setFile(null);
      toast.success("Document uploaded successfully!");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input bg-gray-700 text-gray-300 p-2 rounded-lg w-full mb-4"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={handleUpload}
        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700"
      >
        Upload
      </motion.button>
    </motion.div>
  );
};

export default UploadDocument;
