import DashboardTable from './DashboardTable';
import generateMockData from './mockData';

const mockData = generateMockData();

export default function TempDashboardTable() {
  return (
    <DashboardTable ranks={mockData.rankings} totalProblemCount={mockData.totalProblemCount} />
  );
}
