import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {UploadCloud} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";  // Import spinner

const UpdateDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [document, setDocument] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid document ID.");
      return;
    }

    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/documents/${id}`);
        setDocument(response.data);
        setFileName(response.data.fileName);
      } catch (error) {
        toast.error("Document not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("title", fileName);
      if (file) formData.append("file", file);

      const response = await axios.put(`http://localhost:5000/api/documents/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Document updated successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to update document.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;  // Show spinner while fetching

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text flex items-center gap-2 ">
      <UploadCloud className="text-purple-400" size={26} />Update Document
      </h2>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-white mb-1">Document Name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Upload New File (Optional)</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 bg-gray-700 text-white" />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Document"}
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateDocumentPage;
