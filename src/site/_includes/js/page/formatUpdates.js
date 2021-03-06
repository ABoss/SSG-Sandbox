// Card toggle filters
const toggleSections = document.querySelectorAll(`[data-show-states]`);
const formatFilters = document.querySelector(`#formatFilter`).querySelectorAll(`[id^='filter-']`);
const factionFilters = document.querySelector(`#factionFilters`).querySelectorAll(`[id^='filter-']`);
const stateFilters = document.querySelector(`#stateFilters`).querySelectorAll(`[id^='filter-']`);

formatFilters.forEach((toggle) => {
  toggle.addEventListener('change', () => {
    let update = toggle.dataset.filterFormat;
  
    toggleSections.forEach((section) => {
      section.dataset.showFormat = update;
    });
  });
});

let factionsShown = [];
let statesShown = [];

function show(arr, value) {
  arr = arr.push(value);
};

function hide(arr, value) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr = arr.splice(index, 1);
  }
};

factionFilters.forEach((toggle) => {
  let faction = toggle.dataset.filterFaction;
  show( factionsShown, faction);
  toggle.addEventListener('change', () => {
    updateFilters(toggle, factionsShown, 'filterFaction', 'showFactions');
  });
});

stateFilters.forEach((toggle) => {
  let state = toggle.dataset.filterState;
  show( statesShown, state);
  toggle.addEventListener('change', () => {
    updateFilters(toggle, statesShown, 'filterState', 'showStates');
  });
});

function updateFilters(toggle, array, toggleValue, sectionValue) {
  let update = toggle.dataset[toggleValue];
  toggle.checked ? show( array, update) : hide( array, update);
  toggleSections.forEach((section) => {
    section.dataset[sectionValue] = array.join(' ');
  });
};