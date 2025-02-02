import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";
import axios from "axios";
import DocumentList from "./DocumentList";
import UploadDocument from "./UploadDocument";
import ViewSharedDocument from "../pages/ViewSharedDocuments";
import { formatDate } from "../utils/date";
import {
  FileText,
  User,
  Activity,
  UploadCloud,
  LogOut,
  Share2,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("/api/documents");
        setDocuments(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch documents. Please try again later.");
        console.error("Fetch documents error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
          >
            Welcome Back, {user.name}!
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <User className="text-emerald-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">Profile</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
          </motion.div>

          {/* Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-medium">Joined:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-medium">Last Login:</span>{" "}
                {formatDate(user.lastLogin)}
              </p>
              <p>
                <span className="font-medium">Documents:</span>{" "}
                {documents.length} files stored
              </p>
            </div>
          </motion.div>

          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <UploadCloud className="text-purple-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                Upload Documents
              </h2>
            </div>
            <UploadDocument setDocuments={setDocuments} />
          </motion.div>
        </div>

        {/* Document List & Shared Documents (Side by Side on Large Screens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Your Documents */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <FileText className="text-amber-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-100">
                Your Documents
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 text-red-300 rounded-lg">
                {error}
              </div>
            ) : (
              <DocumentList documents={documents} setDocuments={setDocuments} />
            )}
          </div>

          {/* Shared Documents */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Share2 className="text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-100">
                Received Documents
              </h2>
            </div>
            <ViewSharedDocument />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
