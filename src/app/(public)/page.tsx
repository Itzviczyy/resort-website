import { getFeaturedRooms } from "./_rooms-server";
import HomePageClient from "./_homepage-client";

export default async function HomePage() {
  const featuredRooms = await getFeaturedRooms();
  return <HomePageClient featuredRooms={featuredRooms} />;
}
