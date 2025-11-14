// Navigation select
document.getElementById('university-select').addEventListener('change', function() {
    const selected = this.value;
    if (selected) {
        // Store the selected university in localStorage
        localStorage.setItem('selectedUniversity', selected);
        window.location.href = selected;
    }
});

// Pre-select university on page load if coming from navigation
document.addEventListener('DOMContentLoaded', function() {
    const selectedUniversity = localStorage.getItem('selectedUniversity');
    const universitySelect = document.getElementById('university-select');

    if (selectedUniversity && universitySelect) {
        universitySelect.value = selectedUniversity;
    }
});

// Modal for fees
const modal = document.getElementById('fees-modal');
const btn = document.getElementById('check-fees-btn');
const span = document.getElementsByClassName('close')[0];

if (btn) {
    btn.onclick = function() {
        fetch('data/fees.json')
            .then(response => response.json())
            .then(data => {
                const content = document.getElementById('fees-content');
                content.innerHTML = '<h3>Course-wise Fees</h3><ul>';
                for (const course in data) {
                    content.innerHTML += `<li><strong>${course}:</strong> ₹${data[course].min} - ₹${data[course].max}</li>`;
                }
                content.innerHTML += '</ul>';
                modal.style.display = 'block';
            })
            .catch(error => console.error('Error fetching fees:', error));
    }
}

if (span) {
    span.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form validation and submission
document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Client-side validation
    const fullName = this.fullName.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const state = this.state.value;
    const course = this.course.value;
    const intakeYear = this.intakeYear.value;
    const consent = this.consent.checked;

    let isValid = true;
    let errorMessage = '';

    if (!fullName) {
        isValid = false;
        errorMessage += 'Full Name is required.\n';
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        errorMessage += 'Valid Email is required.\n';
    }

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
        isValid = false;
        errorMessage += 'Valid 10-digit Phone Number is required.\n';
    }

    if (!state) {
        isValid = false;
        errorMessage += 'State selection is required.\n';
    }

    if (!course) {
        isValid = false;
        errorMessage += 'Course selection is required.\n';
    }

    if (!intakeYear) {
        isValid = false;
        errorMessage += 'Intake Year selection is required.\n';
    }

    if (!consent) {
        isValid = false;
        errorMessage += 'You must agree to the terms and conditions.\n';
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simulate form submission (replace with actual endpoint)
    console.log('Lead form submitted:', data);

    // Show success popup
    alert('Thank you for your enquiry! We will get back to you soon.');

    document.getElementById('form-message').innerHTML = '<div class="success-message">Thank you for your enquiry! We will get back to you soon.</div>';
    this.reset();
});

// Apply form submission
const applyForm = document.getElementById('apply-form');
if (applyForm) {
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Client-side validation for apply form
        const fullName = this.fullName.value.trim();
        const email = this.email.value.trim();
        const phone = this.phone.value.trim();
        const address = this.address.value.trim();
        const state = this.state.value;
        const city = this.city.value.trim();
        const qualifications = this.qualifications.value.trim();
        const course = this.course.value;
        const university = this.university.value;
        const intakeYear = this.intakeYear.value;
        const consent = this.consent.checked;

        let isValid = true;
        let errorMessage = '';

        if (!fullName) {
            isValid = false;
            errorMessage += 'Full Name is required.\n';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errorMessage += 'Valid Email is required.\n';
        }

        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            isValid = false;
            errorMessage += 'Valid 10-digit Phone Number is required.\n';
        }

        if (!address) {
            isValid = false;
            errorMessage += 'Address is required.\n';
        }

        if (!state) {
            isValid = false;
            errorMessage += 'State selection is required.\n';
        }

        if (!city) {
            isValid = false;
            errorMessage += 'City is required.\n';
        }

        if (!qualifications) {
            isValid = false;
            errorMessage += 'Educational Qualifications are required.\n';
        }

        if (!course) {
            isValid = false;
            errorMessage += 'Course selection is required.\n';
        }

        if (!university) {
            isValid = false;
            errorMessage += 'University selection is required.\n';
        }

        if (!intakeYear) {
            isValid = false;
            errorMessage += 'Intake Year selection is required.\n';
        }

        if (!consent) {
            isValid = false;
            errorMessage += 'You must agree to the terms and conditions.\n';
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual endpoint)
        console.log('Apply form submitted:', data);

        // Show success popup
        alert('Thank you for submitting your application! We will contact you soon.');

        const messageDiv = document.getElementById('apply-form-message') || document.getElementById('form-message');
        messageDiv.innerHTML = '<div class="success-message">Thank you for submitting your application! We will contact you soon.</div>';
        this.reset();
    });
}
