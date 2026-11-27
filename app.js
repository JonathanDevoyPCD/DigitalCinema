(() => {
  'use strict';

  const storageKey = 'digital-slate-v1';
  const $ = (id) => document.getElementById(id);
  const fields = {
    scene: $('scene-input'),
    shot: $('shot-input'),
    take: $('take-input'),
    sceneName: $('scene-name-input'),
    description: $('description-input'),
    location: $('location-input'),
    setup: $('setup-input')
  };
  let state = { sceneId: SLATE_DATA[0].id, shotId: SLATE_DATA[0].shots[0].id, project: 'Mission Possible', edits: {} };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object' && saved.edits && typeof saved.edits === 'object') {
      state = { ...state, ...saved };
    }
  } catch (error) {
    $('storage-warning').hidden = false;
  }

  function currentScene() {
    return SLATE_DATA.find((scene) => scene.id === state.sceneId) || SLATE_DATA[0];
  }

  function currentShot() {
    return currentScene().shots.find((shot) => shot.id === state.shotId) || currentScene().shots[0];
  }

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      $('storage-warning').hidden = false;
    }
  }

  function values() {
    const scene = currentScene();
    const shot = currentShot();
    return {
      scene: scene.id, shot: shot.id, take: 1, sceneName: scene.name, description: shot.description,
      location: scene.location, setup: '', ...state.edits[shot.id]
    };
  }

  function updateField(key, value) {
    const shot = currentShot();
    state.edits[shot.id] = { ...state.edits[shot.id], [key]: value };
    save();
    renderPreview();
  }

  function renderScenes() {
    const list = $('scene-list');
    list.replaceChildren();
    $('scene-count').textContent = String(SLATE_DATA.length).padStart(2, '0');
    for (const scene of SLATE_DATA) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'scene-button' + (scene.id === currentScene().id ? ' active' : '');
      button.setAttribute('aria-current', scene.id === currentScene().id ? 'true' : 'false');
      const number = document.createElement('span');
      number.className = 'scene-number';
      number.textContent = scene.id;
      const name = document.createElement('span');
      name.className = 'scene-name';
      name.textContent = scene.name;
      const arrow = document.createElement('span');
      arrow.className = 'scene-arrow';
      arrow.textContent = '↗';
      button.append(number, name, arrow);
      button.addEventListener('click', () => {
        state.sceneId = scene.id;
        state.shotId = scene.shots[0].id;
        save();
        render();
      });
      list.append(button);
    }
  }

  function renderSuggestions() {
    const container = $('suggestions');
    container.replaceChildren();
    if (!currentShot().coverage.length) {
      const guidance = document.createElement('span');
      guidance.className = 'suggestion-empty';
      guidance.textContent = 'Choose framing, angle and movement on set.';
      container.append(guidance);
    }
    for (const coverage of currentShot().coverage) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = coverage;
      button.className = coverage === fields.setup.value ? 'selected' : '';
      button.addEventListener('click', () => {
        fields.setup.value = coverage;
        updateField('setup', coverage);
        renderSuggestions();
      });
      container.append(button);
    }
  }

  function renderPreview() {
    const data = values();
    const text = {
      scene: data.scene || '—', shot: data.shot || '—', take: data.take || 1,
      description: data.description || '—', setup: data.setup || 'Not selected',
      location: data.location || '—', 'scene-name': data.sceneName || '—',
      project: state.project || '—'
    };
    for (const [key, value] of Object.entries(text)) {
      for (const prefix of ['preview-', 'present-']) {
        const element = $(prefix + key);
        if (element) element.textContent = value;
      }
      $('sidebar-project').textContent = state.project || '—';
    }
    fitPresentationNumbers();
  }

  function fitPresentationNumbers() {
    for (const id of ['present-scene', 'present-shot', 'present-take']) {
      const element = $(id);
      element.style.fontSize = '';
      if ($('presentation').hidden) continue;
      let size = parseFloat(getComputedStyle(element).fontSize);
      while (element.scrollWidth > element.clientWidth && size > 8) {
        size -= 1;
        element.style.fontSize = size + 'px';
      }
    }
  }

  function render() {
    const scene = currentScene();
    const shot = currentShot();
    state.sceneId = scene.id;
    state.shotId = shot.id;
    renderScenes();
    $('heading-scene').textContent = scene.id === 'B' ? 'B-ROLL' : 'SCENE ' + scene.id;
    const select = $('shot-select');
    select.replaceChildren();
    for (const item of scene.shots) {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.id + '  —  ' + item.description;
      select.append(option);
    }
    select.value = shot.id;
    const data = values();
    for (const [key, field] of Object.entries(fields)) field.value = data[key];
    $('project-input').value = state.project;
    renderSuggestions();
    renderPreview();
    const sceneIndex = SLATE_DATA.indexOf(scene);
    const shotIndex = scene.shots.indexOf(shot);
    $('previous-scene').disabled = sceneIndex === 0;
    $('next-scene').disabled = sceneIndex === SLATE_DATA.length - 1;
    $('previous-shot').disabled = sceneIndex === 0 && shotIndex === 0;
    $('next-shot').disabled = sceneIndex === SLATE_DATA.length - 1 && shotIndex === scene.shots.length - 1;
  }

  function navigateScene(offset) {
    const index = SLATE_DATA.indexOf(currentScene()) + offset;
    const scene = SLATE_DATA[index];
    if (!scene) return;
    state.sceneId = scene.id;
    state.shotId = scene.shots[0].id;
    save();
    render();
  }

  function navigateShot(offset) {
    const scene = currentScene();
    const shotIndex = scene.shots.indexOf(currentShot()) + offset;
    let targetScene = scene;
    let targetShot = scene.shots[shotIndex];
    if (!targetShot) {
      targetScene = SLATE_DATA[SLATE_DATA.indexOf(scene) + offset];
      if (!targetScene) return;
      targetShot = offset > 0 ? targetScene.shots[0] : targetScene.shots[targetScene.shots.length - 1];
    }
    state.sceneId = targetScene.id;
    state.shotId = targetShot.id;
    save();
    render();
  }

  function setTake(value) {
    const take = Math.max(1, Math.min(9999, Number.parseInt(value, 10) || 1));
    fields.take.value = take;
    updateField('take', take);
  }

  $('shot-select').addEventListener('change', (event) => {
    state.shotId = event.target.value;
    save();
    render();
  });
  $('project-input').addEventListener('input', (event) => {
    state.project = event.target.value;
    save();
    renderPreview();
  });
  for (const [key, field] of Object.entries(fields)) {
    if (key === 'take') {
      field.addEventListener('change', () => setTake(field.value));
    } else {
      field.addEventListener('input', () => {
        updateField(key, field.value);
        if (key === 'setup') renderSuggestions();
      });
    }
  }
  $('take-minus').addEventListener('click', () => setTake(Number(fields.take.value) - 1));
  $('take-plus').addEventListener('click', () => setTake(Number(fields.take.value) + 1));
  $('present-next').addEventListener('click', () => setTake(Number(fields.take.value) + 1));
  $('previous-scene').addEventListener('click', () => navigateScene(-1));
  $('next-scene').addEventListener('click', () => navigateScene(1));
  $('previous-shot').addEventListener('click', () => navigateShot(-1));
  $('next-shot').addEventListener('click', () => navigateShot(1));
  $('present-button').addEventListener('click', () => {
    setTake(fields.take.value);
    $('editor').hidden = true;
    $('presentation').hidden = false;
    renderPreview();
    $('back-button').focus();
  });
  $('back-button').addEventListener('click', () => {
    $('presentation').hidden = true;
    $('editor').hidden = false;
    $('present-button').focus();
  });
  window.addEventListener('resize', fitPresentationNumbers);
  if (document.fonts) document.fonts.ready.then(fitPresentationNumbers);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('presentation').hidden) $('back-button').click();
  });
  render();
})();
