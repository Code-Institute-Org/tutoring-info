let GOOGLE_API = 'https://script.google.com/macros/s/AKfycbzv6ezhuezQYuVRVfptgkeYYgoGQlw3P8A3tCR5pQ-gH7ghZes37BR4uHPB0vvzxf5jcg/exec';

let RESPONSES = {
    "Not busy": ['Tutoring is relatively quiet at the moment.', 'green', 'There should be minimal wait times.'],
    "A little busy": ['Tutoring is a little busy at the moment.', 'lime', 'There may be short to medium wait times.'],
    "Quite busy": ['Tutoring is busy at the moment.', 'amber', 'There may be long wait times.'],
    "Very busy": ['Tutoring is unusually busy at the moment.', 'red', 'There may be very long wait times.'],
    "Offline": ['Tutoring is currently offline.', 'grey', 'Service will resume soon.']
};
let FA_ICON = `<i class="fas fa-circle"></i>`;

async function fetchAndSetStatus() {
    let response = await fetch(GOOGLE_API);

    if (response.status === 200) {
        let data = await response.text();
        data = JSON.parse(data);
        let tutorStatus = data.tStatus;
        let timeUpdated = new Date(data.time);
        let iconElement = document.getElementById('status-icon');
        iconElement.innerHTML = FA_ICON;
        iconElement.classList.add(RESPONSES[tutorStatus][1]);
        document.getElementById('status-text').innerText = RESPONSES[tutorStatus][0];
        document.getElementById('wait-info').innerText = RESPONSES[tutorStatus][2];
        document.getElementById('last-update').innerText = `Information updates every 30 minutes. \n Last updated: ${timeUpdated.toLocaleString('en-GB', { timeZone: 'UTC' })} UTC`;
    }
    else {
        document.getElementById('status-text').innerText = "An error occurred.";
    }
}

fetchAndSetStatus();