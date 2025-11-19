import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, FileText, Building2, Award } from 'lucide-react';

interface StatusUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StatusUpgradeModal = ({ open, onOpenChange }: StatusUpgradeModalProps) => {
  const requirements = [
    {
      status: 'Студент',
      icon: FileText,
      requirement: 'Скан студенческого билета',
      color: 'text-blue-500',
    },
    {
      status: 'Юр. Лицо',
      icon: Building2,
      requirement: 'ИНН и ОГРН организации',
      color: 'text-purple-500',
    },
    {
      status: 'Депутат',
      icon: Award,
      requirement: 'Удостоверение депутата',
      color: 'text-amber-500',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Повышение уровня доступа</DialogTitle>
          <DialogDescription>
            Для повышения уровня доступа отправьте запрос с подтверждающими документами
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Контактная информация</h4>
                <p className="text-sm text-muted-foreground">
                  Отправьте запрос на электронную почту:{' '}
                  <a href="mailto:apppla@yandex.ru" className="text-primary font-medium hover:underline">
                    apppla@yandex.ru
                  </a>
                </p>
              </div>
            </div>
          </Card>

          <div>
            <h4 className="font-semibold mb-3">Требования для каждого статуса:</h4>
            <div className="space-y-3">
              {requirements.map((req) => {
                const Icon = req.icon;
                return (
                  <Card key={req.status} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${req.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-semibold">{req.status}</h5>
                        <p className="text-sm text-muted-foreground">{req.requirement}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Что указать в письме:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Ваше полное имя (ФИО)</li>
              <li>Email, используемый для входа в систему</li>
              <li>Желаемый статус</li>
              <li>Прикрепленные подтверждающие документы</li>
            </ul>
          </div>

          <Button onClick={() => onOpenChange(false)} className="w-full">
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpgradeModal;
