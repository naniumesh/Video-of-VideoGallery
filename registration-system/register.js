// JavaScript code for dynamic functionality

// Font size functionality
let fontSize = 16; // Initial font size in pixels

// Increase font size
document.getElementById('increase-font').addEventListener('click', function() {
    fontSize += 2; // Increase font size by 2 pixels
    document.body.style.fontSize = fontSize + 'px';
});

// Decrease font size
document.getElementById('decrease-font').addEventListener('click', function() {
    if (fontSize > 10) { // Ensure font size doesn't go below 10 pixels
        fontSize -= 2; // Decrease font size by 2 pixels
        document.body.style.fontSize = fontSize + 'px';
    }
});

// Reset font size to default
document.getElementById('reset-font').addEventListener('click', function() {
    fontSize = 16; // Reset font size to default (16 pixels)
    document.body.style.fontSize = '16px';
});

// 2nd and 3rd Division
var navToggle = document.getElementById('nav-toggle');
var division3 = document.getElementById('division3');

navToggle.addEventListener('click', function() {
    division3.classList.toggle('active');
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
        division3.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const formContainer = document.querySelector(".container");
    const form = document.getElementById("registrationForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const submitAnotherBtn = document.getElementById("submitAnother");

    const backendBaseURL = "https://main-lpu-ncc.onrender.com"; // 🔁 actual backend URL

    async function checkEnrollmentStatus() {
        try {
            const response = await fetch(`${backendBaseURL}/api/enrollment`);
            if (!response.ok) throw new Error("Server not reachable");
            
            const data = await response.json();
            if (!data.enabled) {
                formContainer.innerHTML = "<h2>Enrollment is currently closed. Please check back later.</h2>";
            }
        } catch (error) {
            console.error("Error fetching enrollment status:", error);
            formContainer.innerHTML = "<h2>Registration is unavailable due to server issues. Please try again later.</h2>";
        }
    }

    await checkEnrollmentStatus();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = {
            firstName: document.getElementById("firstName").value,
            middleName: document.getElementById("middleName").value,
            lastName: document.getElementById("lastName").value,
            gender: document.getElementById("gender").value,
            regNumber: document.getElementById("reg").value,
            mobile: document.getElementById("mobile").value,
            email: document.getElementById("email").value,
        };

        try {
            const response = await fetch(`${backendBaseURL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                form.style.display = "none";
                confirmationMessage.style.display = "block";
                submitAnotherBtn.style.display = "block";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error submitting registration:", error);
        }
    });

    submitAnotherBtn.addEventListener("click", function () {
        form.reset();
        form.style.display = "block";
        confirmationMessage.style.display = "none";
        submitAnotherBtn.style.display = "none";
    });
});

//Contact Modal
function showContact() {
    let modal = document.getElementById("modalOverlay");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeContact(event) {
    let modal = document.getElementById("modalOverlay");
    if (event.target === modal || event.target.classList.contains("close-btn")) {
        modal.classList.remove("active");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}