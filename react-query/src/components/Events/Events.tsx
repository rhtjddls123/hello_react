import { Link, Outlet } from 'react-router-dom';
import Header from '../Header';
import EventsIntroSection from './EventsIntroSection';
import NewEventsSection from './NewEventsSection';
import FindEventSection from './FindEventSection';


export default function Events() {
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events/new" className="button">
          New Event
        </Link>
      </Header>
      <main>
        <EventsIntroSection/>
        <NewEventsSection />
        <FindEventSection />
      </main>
    </>
  );
}
