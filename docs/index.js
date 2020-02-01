(async () => {
  const pretty3Module = await import('https://dev.jspm.io/npm:pretty3@1.0.0-alpha.1');
  const Pretty = pretty3Module.default.Pretty;
  const themes = pretty3Module.default.themes;
  const renderers = pretty3Module.default.renderers;

  const exampleTree = {
    longText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
    maynardBirthDate: new Date('1964-04-17'),
    someSymbol: Symbol('Fortune'),
    capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
    regularArray: [0, 0.25, 0.5, {wow: 'surprize! there is is an object among numbers'}, 0.75],
    funError: new RangeError('Pizza size is too big'),
  };
  const data = {
    'simple': {
      a: 'b',
      c: 'd',
      pi: Math.PI,
    },
    'some else': {
      err: new RangeError('out of azaza'),
      z: new Boolean(true),
      e: Math.E,
    },
    'another': exampleTree,
  };
  const themeStack = {
    'default': {
      'standart': [ themes.defaultTheme ],
    },
    'smart': {
      'standart': [ themes.smart.standart ],
      'safe ansi': [ themes.smart.safeAnsi ],
      'rich fonts': [ themes.smart.richFonts ],
    },
    'smart with no simple icons': {
      'standart': [ themes.smart.standart, themes.mods.noSimpleIcon ],
      'safe ansi': [ themes.smart.safeAnsi, themes.mods.noSimpleIcon ],
      'rich fonts': [ themes.smart.richFonts, themes.mods.noSimpleIcon ],
    },
  };

  const renderer = new renderers.HtmlRenderer();
  const demoScreenTextDiv = document.getElementById('demo-screen-text');
  const select = {
    theme: document.getElementById('dropdown-select--theme'),
    data: document.getElementById('dropdown-select--data'),
    palette: document.getElementById('dropdown-select--palette'),
  }
  const selectedKey = {
    data: undefined,
    theme: undefined,
    palette: undefined,
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

  function initSelects() {
    initSelect('data', data);
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
    updateScreenText();
  }
  select.theme.onchange = () => {
    readSelectedKeyFromNode('theme');
    initSelect('palette', themeStack[selectedKey.theme]);
    updateScreenText();
  }
  select.palette.onchange = () => {
    readSelectedKeyFromNode('palette');
    updateScreenText();
  }

  function updateScreenText() {
    const selectedData = data[selectedKey.data];
    const selectedThemeStackSet = themeStack[selectedKey.theme];
    const selectedThemeStack = selectedThemeStackSet[selectedKey.palette];
    const options = {
      themeStack: selectedThemeStack,
      renderer,
    }
    demoScreenTextDiv.innerHTML = Pretty.stringify(selectedData, options);
  }

  initSelects();
  updateScreenText();


})();