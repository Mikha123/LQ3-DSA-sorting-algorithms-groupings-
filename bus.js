//bus ticketing system
// Ticket person users authentication
const ticketPersonUsers = {
  ticketPerson: "password",
  user: "99998"
};

// Bus information.  Using a Map for faster bus lookups.
const buses = new Map([
  ["Cubao", { capacity: 30, passengers: [] }],
  ["Baguio", { capacity: 30, passengers: [] }],
  ["Pasay", { capacity: 30, passengers: [] }]
]);

// Function to authenticate ticket person
function authenticateTicketPerson(username, password) {
  return ticketPersonUsers[username] === password;
}

// Function to display bus passengers. Improved formatting.
function displayBusPassengers(bus) {
  console.log(`\n${bus.name}:`);
  if (bus.passengers.length === 0) {
    console.log("No passengers booked yet.");
    return;
  }
  bus.passengers.forEach((passenger, index) => {
    console.log(`${index + 1}. ${passenger.name}`);
  });
}


// Function to manage bus reservations. Improved error handling and user experience.
function manageBusReservations(bus) {
  while (true) {
    console.log("\n1. Add Reservation");
    console.log("2. Remove Reservation");
    console.log("3. Cancel");
    const choice = prompt("Choose an option (1-3):");

    if (choice === "1") {
      const name = prompt("Enter customer name:");
      if (name.trim() === "") {
        console.log("Please enter a valid name.");
        continue;
      }
      if (bus.passengers.length < bus.capacity) {
        bus.passengers.push({ name });
        console.log("Reservation added successfully!");
      } else {
        console.log("Bus is fully booked!");
      }
    } else if (choice === "2") {
      const nameToRemove = prompt("Enter customer name to remove:");
      if (nameToRemove.trim() === "") {
        console.log("Please enter a valid name.");
        continue;
      }
      const index = bus.passengers.findIndex(p => p.name === nameToRemove);
      if (index > -1) {
        bus.passengers.splice(index, 1);
        console.log("Reservation removed successfully!");
      } else {
        console.log("Passenger not found.");
      }
    } else if (choice === "3") {
      break;
    } else {
      console.log("Invalid choice. Please enter 1, 2, or 3.");
    }
  }
}

//Function to sort passengers alphabetically.  Uses a more efficient sort.
function sortPassengers(bus) {
    bus.passengers.sort((a, b) => a.name.localeCompare(b.name));
}


// Main function. Improved flow and error handling.
function main() {
  while (true) {
    console.log("\n1. Ticket Person");
    console.log("2. Customer");
    console.log("3. Exit"); // Added exit option
    const choice = prompt("Choose an option (1-3):");

    if (choice === "1") {
      const username = prompt("Enter username:");
      const password = prompt("Enter password:");
      if (authenticateTicketPerson(username, password)) {
        while (true) {
          console.log("\n1. Logout");
          console.log("2. View Bus Passengers");
          console.log("3. Manage Bus Reservations");
          console.log("4. Sort Passengers Alphabetically"); //Added sort option
          const choice = prompt("Choose an option (1-4):");

          if (choice === "1") {
            break;
          } else if (choice === "2") {
            for (const [busName, bus] of buses) {
              displayBusPassengers(bus);
            }
          } else if (choice === "3") {
            const busName = prompt("Enter bus name:");
            const bus = buses.get(busName);
            if (bus) {
              manageBusReservations(bus);
            } else {
              console.log("Bus not found.");
            }
          } else if (choice === "4") {
              const busName = prompt("Enter bus name to sort:");
              const bus = buses.get(busName);
              if (bus) {
                  sortPassengers(bus);
                  console.log("Passengers sorted alphabetically.");
              } else {
                  console.log("Bus not found.");
              }
          } else {
            console.log("Invalid choice. Please enter 1, 2, 3 or 4.");
          }
        }
      } else {
        console.log("Invalid credentials.");
      }
    } else if (choice === "2") {
      // Customer menu (This section needs to be completed based on your requirements)
      console.log("Customer menu not yet implemented.");
    } else if (choice === "3") {
      break; // Exit the main loop
    } else {
      console.log("Invalid choice. Please enter 1, 2 or 3.");
    }
  }
}

main();
