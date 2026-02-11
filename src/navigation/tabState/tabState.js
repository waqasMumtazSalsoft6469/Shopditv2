export let currentTab = null;
export let previousTab = null;

export const setCurrentTab = (tabName) => {
  previousTab = currentTab;
  currentTab = tabName;
};