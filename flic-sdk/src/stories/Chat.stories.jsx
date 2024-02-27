// Import your component
import React from 'react';
import { Chat } from '../components/Chat/Chat.jsx';

// Export a default export named 'default' (if applicable)
export default {
  title: 'Chat', // Define the title for your stories
  component: Chat, // Specify the component being used in the stories
};

// Define your stories using the 'args' pattern
export const App = (args) => {
    return (
        <Chat chatId={"08090897276"}/>
    );
};