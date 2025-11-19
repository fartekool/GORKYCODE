import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ChatSidebar from '@/components/ChatSidebar';
import ChatInterface from '@/components/ChatInterface';
import EditProfileModal from '@/components/EditProfileModal';
import StatusUpgradeModal from '@/components/StatusUpgradeModal';

const Chat = () => {
  const { isAuthenticated } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isStatusUpgradeOpen, setIsStatusUpgradeOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleNewChat = () => {
    // In real app: create new chat session
    console.log('New chat created');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar
        onEditProfile={() => setIsEditProfileOpen(true)}
        onUpgradeStatus={() => setIsStatusUpgradeOpen(true)}
        onNewChat={handleNewChat}
      />
      <div className="flex-1">
        <ChatInterface />
      </div>

      <EditProfileModal
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
      />
      
      <StatusUpgradeModal
        open={isStatusUpgradeOpen}
        onOpenChange={setIsStatusUpgradeOpen}
      />
    </div>
  );
};

export default Chat;
