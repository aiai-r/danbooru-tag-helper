document.addEventListener('DOMContentLoaded', () => {
    const cbSpace = document.getElementById('opt-space');
    const cbEscape = document.getElementById('opt-escape');

    // 1. 保存された設定を読み込んでチェックボックスに反映
    // (デフォルトは true に設定)
    chrome.storage.local.get(['useSpace', 'useEscape'], (result) => {
        cbSpace.checked = result.useSpace !== undefined ? result.useSpace : true;
        cbEscape.checked = result.useEscape !== undefined ? result.useEscape : true;
    });

    // 2. チェックボックスが変更されたら保存
    cbSpace.addEventListener('change', () => {
        chrome.storage.local.set({ useSpace: cbSpace.checked });
    });

    cbEscape.addEventListener('change', () => {
        chrome.storage.local.set({ useEscape: cbEscape.checked });
    });
});