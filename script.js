let classifier;

// Load the pre-trained Naive Bayes model when the page loads
window.onload = function() {
    classifier = ml5.naiveBayes(classificationReady);
};

// Callback once the classifier is ready
function classificationReady() {
    console.log("Naive Bayes Classifier is ready!");
}

// Classify the email when the button is clicked
function classifyEmail() {
    const emailText = document.getElementById("emailInput").value;

    // Check if the classifier is loaded
    if (classifier) {
        // Classify the input email text
        classifier.classify(emailText, gotResult);
    } else {
        document.getElementById("result").innerHTML = "Model is still loading...";
    }
}

// Callback function to handle the result
function gotResult(err, result) {
    if (err) {
        console.error(err);
        return;
    }

    // Get the label and confidence (probability) from the result
    const label = result[0].label;
    const confidence = (result[0].confidence * 100).toFixed(2);

    // Display the result
    document.getElementById("result").innerHTML = `This email is classified as: ${label} with ${confidence}% confidence.`;
}
