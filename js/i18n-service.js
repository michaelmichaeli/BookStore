var gTrans = {
    title: {
        en: 'CRUDL with MVC in mind',
        he: 'CRUDL ספרים עם מודל MVC'
    },
    subtitle: {
        en: 'CREATE | READ | UPDATE | DELETE | LIST',
        he: 'CREATE | READ | UPDATE | DELETE | LIST'
    },
    'addBookTitle': {
        en: 'Book Title:',
        he: 'כותר הספר:'
    },
    'addBookPrice': {
        en: 'Book Price:',
        he: 'מחיר הספר:'
    },
    'addBookSubmit': {
        en: 'Submit',
        he: 'שלח'
    },
    'addBookBtn': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'nextPage': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'previousPage': {
        en: 'Previous Page',
        he: 'עמוד קודם'
    },
    'tId': {
        en: 'ID',
        he: 'מק"ט'
    },
    'tCover': {
        en: 'Cover',
        he: 'כריכה'
    },
    'tBookTitle': {
        en: 'Book Title',
        he: 'כותר הספר'
    },
    'tPrice': {
        en: 'Price',
        he: 'מחיר'
    },
    'tActions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'tRead': {
        en: 'Read 📑',
        he: ' 📑 קרא'
    },
    'tUpdate': {
        en: 'Update 📲',
        he: ' 📲 עדכן'
    },
    'tDelete': {
        en: 'Delete ❌',
        he: '❌ מחק'
    },
    'closeModalBtn': {
        en: 'close',
        he: 'סגור'
    },
    'currency': {
        en: '$',
        he: '₪'
    }
}

var gCurrLang = 'en';

function _getTrans(transKey) {
    // Get from gTrans
    var langTransMap = gTrans[transKey]
    // If key is unknown return 'UNKNOWN'
    if (!langTransMap) return 'UNKNOWN';
    
    // If translation not found - use english
    var trans = langTransMap[getLang()]
    if (!trans) trans = langTransMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    // console.log('els', els);
    els.forEach(el =>{
        const key = el.dataset.trans;
        const trans = _getTrans(key)

        if (el.placeholder)  el.placeholder = trans
        else el.innerText = trans
    })
}



function onSetLang(lang) {
    setLang(lang);
    saveToStorage('booksFavLang', lang);
    setRtlIfHebrew(lang);
    doTrans();
}

function setRtlIfHebrew(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl');
}

function setLang(lang) {
    gCurrLang = lang;
}

function getLang() {
    return loadFromStorage('booksFavLang') || gCurrLang;
}

/*
function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
    // return moment(new Date(time), "YYYYMMDD").fromNow();
}

function kmToMiles(km) {
    return km / 1.609;
}
*/