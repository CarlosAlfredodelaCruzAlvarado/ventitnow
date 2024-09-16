/*CHECKPOINT FUNCIONA TODO AQUÍ*/

import React, { useState, useRef } from 'react';
import { FaMale, FaFemale, FaGenderless } from 'react-icons/fa';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const ComplaintCard = ({
  id,
  title,
  description,
  user,
  userGender,
  userAge,
  date,
  category,
  commentCount,
  onClick,
}) => {
  const GenderIcon = userGender === 'M' ? FaMale : userGender === 'F' ? FaFemale : FaGenderless;
  return (
    <motion.div
      className="border border-blue-600 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(id)}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="poppins-bold text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <GenderIcon className="text-blue-600 dark:text-blue-300" />
            <span>{user}</span>
            {userAge && <span>({userAge} years old)</span>}
            <span className="ml-4">{date}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <div className="flex justify-between items-center">
          <span className="inline-block bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full dark:bg-blue-700">
            {category}
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" />
            <span>{commentCount} Comments</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ComplaintList = ({ complaints }) => {


  const [expandedComplaintId, setExpandedComplaintId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [commentList, setCommentList] = useState({});
  const recaptchaRef = useRef(null);

  const handleCardClick = async (id) => {
    setExpandedComplaintId(expandedComplaintId === id ? null : id);

    if (expandedComplaintId !== id && !commentList[id]) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comments/by_complaint/?complaint=${id}`
        );
        setCommentList((prev) => ({
          ...prev,
          [id]: response.data,
        }));
      } catch (error) {
        console.error('¡Hubo un error al obtener los comentarios!', error);
      }
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim().length >= 20 && userName.trim() && captchaVerified) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/comments/`, {
          complaint: expandedComplaintId,
          user: userName,
          text: newComment,
        });
        setCommentList((prev) => ({
          ...prev,
          [expandedComplaintId]: [...(prev[expandedComplaintId] || []), response.data],
        }));
        setNewComment('');
        setUserName('');
        setCaptchaVerified(false);
        recaptchaRef.current.reset();
      } catch (error) {
        console.error('¡Hubo un error al publicar el comentario!', error);
      }
    } else {
      alert(
        'Por favor, completa todos los campos, asegúrate de que el comentario tenga al menos 20 caracteres y verifica el CAPTCHA.'
      );
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <div className="grid gap-8 w-full" style={{ cursor: 'pointer' }}>
      {complaints.map((complaint) => (
        <div key={complaint.id}>
          <ComplaintCard
            id={complaint.id}
            title={complaint.title}
            description={complaint.description}
            user={complaint.userName || 'Anonymous'}
            userGender={complaint.gender}
            userAge={complaint.age}
            date={complaint.problem_date}
            category={complaint.category}
            commentCount={complaint.comments.length}
            onClick={handleCardClick}
          />

          {expandedComplaintId === complaint.id && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 mt-2 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Comments
              </h4>
              {commentList[complaint.id]?.length > 0 ? (
                commentList[complaint.id].map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      <span className="font-bold">{comment.user || 'Anonymous'}:</span> {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">No comments yet.</p>
              )}

              <div className="mt-4">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                  placeholder="Your name"
                />
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                  placeholder="Add your comment (at least 20 characters)..."
                  minLength="20"
                ></textarea>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="TU_CLAVE_DEL_SITE_DE_RECAPTCHA"
                  onChange={handleCaptchaChange}
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
