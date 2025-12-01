/*================ toggle icon navbar =============== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x-circle');
    navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*================ sticky navbar =============== */
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*======= remove toggle icon and navbar when click navbar link ========= */
    menuIcon.classList.remove('bx-x-circle');
    navbar.classList.remove('active');
};


/*===== Contact form =====*/

async function sendForm(event) {
    event.preventDefault();

    const data = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value
    };

    const res = await fetch("https://v3j-backend.onrender.com/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
        alert("Message sent successfully! ❤️");
        document.querySelector("#contactForm").reset();
    } else {
        alert("Failed to send message!");
    }
}



/*===== Appoinment form =====*/

document.addEventListener("DOMContentLoaded", () => {
    const appointmentForm = document.getElementById("appointment-form");

    appointmentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("cus-name").value.trim();
        const phone = document.getElementById("cus-phone").value.trim();
        const vehicleModel = document.getElementById("vehicle-model").value.trim();
        const purpose = document.getElementById("purpose").value.trim();
        const date = document.getElementById("app-date").value;
        const time = document.getElementById("app-time").value;

        // validation
        if (!name || !phone || !vehicleModel || !purpose || !date || !time) {
            alert("Please fill all required fields ❗");
            return;
        }

        const phoneRegex = /^(07[0-9]{8})$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid phone number (Ex: 07xxxxxxxx) ❗");
            return;
        }

        const payload = {
        cusName: name,
        cusPhone: phone,
        vehicleModel: vehicleModel,
        purpose: purpose,
        date: date,
        time: time
        };

        try {
            const response = await fetch("https://v3j-backend.onrender.com/api/appointment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Appointment created successfully! 🎉");
                appointmentForm.reset();
            } else {
                alert(`Failed to create appointment ❗\n${result.message || "Server error"}`);
            }
        } catch (error) {
            alert("Network error ❗ Please try again.");
            console.error("Error:", error);
        }
    });
});

