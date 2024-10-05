// Simple list of spam keywords
const spamKeywords = [
    'win', 'winner', 'prize', 'cash', 'free', 
    'buy now', 'urgent', 'click here', 'limited time', 
    'exclusive deal', 'act now', 'risk-free', 'guarantee'
];

// Function to classify email text as spam or not
function checkSpam() {
    const emailText = document.getElementById('emailInput').value.toLowerCase();
    const words = emailText.split(/\s+/); // Split text into words
    let spamCount = 0;

    // Count spam keywords
    for (const word of words) {
        if (spamKeywords.includes(word)) {
            spamCount++;
        }
    }

    // Display result
    const resultElement = document.getElementById('result');
    if (spamCount > 0) {
        resultElement.innerText = 'This email is likely spam!';
    } else {
        resultElement.innerText = 'This email seems legitimate.';
    }
}

// Attach event listener to the button
document.getElementById('checkSpam').onclick = checkSpam;
