import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ViewSharedDocument = () => {
  const { user } = useAuthStore();
  const receiverId = user?._id;
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedDocuments = async () => {
      if (!receiverId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/shares/view-shared-document/${receiverId}`
        );

        if (response.data && Array.isArray(response.data)) {
          setSharedDocuments(response.data);
        } else {
          setError("Invalid document data.");
        }
      } catch (error) {
        console.error("Error fetching shared documents:", error);
        setError("No shared Document found");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedDocuments();
  }, [receiverId]);

  // Open document in a new tab
  const handleView = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      toast.error("Invalid file URL.");
    }
  };

  
  const handleRevoke = async (docId) => {
    if (!window.confirm("Are you sure you want to revoke access to this document?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/shares/revoke/${docId}/${receiverId}`);
      setSharedDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== docId));
      toast.success("Access revoked successfully!");
    } catch (error) {
      console.error("Error revoking document access:", error);
      toast.error("Failed to revoke access.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      
    >
      {loading ? (
        <p>Loading shared documents...</p>
      ) : error ? (
        <div className="p-4 bg-red-500/10 text-red-300 rounded-lg">{error}</div>
      ) : sharedDocuments.length > 0 ? (
        <ul className="space-y-2">
          {sharedDocuments.map((doc) => (
            <li
              key={doc._id} 
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={doc.fileUrl}
                  alt={doc.fileName}
                  onClick={() => handleView(doc.fileUrl)}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                />
                <p className="text-[15px] font-medium text-white">{doc.fileName}</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => handleView(doc.fileUrl)} className="text-blue-500 cursor-pointer">
                  View
                </button>
                {doc.canEdit && (
                  <button
                    onClick={() => handleRevoke(doc._id)}
                    className="text-red-500 cursor-pointer"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No shared documents found.</p>
      )}
    </motion.div>
  );
};

export default ViewSharedDocument;
