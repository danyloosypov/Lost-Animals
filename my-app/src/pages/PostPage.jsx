import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  
  // Assuming this is the post information fetched from API
  const post = {
    id: postId,
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor lectus urna, quis faucibus erat malesuada in. Maecenas eget neque enim. Maecenas convallis lacinia lectus, vitae lobortis arcu. Etiam semper lorem in enim imperdiet bibendum. Nulla facilisi. Fusce commodo, quam vitae lobortis tristique, elit nulla commodo mi, at bibendum tellus velit nec tellus. Nam blandit elit eget malesuada pulvinar.',
    imageUrl: 'https://picsum.photos/200/300'
  };

  return (
    <div className="container mt-5">
  <div className="row">
    <div className="col-md-4">
      <img src={post.imageUrl} alt="post" className="img-fluid" />
      <div className="mt-2">
        <button className='btn btn-danger'>Delete</button>
        <button className='btn btn-primary'>Edit</button>
      </div>
    </div>
    <div className="col-md-8">
      <h1>Lost Animal</h1>
      <h3>Species Breed</h3>
      <ul>
        <li>Color: red</li>
        <li>Gender: bitch</li>
        <li>Location: Kharkiv</li>
      </ul>
      <p>{post.body}</p>
      <h3>Contacts</h3>
      <ul>
        <li>Name: Osypov Danylo</li>
        <li>Email: dragon-sword@ukr.net</li>
        <li>Phone: 066-233-22-22</li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default PostPage;
