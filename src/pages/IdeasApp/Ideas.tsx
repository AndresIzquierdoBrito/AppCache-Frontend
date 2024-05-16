import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DndListHandle } from '@/components/IdeasComponents/DndList/DndListHandle';
import { useAuth } from '@/context/AuthContext';

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    const fetchIdeas = async () => {
      if (!isAuthorized) {
        return;
      }

      try {
        const response = await axios.get('https://localhost:7156/api/ideas', {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIdeas(response.data);
        } else {
          console.error('Failed to fetch ideas');
        }
      } catch (error) {
        console.error('Failed to fetch ideas', error);
      }
    };

    fetchIdeas();
  }, [navigate]);

  console.log(ideas);

  return (
    <div>
      <h1>Ideas</h1>
      {/* <ul>
        {ideas.map((idea) => (
          <li key={idea.id}>{idea.title}</li>
        ))}
      </ul> */}
      <DndListHandle />
    </div>
  );
};

export default Ideas;
