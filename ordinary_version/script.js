document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle
    const menuToggle = document.querySelector("#menu-toggle");
    const sidebar = document.querySelector("#sidebar");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
        });
    }

    // Initialize tooltips (Bootstrap)
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(elem => {
        new bootstrap.Tooltip(elem);
    });

    // Form validation
    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll("input, textarea, select").forEach(input => {
            if (input.hasAttribute("required") && input.value.trim() === "") {
                isValid = false;
                input.classList.add("border-red-500");
            } else {
                input.classList.remove("border-red-500");
            }
        });
        return isValid;
    }

    // Handle form submission with AJAX
    document.querySelectorAll("form.ajax-form").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!validateForm(form)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in all required fields!'
                });
                return;
            }

            const formData = new FormData(form);
            const action = form.getAttribute("data-action");

            fetch(action, {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Operation completed successfully!',
                            timer: 1500
                        }).then(() => location.reload());
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: data.message
                        });
                    }
                })
                .catch(error => console.error("Error:", error));
        });
    });

    // Function to fetch and display dynamic data
    function fetchData(endpoint, containerId) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                let container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = "";

                    if (data.length === 0) {
                        container.innerHTML = "<p class='text-gray-500'>No records found.</p>";
                        return;
                    }

                    data.forEach(item => {
                        let row = document.createElement("div");
                        row.className = "p-4 bg-white shadow rounded mb-2";
                        row.innerHTML = Object.values(item).map(val => `<span>${val}</span>`).join(" | ");
                        container.appendChild(row);
                    });
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Initialize FullCalendar
        let calendarEl = document.getElementById("massCalendar");
    
        if (calendarEl) {
            let calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                events: "main.php?action=getMassEvents", // Fetch events via AJAX
                selectable: true,
                dateClick: function (info) {
                    $("#eventModal").modal("show");
                    $("input[name='event_date']").val(info.dateStr);
                }
            });
    
            calendar.render();
        }
    
        // Fetch ministers for dropdown
        function fetchMinisters() {
            fetch("main.php?action=getMinisters")
                .then(response => response.json())
                .then(data => {
                    let ministerDropdown = document.getElementById("ministerDropdown");
                    ministerDropdown.innerHTML = `<option value="">Select Minister</option>`;
                    data.forEach(minister => {
                        ministerDropdown.innerHTML += `<option value="${minister.id}">${minister.designation}</option>`;
                    });
                })
                .catch(error => console.error("Error fetching ministers:", error));
        }
        fetchMinisters();
    
        // Handle Mass Event Form Submission
        document.getElementById("eventForm").addEventListener("submit", function (event) {
            event.preventDefault();
            let formData = new FormData(this);
    
            fetch("main.php?action=addMassEvent", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Mass Scheduled Successfully!");
                    location.reload();
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => console.error("Error scheduling event:", error));
        });
    });
    

    // Fetch different sections dynamically
    fetchData("main.php?action=getParishioners", "parishioners-list");
    fetchData("main.php?action=getSacraments", "sacraments-list");
    fetchData("main.php?action=getBulletins", "bulletins-list");
    fetchData("main.php?action=getDonations", "donations-list");
    fetchData("main.php?action=getAttendance", "attendance-list");
});
