// import { queryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DndListHandle } from '@/components/IdeasComponents/DndList/DndListHandle';
import { useAuth } from '@/context/AuthContext';

interface Idea {
  ideaId: number;
  title: string;
  description: string;
  color: string;
  order: number;
}

const Ideas: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const { isAuthorized } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/Ideas`, { withCredentials: true })
      .then((response) => {
        setIdeas(response.data);
        setIsLoading(false); // Set isLoading to false when the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching ideas:', error);
        setIsLoading(false); // Also set isLoading to false if there's an error
      });
  }, []);

  const addIdea = (newIdea: Idea) => {
    axios
      .post<Idea>('https://localhost:7156/api/Ideas', newIdea, { withCredentials: true })
      .then((response) => {
        // Add the new idea to the local state
        setIdeas((prevIdeas) => [...prevIdeas, response.data]);
      })
      .catch((error) => {
        console.error('Error adding idea:', error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Ideas</h1>
      <DndListHandle ideasArray={ideas} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addIdea({
            title: `New Idea ${ideas.length + 1}`,
            description: 'This is a new idea.',
          });
        }}
      >
        {/* form fields for title and description */}
        <button type="submit">Add Idea</button>
      </form>
    </div>
  );
};

export default Ideas;
