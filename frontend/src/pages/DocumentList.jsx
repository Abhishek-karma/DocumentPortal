import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DocumentList = ({ documents, loading, setDocuments }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/documents");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [setDocuments]);

  const handleDelete = async (docId) => {
    try {
      await axios.delete(`http://localhost:5000/api/documents/${docId}`);
      setDocuments((prev) => prev.filter((doc) => doc._id !== docId));
      toast.success("Document deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete document!");
    }
  };

  const handleView = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleUpdate = (docId) => {
    if (!docId) {
      toast.error("Invalid document ID");
      return;
    }
    navigate(`/update-document/${docId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="space-y-4"
    >
      {loading ? (
        <p>Loading documents...</p>
      ) : Array.isArray(documents) && documents.length > 0 ? (
        <ul>
          {documents.map((document) => (
            <li
              key={document._id || document.index}
              className="bg-gray-700 p-4 rounded-lg mb-2 flex justify-between items-center max-w-full"
            >
              <div className="flex items-center space-x-4 justify-between">
                <img
                  src={document.fileUrl}
                  alt={document.fileName}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleView(document.imageUrl)}
                />
                <p className="text-[15px] font-medium text-white ">{document.fileName}</p>
              </div>
              <div className="space-x-2 mt-2 ml-7">
                <button onClick={() => handleView(document.fileUrl)} className="text-blue-500">
                  View
                </button>
                <button className="text-yellow-500" onClick={()=>handleUpdate(document._id)} >Update</button>
                <button className="text-green-500">Share</button>
                <button onClick={() => handleDelete(document._id)} className="text-red-500">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents found.</p>
      )}

      {/* Modal for displaying full image */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </motion.div>
  );
};

export default DocumentList;
