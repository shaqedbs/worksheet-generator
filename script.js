document.addEventListener('DOMContentLoaded', function() {
    
    // --- מסד נתונים של תוכנית הלימודים ---
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
            b: ['יהושע'], c: ['שופטים', 'שמואל א'], d: ['שמואל ב', 'מלכים א'], e: ['מלכים ב'],
        },
        mishna: {
            'zeraim': ['ברכות', 'פאה'], 'moed': ['שבת', 'פסחים', 'יומא', 'סוכה'], 'nashim': ['יבמות', 'כתובות', 'סוטה'], 'nezikin': ['בבא קמא', 'בבא מציעא', 'בבא בתרא', 'סנהדרין']
        },
        halacha: {
            b: ['תפילה', 'ברכות', 'שבת (הכנות וקידוש)'], c: ['חגי תשרי', 'כשרות', 'כיבוד הורים'], d: ['שבת (הבדלה)', 'לשון הרע', 'צדקה וחסד'],
        },
        math: {
            a: ['מספרים עד 20', 'חיבור וחיסור עד 10'], b: ['חיבור וחיסור עד 100', 'יסודות הכפל', 'מדידות אורך'], c: ['לוח הכפל', 'בעיות מילוליות', 'גיאומטריה (מצולעים)'],
        },
        hebrew: {
            b: ['זיהוי פעלים ושמות עצם', 'סימני פיסוק', 'כתיבת סיפור קצר'], c: ['שורשים ומשפחות מילים', 'זכר ונקבה', 'יחיד ורבים'],
        },
        science: { c: ['מחזור המים בטבע', 'מערכת השמש', 'מצבי צבירה'], },
        english: { c: ['ABC and basic sounds', 'Numbers 1-20', 'Colors and animals'], }
    };

    // --- איתור רכיבים עיקריים ---
    const form = document.getElementById('worksheet-generator-form');
    const gradeSelect = document.getElementById('grade-select');
    const subjectSelect = document.getElementById('subject-select');
    const structuredOptionsContainer = document.getElementById('structured-options-container');
    const customTopicSection = document.getElementById('custom-topic-section');
    const topicInput = document.getElementById('topic-input');
    const slider = document.getElementById('questions-slider');
    const countSpan = document.getElementById('questions-count');

    // --- פונקציה מרכזית לעדכון הטופס ---
    function updateFormVisibility() {
        const grade = gradeSelect.value;
        const subject = subjectSelect.value;
        const topicMode = document.querySelector('input[name="topic_mode"]:checked').value;

        structuredOptionsContainer.innerHTML = ''; // ניקוי האזור הדינמי בכל שינוי
        customTopicSection.style.display = 'none';

        if (topicMode === 'custom') {
            customTopicSection.style.display = 'block';
            // עדכון הדוגמאות בנושא מותאם אישית
            switch (subject) {
                case 'torah': topicInput.placeholder = "לדוגמה: בריאת העולם"; break;
                case 'navi': topicInput.placeholder = "לדוגמה: דוד וגוליית"; break;
                case 'math': topicInput.placeholder = "לדוגמה: לוח הכפל"; break;
                default: topicInput.placeholder = "אנא בחרו כיתה ומקצוע תחילה";
            }
        } else if (topicMode === 'structured' && grade && subject) {
            // לוגיקה ליצירת תפריטים דינמיים
            createDynamicDropdowns(grade, subject);
        }
    }

    function createDynamicDropdowns(grade, subject) {
        // לוגיקה לתורה
        if (subject === 'torah' && curriculum.torah[grade]) {
            const parshiot = Object.keys(curriculum.torah[grade]);
            const parashaLabel = document.createElement('label');
            parashaLabel.htmlFor = 'parasha-select';
            parashaLabel.textContent = 'פרשה:';
            const parashaSelect = document.createElement('select');
            parashaSelect.id = 'parasha-select';
            parashaSelect.name = 'parasha';
            parashaSelect.innerHTML = '<option value="">-- בחר פרשה --</option>';
            parshiot.forEach(p => parashaSelect.add(new Option(p, p)));

            const perekLabel = document.createElement('label');
            perekLabel.htmlFor = 'perek-select';
            perekLabel.textContent = 'פרק:';
            const perekSelect = document.createElement('select');
            perekSelect.id = 'perek-select';
            perekSelect.name = 'perek';

            parashaSelect.addEventListener('change', () => updatePerekOptions(grade, parashaSelect, perekSelect));
            
            structuredOptionsContainer.appendChild(parashaLabel);
            structuredOptionsContainer.appendChild(parashaSelect);
            structuredOptionsContainer.appendChild(perekLabel);
            structuredOptionsContainer.appendChild(perekSelect);
            updatePerekOptions(grade, parashaSelect, perekSelect);
        }
        // לוגיקה למקצועות כלליים
        else if (curriculum[subject] && curriculum[subject][grade]) {
            const topics = curriculum[subject][grade];
            const topicLabel = document.createElement('label');
            topicLabel.htmlFor = 'topic-select';
            topicLabel.textContent = 'נושא:';
            const topicSelect = document.createElement('select');
            topicSelect.id = 'topic-select';
            topicSelect.name = 'topic';
            topics.forEach(t => topicSelect.add(new Option(t, t)));
            
            structuredOptionsContainer.appendChild(topicLabel);
            structuredOptionsContainer.appendChild(topicSelect);
        }
    }

    function updatePerekOptions(grade, parashaSelect, perekSelect) {
        const selectedParasha = parashaSelect.value;
        perekSelect.innerHTML = ''; 
        if (selectedParasha && curriculum.torah[grade][selectedParasha]) {
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
    if (slider) slider.addEventListener('input', () => countSpan.textContent = slider.value);

    // --- שליחת הטופס (הדמיה) ---
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

    // הפעלה ראשונית של הלוגיקה
    updateFormVisibility();
});
