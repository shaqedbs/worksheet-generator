document.addEventListener('DOMContentLoaded', function() {
    
    // --- מסד נתונים פנימי של תוכנית הלימודים ופרקים ---
    const curriculum = {
        torah: {
            a: { "בראשית": 12, "נח": 6, "לך-לך": 5, "וירא": 5, "חיי שרה": 3, "תולדות": 3, "ויצא": 4, "וישלח": 4, "וישב": 4, "מקץ": 4, "ויגש": 4, "ויחי": 4 },
            b: { "שמות": 6, "וארא": 4, "בא": 3, "בשלח": 5, "יתרו": 3, "משפטים": 3, "תרומה": 3, "תצוה": 3, "כי תשא": 4, "ויקהל": 3, "פקודי": 3, "ויקרא": 5, "צו": 7, "שמיני": 4 },
            c: { "תזריע": 2, "מצורע": 2, "אחרי מות": 2, "קדושים": 2, "אמור": 5, "בהר": 2, "בחוקותי": 2, "במדבר": 4, "נשא": 7, "בהעלותך": 4, "שלח": 4, "קרח": 3, "חקת": 3, "בלק": 3, "פנחס": 5 },
            d: { "מטות": 4, "מסעי": 3, "דברים": 3, "ואתחנן": 4, "עקב": 4, "ראה": 5, "שופטים": 6, "כי תצא": 5, "כי תבוא": 4, "ניצבים": 2, "וילך": 1, "האזינו": 1, "וזאת הברכה": 1 },
            e: { "בראשית (עיון)": 50 },
            f: { "שמות (עיון)": 40 }
        },
        navi: {
            b: ['יהושע'],
            c: ['שופטים', 'שמואל א'],
            d: ['שמואל ב', 'מלכים א'],
            e: ['מלכים ב'],
        }
    };

    // --- איתור כל הרכיבים מהדף ---
    const form = document.getElementById('worksheet-generator-form');
    const gradeSelect = document.getElementById('grade-select');
    const subjectSelect = document.getElementById('subject-select');
    
    const structuredOptionsContainer = document.getElementById('structured-options-container');
    const customTopicSection = document.getElementById('custom-topic-section');
    
    const torahOptionsDiv = document.getElementById('torah-options');
    const parashaSelect = document.getElementById('parasha-select');
    const perekSelect = document.getElementById('perek-select');
    
    const naviOptionsDiv = document.getElementById('navi-options');
    const naviBookSelect = document.getElementById('navi-book-select');

    const topicInput = document.getElementById('topic-input');
    const slider = document.getElementById('questions-slider');
    const countSpan = document.getElementById('questions-count');

    // --- פונקציה מרכזית שמעדכנת את כל הטופס ---
    function updateFormVisibility() {
        const grade = gradeSelect.value;
        const subject = subjectSelect.value;
        const topicMode = document.querySelector('input[name="topic_mode"]:checked').value;

        // הסתרת כל החלקים הדינמיים כברירת מחדל
        torahOptionsDiv.style.display = 'none';
        naviOptionsDiv.style.display = 'none';
        customTopicSection.style.display = 'none';
        
        if (topicMode === 'structured') {
            structuredOptionsContainer.style.display = 'block';
            if (grade && subject) {
                // הצגת אפשרויות התורה
                if (subject === 'torah') {
                    torahOptionsDiv.style.display = 'block';
                    parashaSelect.innerHTML = '<option value="">-- בחר פרשה --</option>'; // ניקוי וברירת מחדל
                    const parshiot = curriculum.torah[grade] ? Object.keys(curriculum.torah[grade]) : [];
                    parshiot.forEach(parasha => parashaSelect.add(new Option(parasha, parasha)));
                    updatePerekOptions(); // קריאה ראשונית לפרקים
                }
                // הצגת אפשרויות נביא
                else if (subject === 'navi') {
                    naviOptionsDiv.style.display = 'block';
                    naviBookSelect.innerHTML = '<option value="">-- בחר ספר --</option>';
                    let availableBooks = [];
                    ['b', 'c', 'd', 'e', 'f'].forEach(g => {
                        if (curriculum.navi[g]) {
                            availableBooks.push(...curriculum.navi[g]);
                        }
                        if (g === grade) return; // מפסיק לאסוף אחרי הכיתה הנוכחית
                    });
                    [...new Set(availableBooks)].forEach(book => naviBookSelect.add(new Option(book, book)));
                }
            }
        } else { // topicMode === 'custom'
            structuredOptionsContainer.style.display = 'none';
            customTopicSection.style.display = 'block';
             switch (subject) {
                case 'torah': topicInput.placeholder = "לדוגמה: בריאת העולם, יציאת מצרים"; break;
                case 'navi': topicInput.placeholder = "לדוגמה: כיבוש יריחו, דוד וגוליית"; break;
                case 'math': topicInput.placeholder = "לדוגמה: לוח הכפל, בעיות מילוליות"; break;
                default: topicInput.placeholder = "אנא בחרו כיתה ומקצוע תחילה";
            }
        }
    }

    function updatePerekOptions() {
        const grade = gradeSelect.value;
        const selectedParasha = parashaSelect.value;
        perekSelect.innerHTML = ''; // ניקוי
        if (grade && selectedParasha && curriculum.torah[grade] && curriculum.torah[grade][selectedParasha]) {
            perekSelect.add(new Option('חזרה על כל הפרשה', 'all'));
            const numChapters = curriculum.torah[grade][selectedParasha];
            for (let i = 1; i <= numChapters; i++) {
                perekSelect.add(new Option(`פרק ${String.fromCharCode(1487 + i)}`, i));
            }
        }
    }
    
    // --- מאזינים לאירועים ---
    gradeSelect.addEventListener('change', updateFormVisibility);
    subjectSelect.addEventListener('change', updateFormVisibility);
    document.querySelectorAll('input[name="topic_mode"]').forEach(radio => radio.addEventListener('change', updateFormVisibility));
    parashaSelect.addEventListener('change', updatePerekOptions);
    if (slider) slider.addEventListener('input', () => countSpan.textContent = slider.value);

    // --- שליחת הטופס (הדמיה בלבד) ---
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const resultsArea = document.getElementById('results-area');
        const outputDiv = document.getElementById('output');
        const resultsHeader = resultsArea.querySelector('h2');
        
        resultsArea.style.display = 'block';
        resultsHeader.textContent = "⏳ רק רגע, מכין לך דף עבודה לדוגמה...";
        outputDiv.innerHTML = '';
        
        setTimeout(function() {
            resultsHeader.textContent = "✅ דף עבודה לדוגמה נוצר בהצלחה!";
            outputDiv.innerHTML = `<div style="border: 1px solid #ddd; padding: 20px; background: #fff; border-radius: 5px;">התוכן האמיתי שייווצר על ידי הבינה המלאכותית יופיע כאן לאחר שהאתר יעלה לרשת ויתחבר לשרתים.</div>`;
        }, 1500);
    });

    // הפעלה ראשונית של הלוגיקה כדי להגדיר את מצב ברירת המחדל
    updateFormVisibility();
});