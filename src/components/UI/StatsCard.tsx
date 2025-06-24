
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  className?: string;
}

const StatsCard = ({ title, value, change, icon: Icon, className }: StatsCardProps) => {
  return (
    <Card className={cn("hover-lift", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs flex items-center mt-2",
            change.type === 'increase' ? 'text-green-600' : 'text-red-600'
          )}>
            <span className={cn(
              "inline-block w-0 h-0 mr-1",
              change.type === 'increase' 
                ? 'border-l-2 border-r-2 border-b-2 border-transparent border-b-green-600'
                : 'border-l-2 border-r-2 border-t-2 border-transparent border-t-red-600'
            )} />
            {change.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
