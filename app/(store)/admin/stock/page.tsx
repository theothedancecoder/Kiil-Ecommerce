import StockDashboard from '@/components/StockDashboard';

export default function StockManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StockDashboard isAdmin={true} />
    </div>
  );
}
