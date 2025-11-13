import FeaturedBid from '@/app/shared/project-dashboard/overall-progress';
import PledgesNumber from '@/app/shared/appointment/dashboard/appointment-todo';
import WelcomeBanner from './welcome-banner';
import PlatformAccess from './platform-access';
import FleetStatus from './fleet-status';

export default function BiddingDashboard() {
    return (
        <div className="grid grid-cols-1 gap-6 @container lg:grid-cols-12">
            <div className="col-span-full flex flex-col gap-6 @5xl:col-span-8 3xl:col-span-9">
                <WelcomeBanner />
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-4">
                    <PlatformAccess className="w-full" />
                    <FleetStatus className="w-full" />
                </div>

            </div>
            <div className="col-span-full @container/sidebar @5xl:col-span-4 3xl:col-span-3">
                <div className="grid grid-cols-1 gap-6 @2xl/sidebar:grid-cols-2">
                    <FeaturedBid className="order-1" />
                    <PledgesNumber className="order-2 @2xl/sidebar:order-3" />
                </div>
            </div>
        </div>
    );
}
