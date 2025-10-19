import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  empId: number;
  empName: string;
  deptName: string;
  salary: number;
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/api/employees');
        setEmployees(response.data);
      } catch (err) {
        const errorMessage = 'Failed to fetch employees. Please ensure the backend server is running.';
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

    fetchEmployees();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">Unable to Load Employees</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">All Employees</h1>
        <p className="text-muted-foreground">
          Complete list of all employees across departments
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                  ID
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
              {employees.map((employee, index) => (
                <tr
                  key={employee.empId}
                  className={`border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                  }`}
                >
                  <td className="py-4 px-6 text-sm text-muted-foreground font-medium">
                    {employee.empId}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-foreground">
                    {employee.empName}
                  </td>
                  <td className="py-4 px-6 text-sm text-foreground">
                    {employee.deptName}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-primary">
                    ${employee.salary.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {employees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No employees found</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Total Employees: {employees.length}</p>
      </div>
    </div>
  );
};

export default EmployeesPage;
