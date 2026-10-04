# Project 6: Text Summarization System

A beginner-friendly web application for **Extractive Text Summarization** using sentence frequency scoring. Built for the college subject **Text and Speech Analysis**.

---

## 📌 1. Title
**Text Summarization System**

## 📝 2. Description
The **Text Summarization System** compresses long articles, news essays, and documents into concise summaries by extracting the most statistically important sentences. Utilizing token frequency distribution and normalized sentence scoring, it highlights core information while calculating compression efficiency ratios.

## 🎯 3. Objectives
* Understand Extractive vs. Abstractive text summarization concepts in NLP.
* Implement sentence tokenization and word frequency distribution algorithms.
* Calculate compression percentage metrics: $\text{Compression} = \frac{\text{Original} - \text{Summary}}{\text{Original}} \times 100\%$.
* Provide an intuitive web dashboard for article condensation.

## ✨ 4. Features
* **Extractive Sentence Summarization:** Selects key sentences based on frequency weights.
* **Custom Summary Length:** Allows users to choose Short (30%), Medium (50%), or Detailed (70%) compression levels.
* **Metrics Dashboard:** Displays Original Word Count, Summary Word Count, and Compression Ratio percentage.
* **Chronological Sequence Preservation:** Re-orders selected sentences chronologically to preserve article readability.
* **Sample Preset Article:** One-click sample loader for testing.
* **Copy & Reset Utilities:** Fast copy-to-clipboard button and clear functionality.

## 🛠️ 5. Technologies Used
* **HTML5:** Form controls, dropdown selectors, and text containers.
* **CSS3:** Dark-theme glassmorphism, responsive grid layout, and metric dashboards.
* **JavaScript (ES6+):** Sentence segmentation regex, frequency map calculation, array sorting, and DOM manipulation.

## 🔬 6. How It Works
1. **Sentence Boundary Segmentation:** Splits input text into discrete sentences using punctuation boundaries (`.`, `!`, `?`).
2. **Stop-Word Removal & Vocabulary Frequency Map:** Removes common non-informative stop words (*"the"*, *"is"*, *"and"*) and counts occurrences of content words.
3. **Normalized Sentence Scoring:** Scores each sentence by summing word frequencies divided by sentence length.
4. **Top Sentence Selection & Re-ordering:** Extracts the top $N$ highest-scoring sentences and re-sorts them back to their original sequence order.

## 🧠 7. Algorithm & Logic Explanation (Viva Defense)
The summarizer uses an **Extractive Sentence Frequency Scoring Pipeline**:

1. **Token Frequency Distribution:**
   $$f(w) = \text{Count of word } w \text{ in document (excluding stop words)}$$
2. **Sentence Score Calculation:**
   $$\text{Score}(S_i) = \frac{\sum_{w \in S_i} f(w)}{\text{Length of } S_i}$$
3. **Threshold Selection:**
   $$k = \text{round}(\text{Total Sentences} \times \text{Summary Ratio})$$
   Select top $k$ sentences with maximum $\text{Score}(S_i)$ values.
4. **Order Preservation:**
   Re-sort selected sentences by their original array index $i$ to maintain structural narrative flow.

## 📥 8. Installation / Setup
No packages or build tools required.
1. Download or clone this folder:
   ```bash
   git clone <repository-url>
   cd 06-text-summarization-system
   ```

## 🚀 9. How to Run
Open `index.html` in any web browser.

* Double-click `index.html` or open via VS Code Live Server.

## 💡 10. Example Input & Output

### Input Article (3 Paragraphs / 168 Words):
> *"Artificial Intelligence (AI) is transforming the world at an unprecedented pace. From healthcare to finance, AI algorithms are helping professionals solve complex problems faster and more accurately... In conclusion, artificial intelligence represents one of the most powerful technological advancements in human history."*

### Output Summary (Medium 50% Setting):
* **Summary Text:** *"Artificial Intelligence (AI) is transforming the world at an unprecedented pace. In conclusion, artificial intelligence represents one of the most powerful technological advancements in human history."*
* **Original Words:** 168 Words
* **Summary Words:** 48 Words
* **Compression Ratio:** 71%

## 📁 11. Project Structure
```
06-text-summarization-system/
├── index.html        # HTML layout & controls
├── style.css         # UI design & metric cards
├── script.js         # Sentence scoring algorithm & DOM logic
└── README.md         # Detailed documentation
```

## ⚠️ 12. Limitations
* Does not generate *new* sentences (Extractive only, not Abstractive/LLM-based).
* Depends on explicit punctuation marks for accurate sentence splitting.

## 🔮 13. Future Enhancements
* Implement TextRank graph-based sentence ranking algorithm (PageRank variant for NLP).
* Add support for uploading PDF and DOCX documents.
* Include key phrase highlighting within the original text.

## 📷 14. Screenshots
*(Add project screenshots here when uploading to GitHub)*

```
+-----------------------------------------------------------+
|                 Text Summarization System                 |
| [Paste your long article here...]                         |
| Summary Length: [Medium (50%)]  [⚡ Summarize Text]       |
|                                                           |
| Original: 168 Words | Summary: 48 Words | Compression: 71% |
| Summary Text: "Artificial Intelligence is transforming..."|
+-----------------------------------------------------------+
```

## 📜 15. License
This project is open-source under the [MIT License](LICENSE). Created for college coursework.
