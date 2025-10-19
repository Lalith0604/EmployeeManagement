import { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, Loader2, AlertCircle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TopEmployee {
  empId: number;
  empName: string;
  deptName: string;
  salary: number;
}

const TopSalariesPage = () => {
  const [topEmployees, setTopEmployees] = useState<TopEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTopSalaries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/api/employees/top5');
        setTopEmployees(response.data);
      } catch (err) {
        const errorMessage = 'Failed to fetch top earners. Please ensure the backend server is running.';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTopSalaries();
  }, [toast]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-600 dark:text-yellow-500';
      case 2:
        return 'text-slate-400 dark:text-slate-300';
      case 3:
        return 'text-amber-700 dark:text-amber-600';
      default:
        return 'text-primary';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading top earners...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">Unable to Load Top Earners</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Top Earners</h1>
            <p className="text-muted-foreground">
              The highest paid employees in your organization
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                  Rank
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                  Department
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {topEmployees.map((employee, index) => {
                const rank = index + 1;
                return (
                  <tr
                    key={employee.empId}
                    className={`border-b border-border last:border-b-0 hover:bg-accent/50 transition-all duration-200 ${
                      rank === 1 ? 'bg-yellow-50/50 dark:bg-yellow-950/20' : ''
                    }`}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold ${getRankColor(rank)}`}>
                          #{rank}
                        </span>
                        {rank <= 3 && (
                          <Trophy className={`w-5 h-5 ${getRankColor(rank)}`} />
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm font-semibold text-foreground">
                      {employee.empName}
                    </td>
                    <td className="py-5 px-6 text-sm text-foreground">
                      {employee.deptName}
                    </td>
                    <td className="py-5 px-6 text-base font-bold text-primary">
                      ${employee.salary.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {topEmployees.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No top earners data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSalariesPage;
