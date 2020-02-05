'use strict';

const current = {
  themeStack: [],
  maxLineWidth: 60,
}

async function runSource(source) {
  let getDataCatcher = {fn: undefined};

  try {
    eval(source + '; getDataCatcher.fn = getData');
  } catch (e) {
    return {problem: 'error happends while evaluating code', error: e};
  }
  if (typeof getDataCatcher.fn !== 'function') {
    return {problem: 'no function named getData found in evaluated code'};
  }

  try {
    const data = await getDataCatcher.fn();
    return data;
  } catch (e) {
    return {problem: 'error happends while running code', error: e};
  }
}

(async () => {
  const pretty3Module = await import('https://dev.jspm.io/npm:pretty3@0');
  const Pretty = pretty3Module.default.Pretty;
  const themes = pretty3Module.default.themes;
  const renderers = pretty3Module.default.renderers;
  const themeStack = {
    'smart': {
      'standart': [themes.smart.standart],
      'safe ansi': [themes.smart.safeAnsi],
      'rich fonts': [themes.smart.richFonts],
    },
    'smart with no simple icons': {
      'standart': [themes.smart.standart, themes.mods.noSimpleIcon],
      'safe ansi': [themes.smart.safeAnsi, themes.mods.noSimpleIcon],
      'rich fonts': [themes.smart.richFonts, themes.mods.noSimpleIcon],
    },
    'legacy': {
      'standart': [themes.legacy.standart],
    },
    'plating': {
      'standart': [themes.plating.standart],
      'cute': [themes.plating.cute],
      'alternative': [themes.plating.alternative],
    },
    'plating with no simple icons': {
      'standart': [themes.plating.standart, themes.mods.noSimpleIcon],
      'cute': [themes.plating.cute, themes.mods.noSimpleIcon],
      'alternative': [themes.plating.alternative, themes.mods.noSimpleIcon],
    },
    'plating with no icons': {
      'standart': [themes.plating.standart, themes.mods.noIcon],
      'cute': [themes.plating.cute, themes.mods.noIcon],
      'alternative': [themes.plating.alternative, themes.mods.noIcon],
    },
  };

  const renderer = new renderers.HtmlRenderer();
  const demoScreenTextOutputDiv = document.getElementById('demo-screen-text--output');
  const demoScreenTextSourceDiv = document.getElementById('demo-screen-text--source');
  const select = {
    theme: document.getElementById('dropdown-select--theme'),
    data: document.getElementById('dropdown-select--data'),
    palette: document.getElementById('dropdown-select--palette'),
  };
  const selectedKey = {
    data: undefined,
    theme: undefined,
    palette: undefined,
  };
  function startWelcomeAnimation() {
    const appRoot = document.getElementById('app-root');
    appRoot.classList.add('app-root--ready');
  }
  function initSelect(selectKey, options) {
    const currentSelect = select[selectKey];
    while (currentSelect.firstChild) {
      currentSelect.removeChild(currentSelect.firstChild);
    }
    Object.keys(options).forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.innerText = key; // whatever property it has
      // then append it to the select element
      currentSelect.appendChild(option);
    });
    readSelectedKeyFromNode(selectKey);
  }

  function initSelectsFromPredefinedInputData() {
    initSelect('data', predefinedInputData);
    initSelect('theme', themeStack);
    const paletteKey = Object.keys(themeStack)[0];
    initSelect('palette', themeStack[paletteKey]);
  }
  function readSelectedKeyFromNode(selectKey) {
    const currentSelect = select[selectKey];
    selectedKey[selectKey] = currentSelect.options[currentSelect.selectedIndex].value;
  }
  function writeSelectedKeyToNode(selectKey) {
    const currentSelect = select[selectKey];
    currentSelect.value = selectedKey[selectKey];
  }

  select.data.onchange = () => {
    readSelectedKeyFromNode('data');
    updateScreenTextFromPredefinedInputData();
  };
  select.theme.onchange = () => {
    readSelectedKeyFromNode('theme');
    initSelect('palette', themeStack[selectedKey.theme]);
    updateScreenTextFromPredefinedInputData();
  };
  select.palette.onchange = () => {
    readSelectedKeyFromNode('palette');
    updateScreenTextFromPredefinedInputData();
  };
  function updateScreenTextFromPredefinedInputData() {
    const source = updateScreenTextSourceFromPredefinedInputData();
    updateScreenTextOutput(source);
  }
  function updateScreenTextSourceFromPredefinedInputData() {
    const selectedDataSource = predefinedInputData[selectedKey.data].source;
    demoScreenTextSourceDiv.innerText = selectedDataSource;
    //Prism.highlightElement(demoScreenTextSourceDiv);
    return selectedDataSource;

  }
  async function updateScreenTextOutput(source) {
    const selectedThemeStackSet = themeStack[selectedKey.theme];
    const selectedThemeStack = selectedThemeStackSet[selectedKey.palette];
    const options = {
      themeStack: selectedThemeStack,
      maxLineWidth: 60,
      renderer,
    };
    const data = await runSource(source);
    demoScreenTextOutputDiv.innerHTML = Pretty.stringify(data, 'getData() result', options);
  }

  initSelectsFromPredefinedInputData();
  updateScreenTextFromPredefinedInputData();
  function onSourceUpdateByUser(e) {
    const source = e.target.innerText;
    updateScreenTextOutput(source);
  }
  demoScreenTextSourceDiv.addEventListener('input', onSourceUpdateByUser);
  demoScreenTextSourceDiv.addEventListener('paste', (e) => {
    // from: https://stackoverflow.com/questions/12027137/javascript-trick-for-paste-as-plain-text-in-execcommand

    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand('insertHTML', false, text);
    return false;
  });

  // start here
  startWelcomeAnimation();
})();