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

    // Check URL parameters for university selection
    const urlParams = new URLSearchParams(window.location.search);
    const universityParam = urlParams.get('university');

    if (universityParam && universitySelect) {
        if (universityParam === 'tiu') {
            universitySelect.value = 'university1.html';
            localStorage.setItem('selectedUniversity', 'university1.html');
        } else if (universityParam === 'gba') {
            universitySelect.value = 'university2.html';
            localStorage.setItem('selectedUniversity', 'university2.html');
        }
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
    if (event.target == document.getElementById('success-modal')) {
        document.getElementById('success-modal').style.display = 'none';
    }
}

// Close modal functionality for success modal
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('close-modal-btn')) {
        document.getElementById('success-modal').style.display = 'none';
    }
    if (event.target.classList.contains('close')) {
        const modal = event.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
});

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

    // Send data to Flask server
    fetch('http://localhost:5000/submit-lead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        } else {
            document.getElementById('form-message').innerHTML = '<div class="error-message">Error submitting form. Please try again.</div>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('form-message').innerHTML = '<div class="error-message">Error submitting form. Please try again.</div>';
    });
});

// Apply form submission
const applyForm = document.getElementById('apply-form');
if (applyForm) {
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Client-side validation for apply form
        const fullName = this.fullName.value.trim();
        const dateOfBirth = this.dateOfBirth.value;
        const gender = this.gender.value;
        const fatherName = this.fatherName.value.trim();
        const motherName = this.motherName.value.trim();
        const email = this.email.value.trim();
        const phone = this.phone.value.trim();
        const address = this.address.value.trim();
        const state = this.state.value;
        const city = this.city.value.trim();
        const pincode = this.pincode.value.trim();
        const qualifications = this.qualifications.value.trim();
        const schoolName = this.schoolName.value.trim();
        const percentage = this.percentage.value;
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

        if (!dateOfBirth) {
            isValid = false;
            errorMessage += 'Date of Birth is required.\n';
        }

        if (!gender) {
            isValid = false;
            errorMessage += 'Gender selection is required.\n';
        }

        if (!fatherName) {
            isValid = false;
            errorMessage += 'Father\'s Name is required.\n';
        }

        if (!motherName) {
            isValid = false;
            errorMessage += 'Mother\'s Name is required.\n';
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
            errorMessage += 'Permanent Address is required.\n';
        }

        if (!state) {
            isValid = false;
            errorMessage += 'State selection is required.\n';
        }

        if (!city) {
            isValid = false;
            errorMessage += 'City is required.\n';
        }

        if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
            isValid = false;
            errorMessage += 'Valid 6-digit Pincode is required.\n';
        }

        if (!qualifications) {
            isValid = false;
            errorMessage += 'Educational Qualifications are required.\n';
        }

        if (!schoolName) {
            isValid = false;
            errorMessage += 'School/College Name is required.\n';
        }

        if (!percentage || percentage < 0 || percentage > 100) {
            isValid = false;
            errorMessage += 'Valid Percentage/CGPA (0-100) is required.\n';
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

        // Send data to Flask server
        fetch('http://localhost:5000/submit-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            } else {
                document.getElementById('apply-form-message').innerHTML = '<div class="error-message">Error submitting form. Please try again.</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('apply-form-message').innerHTML = '<div class="error-message">Error submitting form. Please try again.</div>';
        });
    });
}
