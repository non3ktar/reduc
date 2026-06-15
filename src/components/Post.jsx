import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Post({ post, currentUser }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const author = post.author || { name: 'Desconhecido', avatar: 'https://placehold.co/100', id: post.user_id };

  const date = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  });

  const likes = post.likes || [];
  const comments = post.comments || [];
  const isLiked = currentUser ? likes.includes(currentUser.id) : false;

  const handleLike = async () => {
    if (!currentUser) return;
    let newLikes = [...likes];
    if (isLiked) {
      newLikes = newLikes.filter(id => id !== currentUser.id);
    } else {
      newLikes.push(currentUser.id);
    }
    await supabase.from('posts').update({ likes: newLikes }).eq('id', post.id);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    
    const { data: cUser } = await supabase.from('profiles').select('name, avatar').eq('id', currentUser.id).single();
    
    const commentObj = {
      id: Date.now(),
      userId: currentUser.id,
      userName: cUser?.name || 'User',
      userAvatar: cUser?.avatar,
      text: newComment,
      timestamp: Date.now()
    };
    
    const newComments = [...comments, commentObj];
    await supabase.from('posts').update({ comments: newComments }).eq('id', post.id);
    setNewComment('');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post de ${author.name}`,
          text: post.content,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/profile/${author.id}`);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Link to={`/profile/${author.id}`} className="flex items-center gap-3 group">
            <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full border border-slate-600 group-hover:border-orange-500 transition-colors object-cover" />
            <div>
              <h3 className="font-semibold text-slate-100 group-hover:text-orange-400 transition-colors">{author.name}</h3>
              <p className="text-xs text-slate-400">{date}</p>
            </div>
          </Link>
          <button className="text-slate-500 hover:text-slate-300">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {post.content && (
          <p className="text-slate-200 mb-4 whitespace-pre-wrap">{post.content}</p>
        )}
      </div>

      {post.image && (
        <img src={post.image} alt="Post content" className="w-full max-h-96 object-cover border-y border-slate-700/50" />
      )}

      {/* Interaction Bar */}
      <div className="px-4 py-3 flex items-center gap-6 border-t border-slate-700/50 bg-slate-900/20">
        <button 
          onClick={handleLike} 
          className={`flex items-center gap-2 transition ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} /> 
          <span className="text-sm">{likes.length > 0 ? likes.length : 'Curtir'}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)} 
          className={`flex items-center gap-2 transition ${showComments ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'}`}
        >
          <MessageCircle size={20} /> 
          <span className="text-sm">{comments.length > 0 ? comments.length : 'Comentar'}</span>
        </button>
        
        <button onClick={handleShare} className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition ml-auto">
          <Share2 size={20} />
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-700/50 bg-slate-950/50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <img src={comment.userAvatar} alt="" className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                  <div className="flex-1 bg-slate-800/80 p-3 rounded-2xl rounded-tl-sm border border-slate-700/50">
                    <h4 className="text-xs font-bold text-slate-300 mb-1">{comment.userName}</h4>
                    <p className="text-sm text-slate-200">{comment.text}</p>
                  </div>
                </div>
              ))}
              
              <form onSubmit={handleComment} className="flex items-center gap-2 mt-4 relative">
                <input 
                  type="text" 
                  placeholder="Escreva um comentário..." 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={!newComment.trim()}
                  className="absolute right-2 p-1.5 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 text-white rounded-full transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
