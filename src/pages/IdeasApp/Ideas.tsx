import axios from 'axios';
import { useEffect, useState } from 'react';

import { DndListHandle } from '@/components/IdeasComponents/DndList/DndListHandle';
import { useAuth } from '@/context/AuthContext';

interface Idea {
  title: string;
  description: string;
}

const Ideas: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    axios
      .get('https://localhost:7156/api/Ideas', { withCredentials: true })
      .then((response) => setIdeas(response.data));
  }, []);

  const addIdea = (newIdea: Idea) => {
    // Optimistically add the new idea to the local state
    setIdeas((prevIdeas) => [...prevIdeas, newIdea]);

    // Send the new idea to the server
    axios
      .post<Idea>('https://localhost:7156/api/Ideas', newIdea, { withCredentials: true })
      .then((response) => {
        // Replace the temporary idea with the one returned by the server
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) => (idea === newIdea ? response.data : idea))
        );
      })
      .catch((error) => {
        // Remove the temporary idea from the local state and show an error message
        setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea !== newIdea));
        console.error('Error adding idea:', error);
      });
  };

  console.log(ideas);

  return (
    <div>
      <h1>Ideas</h1>
      <ul>
        {ideas.map((idea, index) => (
          <li key={index}>{idea.title}</li>
        ))}
      </ul>
      <DndListHandle />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addIdea({ title: 'New Idea', description: 'This is a new idea.' });
        }}
      >
        {/* form fields for title and description */}
        <button type="submit">Add Idea</button>
      </form>
    </div>
  );
};

export default Ideas;
