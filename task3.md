## Project 3: Event RSVP & Booking

Build an app where an organizer publishes events with limited seats and attendees RSVP, with a waitlist once seats run out.

**Problem.** Meetups and internal workshops are managed over forms and chat, so seat counts drift and nobody knows who is actually coming.

**Core features (must have)**

- Organizer creates an event: title, description, venue or online link, start time, capacity.
- Public event list showing upcoming events and seats left.
- Attendee RSVPs with name and email; one RSVP per email per event.
- When the event is full, new RSVPs join a waitlist.
- Cancelling an RSVP frees the seat and promotes the first waitlisted person.
- Organizer view: attendee and waitlist tables, with CSV download.

**Data model (Prisma)**

| Model | Key fields | Relations |
| --- | --- | --- |
| Event | id, title, description, location, startsAt, capacity, createdAt | has many Rsvps |
| Rsvp | id, eventId, name, email, status (CONFIRMED, WAITLISTED, CANCELLED), createdAt | belongs to Event; unique on (eventId, email) |

**API endpoints (Node.js)**

| Method | Route | Purpose |
| --- | --- | --- |
| GET / POST | /api/events | Upcoming events with seats left; create event |
| GET / PATCH / DELETE | /api/events/:id | Event detail; edit; delete |
| POST | /api/events/:id/rsvps | RSVP: confirmed or waitlisted depending on seats |
| PATCH | /api/rsvps/:id/cancel | Cancel and promote the next waitlisted person |
| GET | /api/events/:id/rsvps | Organizer list, filterable by status |
| GET | /api/events/:id/rsvps.csv | CSV export |

**Pages (Next.js)**

- `/` lists upcoming events with a seats-left badge.
- `/events/[id]` shows event detail and the RSVP form.
- `/admin/events/new` and `/admin/events/[id]` are the organizer create form and attendee dashboard.


**Acceptance criteria**

- [ ] Confirmed RSVPs never exceed capacity, even with two RSVPs sent at the same moment.
- [ ] The same email cannot RSVP twice for one event (clear error message).
- [ ] Cancelling a confirmed RSVP promotes the oldest waitlisted RSVP.
- [ ] Past events no longer appear in the public list.
- [ ] CSV opens in Excel with name, email, status and RSVP time.

**Stretch goals:** confirmation email with Nodemailer, QR code check-in, organizer login.