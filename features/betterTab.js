import Settings from '../config';

register('renderWorld', () => {
    if (Settings.betterTab) {
    TabList.clearFooter();
    TabList.clearHeader();
    }
})