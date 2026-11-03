import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";
import Navbar from "@/components/shared/Navbar";


export default function Home() {
  return (
   <div>
       <Banner></Banner>
       <Features></Features>
       <RecentUpcomingEvents></RecentUpcomingEvents>
       <Gallery></Gallery>
       <Newsletter></Newsletter>
   </div>
  );
}
