import React, { useState } from 'react';
import { supabase } from '../supabase';
import { ImagePlus, Send } from 'lucide-react';

export default function CreatePost({ user }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    await supabase.from('posts').insert({
      user_id: user.id,
      content,
      image
    });

    setContent('');
    setImage(null);
  };

  return (
    <div className="glass-card p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={`O que você quer compartilhar, ${user.name.split(' ')[0]}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent resize-none focus:outline-none text-slate-100 placeholder-slate-500 min-h-[80px]"
        />
        
        {image && (
          <div className="relative mb-4">
            <img src={image} alt="Preview" className="rounded-xl max-h-64 object-cover w-full" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-slate-900/80 p-2 rounded-full hover:bg-red-500/80 transition"
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <label className="cursor-pointer text-orange-400 hover:text-orange-300 transition flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50">
            <ImagePlus size={20} />
            <span className="text-sm font-medium">Foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>

          <button
            type="submit"
            disabled={!content.trim() && !image}
            className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-full font-medium transition flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <span>Publicar</span>
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
