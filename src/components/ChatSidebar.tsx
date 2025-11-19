import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Edit, Shield, Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  onEditProfile: () => void;
  onUpgradeStatus: () => void;
  onNewChat: () => void;
}

const ChatSidebar = ({ onEditProfile, onUpgradeStatus, onNewChat }: ChatSidebarProps) => {
  const { user, logout } = useAuth();
  const [recentChats] = useState([
    { id: '1', title: 'Вопрос о статье 45' },
    { id: '2', title: 'Закон N 229-ФЗ' },
    { id: '3', title: 'Консультация по ГК РФ' },
  ]);

  if (!user) return null;

  const usagePercent = (user.requests_used / user.requests_limit) * 100;
  const getLimitColor = () => {
    if (usagePercent < 20) return 'limit-text-success';
    if (usagePercent < 50) return 'limit-text-warning';
    return 'limit-text-danger';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-80 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col h-screen">
      {/* Profile Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.photo || undefined} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
            <p className="text-xs text-sidebar-foreground/70">{user.status}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className={cn('text-sm font-medium', getLimitColor())}>
            Осталось: {user.requests_limit - user.requests_used} из {user.requests_limit}
          </p>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-sidebar-accent/10 border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={onEditProfile}
          >
            <Edit className="mr-2 h-4 w-4" />
            Редактировать профиль
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-sidebar-accent/10 border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={onUpgradeStatus}
          >
            <Shield className="mr-2 h-4 w-4" />
            Обновить статус
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-destructive/10 border-sidebar-border hover:bg-destructive hover:text-destructive-foreground"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выход
          </Button>
        </div>
      </div>

      {/* Chats Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <Button
          onClick={onNewChat}
          className="w-full mb-4 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Новый Чат
        </Button>

        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-sidebar-foreground/70 mb-2 px-2">
            НЕДАВНИЕ ЧАТЫ
          </h4>
          {recentChats.map((chat) => (
            <button
              key={chat.id}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-sidebar-accent/20 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-accent" />
                <span className="text-sm truncate">{chat.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
