import ActiveAuctions from './active-auctions/index';
import Analytics from './analytics';
import BiddingActivity from './bidding-activity';
import FeaturedBid from '@/app/shared/project-dashboard/overall-progress';
import ResponseRate from '@/app/shared/support/dashboard/response-rate';
import LeadingTeams from './leading-teams';
import PledgesNumber from '@/app/shared/appointment/dashboard/appointment-todo';
import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
import WelcomeBanner from './welcome-banner';
import PlatformAccess from '@/app/shared/logistics/dashboard/platform-access';
import FleetStatus from '@/app/shared/logistics/dashboard/fleet-status';

export default function BiddingDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 @container lg:grid-cols-12">
      <div className="col-span-full flex flex-col gap-6 @5xl:col-span-8 3xl:col-span-9">
        <WelcomeBanner />
        <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-4">
  <PlatformAccess className="w-full" />
  <FleetStatus className="w-full" />
</div>

        <ResponseRate className="col-span-full @4xl:col-span-6 @6xl:col-span-7" />
        <Analytics />
        <SalesReport className="@4xl:col-span-2 @7xl:col-span-8" />
        <ActiveAuctions />
      </div>
      <div className="col-span-full @container/sidebar @5xl:col-span-4 3xl:col-span-3">
        <div className="grid grid-cols-1 gap-6 @2xl/sidebar:grid-cols-2">
          <FeaturedBid className="order-1" />
          <PledgesNumber className="order-2 @2xl/sidebar:order-3" />
          <LeadingTeams className="order-3 @2xl/sidebar:order-2" />
          <BiddingActivity className="order-4" />
        </div>
      </div>
    </div>
  );
}
