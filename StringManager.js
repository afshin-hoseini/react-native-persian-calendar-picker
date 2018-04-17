export class StringManager {
    static convertEnglishNumbersToPersian(text) {
        if (!text)
            return text;
        text = text.replace(new RegExp("0", 'g'), "\u06F0");
        text = text.replace(new RegExp("1", 'g'), "\u06F1");
        text = text.replace(new RegExp("2", 'g'), "\u06F2");
        text = text.replace(new RegExp("3", 'g'), "\u06F3");
        text = text.replace(new RegExp("4", 'g'), "\u06F4");
        text = text.replace(new RegExp("5", 'g'), "\u06F5");
        text = text.replace(new RegExp("6", 'g'), "\u06F6");
        text = text.replace(new RegExp("7", 'g'), "\u06F7");
        text = text.replace(new RegExp("8", 'g'), "\u06F8");
        text = text.replace(new RegExp("9", 'g'), "\u06F9");
        return text;
    }
    static withEnglishNumbers(text) {
        // Persian Numbers
        text = text.replace(new RegExp("۰", 'g'), "0");
        text = text.replace(new RegExp("۱", 'g'), "1");
        text = text.replace(new RegExp("۲", 'g'), "2");
        text = text.replace(new RegExp("۳", 'g'), "3");
        text = text.replace(new RegExp("۴", 'g'), "4");
        text = text.replace(new RegExp("۵", 'g'), "5");
        text = text.replace(new RegExp("۶", 'g'), "6");
        text = text.replace(new RegExp("۷", 'g'), "7");
        text = text.replace(new RegExp("۸", 'g'), "8");
        text = text.replace(new RegExp("۹", 'g'), "9");
        // Arabic Numbers
        text = text.replace(new RegExp("٠", 'g'), "0");
        text = text.replace(new RegExp("١", 'g'), "1");
        text = text.replace(new RegExp("٢", 'g'), "2");
        text = text.replace(new RegExp("٣", 'g'), "3");
        text = text.replace(new RegExp("٤", 'g'), "4");
        text = text.replace(new RegExp("٥", 'g'), "5");
        text = text.replace(new RegExp("٦", 'g'), "6");
        text = text.replace(new RegExp("٧", 'g'), "7");
        text = text.replace(new RegExp("٨", 'g'), "8");
        text = text.replace(new RegExp("٩", 'g'), "9");
        return text;
    }
}
