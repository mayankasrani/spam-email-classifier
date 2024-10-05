// Email spam and non-spam examples
const emailTexts = [
    { text: "Win a free iPhone by clicking here!", label: "spam" },
    { text: "Your invoice for last month is attached.", label: "not spam" },
    { text: "You’ve been selected for a free vacation package!", label: "spam" },
    { text: "Please find the project update attached.", label: "not spam" },
    { text: "Claim your prize by clicking this link", label: "spam" },
    { text: "Meeting rescheduled to Friday afternoon.", label: "not spam" },
    { text: "Congratulations! You've won a lottery!", label: "spam" },
    { text: "New opportunity to earn money from home", label: "spam" },
    { text: "Looking forward to our lunch meeting.", label: "not spam" },
    { text: "Reminder: Your account has been updated.", label: "not spam" }
];

let classifier;

// Initialize the Naive Bayes classifier from ml5.js
window.onload = () => {
    classifier = ml5.naiveBayes(classifierReady);
    
    // Add training examples to the classifier
    for (let email of emailTexts) {
        classifier.addDocument(email.text, email.label);
    }

    classifier.train();
};

// Callback for when the classifier is ready
function classifierReady() {
    console.log("Classifier is ready!");
    document.getElementById('checkSpam').disabled = false; // Enable the button when ready
}

// Event listener for the button to check email classification
document.getElementById('checkSpam').onclick = () => {
    const emailText = document.getElementById('emailInput').value;

    if (emailText.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    // Classify the input text
    classifier.classify(emailText, displayResults);
};

// Display the classification results
function displayResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    const label = results[0].label;
    const confidence = (results[0].confidence * 100).toFixed(2);

    document.getElementById('result').innerText = `This email is classified as: ${label}`;
    document.getElementById('confidence').innerText = `Confidence: ${confidence}%`;

    // Change the color of the result based on classification
    if (label === 'spam') {
        document.getElementById('result').style.color = 'red';
    } else {
        document.getElementById('result').style.color = 'green';
    }
}
