import { metaObject } from '@/config/site.config';
import BiddingDashboard from '../shared/bidding/dashboard';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  // return <>Hello</>;
  return <BiddingDashboard />;
}
