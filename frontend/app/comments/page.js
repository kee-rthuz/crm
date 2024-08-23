// manthi
'use client'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faReply, faPen, faTrash, faLink, faTag, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TextEditor = ({ initialContent = '', onSave }) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border rounded-lg shadow-sm">
        <div className="flex items-center border-b p-2 space-x-2">
          {/* Text editor toolbar buttons */}
        </div>
        <textarea 
          className="w-full p-2 min-h-[200px] focus:outline-none" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your text here..."
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <span className="mr-2">Attachments</span>
          <button className="text-blue-500">+</button>
        </div>
        <div>
          <button className="px-4 py-2 text-red-500 mr-2" onClick={() => onSave(null)}>Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

const Comment = ({ comment, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  const handleSave = (newContent) => {
    if (newContent !== null) {
      setCommentContent(newContent);
    }
    setIsEditing(false);
  };

  const handleReply = (replyContent) => {
    if (replyContent !== null) {
      onReply(comment.id, replyContent);
    }
    setIsReplying(false);
  };

  return (
    <div className="flex items-start space-x-4 mb-4">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200">
          <img src="/path-to-avatar.jpg" alt="user-avatar" className="rounded-full" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm flex justify-between items-center">
          <div>
            <span className="font-medium text-gray-900">{comment.author}</span>
            <span className="text-gray-500 ml-2">{new Date(comment.date).toLocaleString()}</span>
          </div>
          <div className="flex space-x-4 text-gray-500">
            <button className="hover:text-blue-600">
              <FontAwesomeIcon icon={faThumbsUp} className="w-4 h-4" />
            </button>
            <button className="hover:text-blue-600" onClick={() => setIsReplying(!isReplying)}>
              <FontAwesomeIcon icon={faReply} className="w-4 h-4" />
            </button>
            <button className="hover:text-blue-600">
              <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
            </button>
            <button className="hover:text-blue-600">
              <FontAwesomeIcon icon={faTag} className="w-4 h-4" />
            </button>
            <button className="hover:text-blue-600" onClick={() => setIsEditing(!isEditing)}>
              <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
            </button>
            <button className="hover:text-blue-600">
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <p>{commentContent}</p>
        </div>
        {isEditing && (
          <div className="mt-4">
            <TextEditor initialContent={commentContent} onSave={handleSave} />
          </div>
        )}
        {isReplying && (
          <div className="mt-4">
            <TextEditor initialContent="" onSave={handleReply} />
          </div>
        )}
        {comment.replies && comment.replies.map(reply => (
          <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

const CommentSection = () => {
  const [activeTab, setActiveTab] = useState('comments');
  const [comments, setComments] = useState([]);
  const [isNewCommentEditorOpen, setIsNewCommentEditorOpen] = useState(false);

  const handleNewCommentSave = (newContent) => {
    if (newContent !== null) {
      const newComment = {
        id: Date.now(),
        content: newContent,
        author: "Current User",
        date: new Date().toISOString(),
        replies: []
      };
      setComments(prevComments => [newComment, ...prevComments]);
    }
    setIsNewCommentEditorOpen(false);
  };

  const handleReply = (parentId, replyContent) => {
    const newReply = {
      id: Date.now(),
      content: replyContent,
      author: "Current User",
      date: new Date().toISOString(),
      replies: []
    };
    
    setComments(prevComments => {
      const updateReplies = (comments) => {
        return comments.map(comment => {
          if (comment.id === parentId) {
            return {...comment, replies: [newReply, ...(comment.replies || [])]};
          } else if (comment.replies) {
            return {...comment, replies: updateReplies(comment.replies)};
          }
          return comment;
        });
      };
      
      return updateReplies(prevComments);
    });
  };

  const openNewCommentEditor = () => {
    setIsNewCommentEditorOpen(true);
  };

  return (
    <div className="w-3/4 ml-64 bg-white shadow rounded-lg">
      <div className="flex border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'comments' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'history' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <div className="flex-grow"></div>
        <button className="px-4 py-2 text-gray-500">
          <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </button>
      </div>

      {activeTab === 'comments' && (
        <div className="p-4">
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} onReply={handleReply} />
          ))}

          <div className="flex items-center w-[95%] mt-8 space-x-8 p-2 bg-gray-200 rounded-lg shadow">
            <div className="h-10 w-10 rounded-full bg-white">
                <img src="/path-to-avatar.jpg" alt="user-avatar" className="rounded-full" />
            </div>
            <input
              type="text"
              placeholder="Write a comment here..."
              className="flex-grow bg-transparent outline-none text-gray-600 placeholder-gray-400"
              onClick={openNewCommentEditor}
              readOnly
            />
          </div>
          
          {isNewCommentEditorOpen && (
            <div className="mt-4">
              <TextEditor initialContent="" onSave={handleNewCommentSave} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="p-4">
          <p>History content goes here</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;