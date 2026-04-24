import HeroImage from "../components/layout/heros/HeroImage";
import EventsListWithCalendar from "../components/events/EventsListWithCalendar";

import { events } from "../data/events";

export const metadata = {
  title: "Local Events | Sable House",
  description: "The local events around sable house in savannah geoirgia",
};

export default function EventsPage() {
  return (
    <section>
      <HeroImage
        image="https://images.unsplash.com/photo-1667489012747-d4bbc525486f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Horse Drawn Carragie"
      />
      <EventsListWithCalendar events={events} />
    </section>
  );
}
