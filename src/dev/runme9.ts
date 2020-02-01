import { prebuildTheme } from '../pretty/theme/prebuildTheme';
import { smart } from '../pretty/theme/themes/smart';
import { fallback } from '../pretty/theme/fallback';
const defaultTheme = smart.standart;
const prebuilded = prebuildTheme([defaultTheme], fallback);
console.log(prebuilded);