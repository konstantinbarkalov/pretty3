import { prebuildTheme } from '../pretty/theme/prebuild';
import { theme as defaultTheme } from '../pretty/theme/themes/smart';
import { fallback } from '../pretty/theme/fallback';
const prebuilded = prebuildTheme([defaultTheme], fallback);
console.log(prebuilded);