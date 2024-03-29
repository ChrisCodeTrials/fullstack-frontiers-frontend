const API = import.meta.env.VITE_BASE_URL;

const csrfToken = document.cookie
.split("; ")
.find((row) => row.startsWith("XSRF-TOKEN="))
.split("=")[1];

export function updateAppointment(appointment, id){
    return fetch(`${API}/api/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(appointment)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update appointment');
        }
            // Handle success if needed
            return response.json();
        })
}

export function updateDoctor(doctor,id){
    return fetch(`${API}/api/doctors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(doctor)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update appointment');
        }
            // Handle success if needed
            return response.json();
        })
}

