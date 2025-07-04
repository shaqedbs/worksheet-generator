document.addEventListener('DOMContentLoaded', function() {
    
    // --- מסד נתונים מלא של תוכנית הלימודים ---
    const curriculum = {
        torah: {
            a: {"בראשית":6, "נח":4, "לך-לך":5, "וירא":5, "חיי שרה":2, "תולדות":3, "ויצא":3, "וישלח":5, "וישב":4, "מקץ":4, "ויגש":4, "ויחי":4},
            b: {"שמות":6, "וארא":4, "בא":3, "בשלח":5, "יתרו":3, "משפטים":3, "תרומה":3, "תצוה":3, "כי תשא":4, "ויקהל-פקודי":5, "ויקרא":5, "צו":2, "שמיני":4},
            c: {"תזריע-מצורע":4, "אחרי-קדושים":4, "אמור":5, "בהר-בחוקותי":3, "במדבר":4, "נשא":7, "בהעלותך":4, "שלח":3, "קרח":3, "חקת":3, "בלק":3, "פנחס":4},
            d: {"מטות-מסעי":6, "דברים":3, "ואתחנן":4, "עקב":3, "ראה":5, "שופטים":5, "כי תצא":5, "כי תבוא":4, "ניצבים-וילך":3, "האזינו":1, "וזאת הברכה":1},
            e: { "בראשית (עיון)": 50 },
            f: { "שמות (עיון)": 40 }
        },
        navi: {
            b: ['יהושע'],
            c: ['שופטים', 'שמואל א'],
            d: ['שמואל ב', 'מלכים א'],
            e: ['מלכים ב'],
            f: ['חזרה כללית', 'ירמיהו (פרקי נחמה)', 'יחזקאל (פרקי נחמה)']
        },
        mishna: {
            c: ['ברכות', 'פאה'],
            d: ['שבת', 'פסחים'],
            e: ['יומא', 'סוכה'],
            f: ['בבא קמא', 'בבא מציעא']
        },
        halacha: {
            a: ['ברכות השחר והנהנין', 'נטילת ידיים', 'תפילה בסיסית'],
            b: ['דיני בית הכנסת', 'ציצית ותפילין', 'הכנות לשבת'],
            c: ['קידוש והבדלה', 'חגי תשרי', 'חנוכה ופורים'],
            d: ['כשרות המטבח', 'כיבוד הורים', 'בין אדם לחברו'],
            e: ['דיני שבת (איסורי מלאכה)', 'לשון הרע', 'תרומות ומעשרות (בסיסי)'],
            f: ['מצוות התלויות בארץ', 'הלכות תפילה (הרחבה)', 'גמילות חסדים']
        },
        math: {
            a: ['מספרים עד 20', 'חיבור וחיסור עד 10', 'בעיות מילוליות פשוטות'],
            b: ['מספרים עד 100', 'חיבור וחיסור במאונך', 'יסודות הכפל והחילוק'],
            c: ['לוח הכפל בעל פה', 'בעיות מילוליות רב-שלביות', 'גיאומטריה: מצולעים וקווים'],
            d: ['מספרים עד 10,000', 'שברים פשוטים', 'מדידות: אורך, משקל, זמן'],
            e: ['פעולות בשברים', 'מספרים עשרוניים', 'שטח והיקף'],
            f: ['אחוזים', 'יחס ופרופורציה', 'חקירת נתונים וגרפים']
        },
        hebrew: {
            a:['הכרת אותיות וניקוד', 'כתיבת מילים', 'קריאת משפטים קצרים'],
            b: ['קריאה שוטפת', 'זיהוי שם עצם ופועל', 'סימני פיסוק'],
            c: ['שורשים ומשפחות מילים', 'זכר-נקבה, יחיד-רבים', 'כתיבת סיפור קצר'],
            d: ['הבנת הנקרא: רעיון מרכזי', 'בניינים (פעל, פיעל)', 'כתיבת מכתב'],
            e: ['אמצעים אמנותיים בטקסט', 'זמנים (עבר, הווה, עתיד)', 'כתיבת טיעון'],
            f: ['ניתוח טקסטים מורכבים', 'לשון המקורות', 'כתיבת חיבור ועבודה']
        },
        science: {
            a: ['עונות השנה', 'חושים', 'חי וצומח בסביבה'],
            b: ['מחזור חיי הצמח', 'בעלי חיים בסביבתם', 'תכונות חומרים'],
            c: ['מחזור המים בטבע', 'מערכת השמש', 'מצבי צבירה'],
            d: ['שרשרת המזון', 'חשמל בסיסי', 'גוף האדם: שלד ושרירים'],
            e: ['מערכות אקולוגיות', 'כוחות ותנועה', 'גוף האדם: עיכול ונשימה'],
            f: ['אטומים ומולקולות (בסיסי)', 'פוטוסינתזה', 'בריאות והיגיינה']
        },
        english: {
            c: ['ABC and basic sounds', 'Numbers 1-20', 'Colors and Animals'],
            d: ['Reading simple sentences', 'My Family & My House vocabulary', 'Present Simple (I/You/We)'],
            e: ['Reading short paragraphs', 'Asking questions (What/Where/Who)', 'Present Simple (He/She/It)'],
            f: ['Writing a short personal story', 'Past Simple', 'Expanding vocabulary (Food, Hobbies, Places)']
        }
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

        structuredOptionsContainer.innerHTML = ''; 
        customTopicSection.style.display = 'none';

        if (topicMode === 'custom') {
            customTopicSection.style.display = 'block';
            if(subject && curriculum[subject] && curriculum[subject][grade] && Array.isArray(curriculum[subject][grade])) {
                 topicInput.placeholder = `לדוגמה: ${curriculum[subject][grade][0]}`;
            } else if (subject === 'torah') {
                 topicInput.placeholder = "לדוגמה: בריאת העולם";
            } else {
                 topicInput.placeholder = "אנא בחרו כיתה ומקצוע תחילה";
            }
        } else if (topicMode === 'structured' && grade && subject) {
            let html = '';
            if (subject === 'torah' && curriculum.torah[grade]) {
                const parshiot = Object.keys(curriculum.torah[grade]);
                html = `<div><label for="parasha-select">פרשה:</label><select name="parasha" id="parasha-select">`;
                parshiot.forEach(p => html += `<option value="${p}">${p}</option>`);
                html += `</select></div><div><label for="perek-select">פרק:</label><select name="perek" id="perek-select"></select></div>`;
            } else if (curriculum[subject] && curriculum[subject][grade]) {
                const topics = curriculum[subject][grade];
                html = `<div><label for="topic-select">נושא:</label><select name="topic" id="topic-select">`;
                topics.forEach(t => html += `<option value="${t}">${t}</option>`);
                html += `</select></div>`;
            }
            structuredOptionsContainer.innerHTML = html;
            
            const parashaSelect = document.getElementById('parasha-select');
            if (parashaSelect) {
                parashaSelect.addEventListener('change', () => updatePerekOptions(grade, parashaSelect));
                updatePerekOptions(grade, parashaSelect);
            }
        }
    }

    function updatePerekOptions(grade, parashaSelect) {
        const perekSelect = document.getElementById('perek-select');
        if (!perekSelect) return;
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
            outputDiv.innerHTML = `<div style="border: 1px solid #ddd; padding: 20px; background: #fff; border-radius: 5px;">התוכן האמיתי שייווצר על ידי הבינה המלאכותית יופיע כאן.</div>`;
        }, 1500);
    });

    // הפעלה ראשונית של הלוגיקה
    updateFormVisibility();
});
