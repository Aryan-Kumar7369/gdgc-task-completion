
// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('animated-title');
    const text = title.textContent;
    title.textContent = ''; // Clear the original text

    // Split the text into letters, wrap them in spans, and add animation delays
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        // Use a non-breaking space for actual spaces to maintain layout
        if (letter === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.classList.add('animated-letter');
            // Stagger the animation for each letter
            span.style.animationDelay = '${index * 0.2}s';
        }
        title.appendChild(span);
    });
});
