import React from 'react';

function PostCard({ post, onClick }) {
  return (
    <div className='cart' onClick={() => onClick(post)}>
      <img src={post.img} alt={post.title} />
      <p className='tag'>{post.tags}</p>
      <h2 className='title'>{post.title}</h2>
      <div className='row'>
        <p className='autor'>{post.autor}</p>
        <p className='date'>{post.date}</p>
        <p className='views'>{post.views}</p>
      </div>
      <p className='text'>{post.text}</p>
    </div>
  );
}

export default PostCard;
