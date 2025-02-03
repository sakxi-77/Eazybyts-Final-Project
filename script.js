document.addEventListener("DOMContentLoaded", async () => {
    const eventsContainer = document.getElementById("events-container");
    const bookedEventsContainer = document.getElementById("booked-events-container");

    try {
        // Fetch events from an API (Replace with a real API if needed)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
        const events = await response.json();

        // Clear loading text
        eventsContainer.innerHTML = "";

        // Loop through events and create cards
        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.body.substring(0, 100)}...</p>
                <button class="btn book-btn" data-event="${event.title}">Book Now</button>
            `;
            eventsContainer.appendChild(eventCard);
        });

        // Load booked events from localStorage
        loadBookedEvents();

        // Attach event listeners for booking
        document.querySelectorAll(".book-btn").forEach(button => {
            button.addEventListener("click", () => {
                let eventName = button.getAttribute("data-event");
                bookEvent(eventName);
            });
        });

    } catch (error) {
        eventsContainer.innerHTML = `<p>Error loading events. Please try again.</p>`;
        console.error("Error fetching events:", error);
    }

    function bookEvent(eventName) {
        let bookedEvents = JSON.parse(localStorage.getItem("bookedEvents")) || [];

        // Check if event is already booked
        if (!bookedEvents.includes(eventName)) {
            bookedEvents.push(eventName);
            localStorage.setItem("bookedEvents", JSON.stringify(bookedEvents));
            alert(`You have booked: ${eventName}`);
            loadBookedEvents(); // Update booked events section
        } else {
            alert("You have already booked this event!");
        }
    }

    function loadBookedEvents() {
        let bookedEvents = JSON.parse(localStorage.getItem("bookedEvents")) || [];
        bookedEventsContainer.innerHTML = bookedEvents.length === 0
            ? "<p>No booked events yet.</p>"
            : "";

        bookedEvents.forEach(eventName => {
            const bookedCard = document.createElement("div");
            bookedCard.classList.add("event-card", "booked");
            bookedCard.innerHTML = `
                <h3>${eventName}</h3>
                <button class="btn cancel-btn" data-event="${eventName}">Cancel</button>
            `;
            bookedEventsContainer.appendChild(bookedCard);
        });

        // Attach cancel event listeners
        document.querySelectorAll(".cancel-btn").forEach(button => {
            button.addEventListener("click", () => {
                cancelEvent(button.getAttribute("data-event"));
            });
        });
    }

    function cancelEvent(eventName) {
        let bookedEvents = JSON.parse(localStorage.getItem("bookedEvents")) || [];
        bookedEvents = bookedEvents.filter(event => event !== eventName);
        localStorage.setItem("bookedEvents", JSON.stringify(bookedEvents));
        alert(`Booking cancelled for: ${eventName}`);
        loadBookedEvents(); // Refresh booked events section
    }
});


