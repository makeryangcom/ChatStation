import {createI18n} from "vue-i18n";
import en from "./en";
import zh from './zh';

const messages = {
    en: en,
    zh: zh
};

const Lang = createI18n({
    legacy: false,
    locale: localStorage.getItem("nodechain:lang") ? localStorage.getItem("nodechain:lang") + "" : "null",
    fallbackLocale: "en",
    messages,
});

export default Lang;