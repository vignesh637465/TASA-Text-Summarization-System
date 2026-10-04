/**
 * 06 - TEXT SUMMARIZATION SYSTEM
 * Frequency-Based Extractive Text Summarization Algorithm
 */

// Common English Stop Words
const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
    "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
    "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
    "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
    "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no",
    "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
    "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
    "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then",
    "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those",
    "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
    "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd",
    "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

// Sample Article for testing
const sampleArticleText = `Artificial Intelligence (AI) is transforming the world at an unprecedented pace. From healthcare to finance, AI algorithms are helping professionals solve complex problems faster and more accurately than ever before. In modern medicine, machine learning models analyze medical imaging to detect diseases early, potentially saving thousands of lives each year. Furthermore, automated financial systems process millions of stock transactions in real time, identifying fraudulent activities with high precision.

Despite these breakthroughs, the rapid growth of artificial intelligence raises ethical and economic challenges. Concerns regarding data privacy, job displacement, and algorithmic bias have sparked intense global debate among policymakers and technologists. Many experts argue that comprehensive regulation and ethical guidelines are essential to ensure AI develops safely.

In conclusion, artificial intelligence represents one of the most powerful technological advancements in human history. To maximize its benefits while mitigating risks, society must balance innovation with responsible oversight and transparent governance.`;

// DOM Elements
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const summaryRatio = document.getElementById('summaryRatio');
const summarizeBtn = document.getElementById('summarizeBtn');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');
const resultsSection = document.getElementById('resultsSection');
const copyBtn = document.getElementById('copyBtn');

// Results Output Elements
const origWordCountEl = document.getElementById('origWordCount');
const summWordCountEl = document.getElementById('summWordCount');
const compressionRatioEl = document.getElementById('compressionRatio');
const summaryTextEl = document.getElementById('summaryText');

// Input Listener for Word & Character Counts
textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCount.textContent = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount.textContent = words;
});

// Load Sample Preset
sampleBtn.addEventListener('click', () => {
    textInput.value = sampleArticleText;
    textInput.dispatchEvent(new Event('input'));
    summarizeText();
});

// Buttons Listeners
summarizeBtn.addEventListener('click', summarizeText);

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    textInput.dispatchEvent(new Event('input'));
    resultsSection.classList.add('hidden');
});

copyBtn.addEventListener('click', () => {
    if (!summaryTextEl.textContent) return;
    navigator.clipboard.writeText(summaryTextEl.textContent)
        .then(() => {
            const origText = copyBtn.innerHTML;
            copyBtn.innerHTML = '✅ Copied!';
            setTimeout(() => { copyBtn.innerHTML = origText; }, 2000);
        });
});

/**
 * Extractive Text Summarization Engine
 */
function summarizeText() {
    const text = textInput.value.trim();
    if (!text) {
        alert('Please enter or paste an article to summarize!');
        return;
    }

    // Step 1: Split text into clean sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    if (sentences.length <= 2) {
        // Text is too short to summarize
        renderResults(text, text, text.split(/\s+/).length, text.split(/\s+/).length, 0);
        return;
    }

    // Step 2: Build Word Frequency Table (ignoring stop words and punctuation)
    const wordFrequencies = {};
    const wordsArray = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/);

    wordsArray.forEach(word => {
        if (word && !stopWords.has(word) && isNaN(word)) {
            wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
        }
    });

    // Step 3: Score each sentence based on word frequencies
    const sentenceScores = sentences.map((sentence, index) => {
        const sentenceWords = sentence.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/);

        let score = 0;
        let validWordCount = 0;

        sentenceWords.forEach(w => {
            if (wordFrequencies[w]) {
                score += wordFrequencies[w];
                validWordCount++;
            }
        });

        // Normalize score by sentence length to prevent favoring excessively long sentences
        const normalizedScore = validWordCount > 0 ? (score / validWordCount) : 0;

        return {
            index: index,
            text: sentence.trim(),
            score: normalizedScore
        };
    });

    // Step 4: Determine target sentence count based on selected ratio
    const ratio = parseFloat(summaryRatio.value);
    const targetCount = Math.max(1, Math.round(sentences.length * ratio));

    // Sort by score descending and take top N
    const sortedSentences = [...sentenceScores].sort((a, b) => b.score - a.score);
    const selectedSentences = sortedSentences.slice(0, targetCount);

    // Re-sort selected sentences back to original chronological index
    selectedSentences.sort((a, b) => a.index - b.index);

    // Combine extracted sentences into final summary text
    const summaryResult = selectedSentences.map(s => s.text).join(' ');

    // Calculate Word Statistics & Compression Percentage
    const origWords = text.trim().split(/\s+/).length;
    const summWords = summaryResult.trim().split(/\s+/).length;
    const compression = Math.max(0, Math.round(((origWords - summWords) / origWords) * 100));

    renderResults(text, summaryResult, origWords, summWords, compression);
}

/**
 * Render Output Results to Dashboard UI
 */
function renderResults(originalText, summaryText, origWords, summWords, compression) {
    origWordCountEl.textContent = origWords;
    summWordCountEl.textContent = summWords;
    compressionRatioEl.textContent = `${compression}%`;
    summaryTextEl.textContent = summaryText;

    resultsSection.classList.remove('hidden');
}
