const airportStands = {
    FACT: [
        { stand: 'A3', types: ['Light', 'Medium'] },
        { stand: 'A4', types: ['Light', 'Medium'] },
        { stand: 'A12', types: ['Heavy'] },
        { stand: 'B1', types: ['Cargo'] },
        // Add more stands as needed
    ],
    // Other airports...
};

function assignStand() {
    const airport = document.getElementById("airport").value;
    const aircraftType = document.getElementById("aircraftType").value;

    const stands = airportStands[airport].filter(stand => stand.types.includes(aircraftType));

    if (stands.length > 0) {
        const randomStand = stands[Math.floor(Math.random() * stands.length)].stand;
        document.getElementById("result").innerText = `Assigned Stand: ${randomStand}`;
    } else {
        document.getElementById("result").innerText = "No stands available for this type.";
    }
}
