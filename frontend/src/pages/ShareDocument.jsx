import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react"; // Use appropriate icon

const ShareDocument = ({ documentId, setShowShareModal, senderId }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");
  const [users, setUsers] = useState([]);
  const [isManualInput, setIsManualInput] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [receiverId, setReceiverId] = useState(null); // To store receiver's ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/all-users"
        );
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Update receiverId when email changes (from manual input or dropdown)
  useEffect(() => {
    const user = users.find((user) => user.email === email);
    setReceiverId(user ? user._id : null);
  }, [email, users]);

  const handleShare = async (e) => {
    e.preventDefault();
    setSharing(true);

    if (!senderId || !receiverId) {
      toast.error("Sender or receiver not found.");
      setSharing(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shares/share-document",
        {
          senderId,
          receiverId,
          documentId,
          permissions: permission,
        }
      );

      if (response.status === 200) {
        toast.success("Document shared successfully!");
        setShowShareModal(false);
      }
    } catch (error) {
      console.error("Error sharing document:", error);
      toast.error(error.response?.data?.message || "Failed to share document.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
      onClick={() => setShowShareModal(false)} // Close modal on outside click
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Share2 size={24} className="text-green-400" /> Share Document
        </h3>

        <form onSubmit={handleShare} className="mt-4 space-y-4">
          {/* Dropdown or Manual Input Toggle */}
          <div className="flex items-center justify-between">
            <label className="block text-white">Recipient's Email</label>
            <button
              type="button"
              onClick={() => setIsManualInput(!isManualInput)}
              className="text-blue-500 text-sm"
            >
              {isManualInput ? "Select from users" : "Enter Email Manually"}
            </button>
          </div>

          {/* Conditional Rendering: Dropdown or Manual Input */}
          {isManualInput ? (
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Enter email manually"
                required
              />
            </div>
          ) : (
            <div>
              <select
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-white">Permission</label>
            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="view">View</option>
              <option value="edit">Edit</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
            font-bold rounded-lg shadow-lg"
            disabled={sharing}
          >
            {sharing ? "Sharing..." : "Share Document"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ShareDocument;
