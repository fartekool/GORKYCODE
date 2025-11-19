import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { ChatMessage, Source } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Demo: simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app: const response = await fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: input }) });
      
      const mockSources: Source[] = [
        {
          id: 1,
          title: 'Статья 45, Закон N 229-ФЗ',
          content: 'Об исполнительном производстве...',
        },
        {
          id: 2,
          title: 'ГК РФ, Статья 307',
          content: 'В силу обязательства одно лицо...',
        },
      ];

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Согласно действующему законодательству, статья 45 Закона N 229-ФЗ "Об исполнительном производстве" устанавливает порядок обращения взыскания на имущество должника. В соответствии с данной статьей, взыскание может быть обращено на любое имущество должника, за исключением случаев, предусмотренных законом.',
        sources: mockSources,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 bg-card">
        <h1 className="text-xl font-semibold">Q&A Bot</h1>
        <p className="text-sm text-muted-foreground">
          Задайте вопрос о законодательстве
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <Bot className="h-16 w-16 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Добро пожаловать, {user?.name}!</h2>
              <p className="text-muted-foreground">
                Задайте вопрос, чтобы начать консультацию
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 animate-fade-in',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'bot' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              )}
              
              <div
                className={cn(
                  'max-w-[70%] rounded-lg p-4',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {message.sources && message.sources.length > 0 && (
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="sources" className="border-0">
                      <AccordionTrigger className="text-xs font-medium hover:no-underline py-2">
                        Источники ({message.sources.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {message.sources.map((source) => (
                            <div
                              key={source.id}
                              className="text-xs p-2 rounded bg-muted/50"
                            >
                              <div className="font-medium text-primary mb-1">
                                [{source.id}] {source.title}
                              </div>
                              <div className="text-muted-foreground">
                                {source.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите ваш вопрос..."
            className="resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
