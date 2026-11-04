import { Suspense } from "react";
import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";
import RecentUpcomingEventsSkeleton from "@/components/skeletons/RecentUpcomingEventsSkeleton";
import Navbar from "@/components/shared/Navbar";


export default function Home() {
  return (
   <div>
       <Banner></Banner>
       <Features></Features>
       <Suspense fallback={<RecentUpcomingEventsSkeleton />}>
         <RecentUpcomingEvents></RecentUpcomingEvents>
       </Suspense>
       <Gallery></Gallery>
       <Newsletter></Newsletter>
   </div>
  );
}
