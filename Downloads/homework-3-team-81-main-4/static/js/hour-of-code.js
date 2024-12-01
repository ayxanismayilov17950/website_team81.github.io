const feedbacks = [
  "Hour of Code, launched by Code.org in 2013, is an initiative aimed at introducing students of all ages to computer science fundamentals. It’s a global movement reaching tens of millions of students in over 180 countries, providing an accessible entry point to coding.",
  "In an increasingly digital world, computer science is becoming a vital skill. The Hour of Code inspires students to think creatively, solve problems, and understand the logic behind modern technology, empowering them for the jobs of the future.",
  "On 7 November 2024, we hosted our own Hour of Code event, where students explored concepts like loops, conditionals, and debugging. Through interactive activities, they created mini-projects like animations, games, and websites, showcasing their newfound skills.",
  "Teachers and volunteers played a key role in guiding students, making the experience collaborative and enriching. Parents also joined to witness how their children were engaging with technology in meaningful ways.",
];

const feedbackText = document.getElementById("hoc-feedback-text");
const feedbackBtn = document.getElementById("hoc-feedback-btn");
let feedbackIndex = 0;

const updateFeedback = () =>
  (feedbackText.textContent = feedbacks[++feedbackIndex % feedbacks.length]);

feedbackBtn.onclick = () => updateFeedback();
feedbackText.textContent = feedbacks[feedbackIndex];

const introTextElement = document.querySelector(".hoc-intro p");
const introText =
  "Empowering students through coding! Explore how we celebrated the Hour of Code with enthusiastic learners.";

let index = 0;
const typingSpeed = 50;

const typeText = () => {
  if (index < introText.length) {
    introTextElement.textContent += introText.charAt(index);
    index++;
    setTimeout(typeText, typingSpeed);
  }
};
typeText();
