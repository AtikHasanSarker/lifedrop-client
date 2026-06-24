import StatsCard from '@/components/ui/StatsCard';
import { Droplets, Heart, BadgePlus, CalendarDays } from "lucide-react";

const DonorDashboard = () => {
    return (
      <div>
        
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Donations"
            value="8"
            subtitle="Keep it up! 🎉"
            icon={<Droplets size={30} />}
            iconBg="bg-red-100"
            iconColor="text-red-500"
          />

          <StatsCard
            title="Lives Impacted"
            value="24"
            subtitle="Amazing! ❤️"
            icon={<Heart size={30} />}
            iconBg="bg-pink-100"
            iconColor="text-pink-500"
          />

          <StatsCard
            title="Blood Group"
            value="A+"
            subtitle="Universal Helper"
            icon={<BadgePlus size={30} />}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-500"
          />

          <StatsCard
            title="Member Since"
            value="Jan 2024"
            subtitle="1+ year with us"
            icon={<CalendarDays size={30} />}
            iconBg="bg-green-100"
            iconColor="text-green-500"
          />
        </div>
      </div>
    );
};

export default DonorDashboard;