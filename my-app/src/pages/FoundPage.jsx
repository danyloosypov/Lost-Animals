import React, {useEffect, useState} from 'react'
import Sidebar from '../partials/Sidebar';
import Service from '../API/Service'
import axios from 'axios';
import PostCard from '../components/PostCard';


const FoundPage = () => {

  const [posts, setPosts] = useState([]);
  const [post_mode, setPostMode] = useState("2");
  const [locationFilter, setLocationFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/posts', {
        params: {
          post_mode: post_mode,
          location: locationFilter,
          animal_species: speciesFilter,
          animal_color: colorFilter,
          description: searchFilter,
          animal_gender: genderFilter
        }
      });
      setPosts(result.data);
    };
    fetchData();
    console.log(locationFilter, speciesFilter, colorFilter, searchFilter, genderFilter)
  }, [locationFilter, speciesFilter, colorFilter, searchFilter, genderFilter]);


  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar component */}
      <Sidebar />

      <div style={{ flex: '1', padding: '2rem' }}>
        {/* Page content */}
        <h1>Found</h1>
        <div className="post-grid">
          {posts.map(post => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
       
        {/* Add other page content here */}
      </div>
    </div>
  )
}

export default FoundPage
