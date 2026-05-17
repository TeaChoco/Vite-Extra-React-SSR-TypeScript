//-Path: "TeaChoco-Portfolio/client/src/components/LanguageSwitcher.tsx"
import Select from '../custom/Select';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'th', label: 'ไทย', flag: '🇹🇭' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
] as const;

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languageOptions = languages.map((lang) => ({
        value: lang.code,
        label: lang.label,
        icon: <span className='text-lg leading-none'>{lang.flag}</span>,
    }));

    return (
        <Select
            value={i18n.language}
            options={languageOptions}
            className='py-3! px-4! rounded-lg! text-xs'
            onChange={(lng) => i18n.changeLanguage(lng)}
        />
    );
}
