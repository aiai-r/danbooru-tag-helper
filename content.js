(function() {
    'use strict';

    const sidebar = document.querySelector('section#tag-list');
    if (!sidebar) return;

    // --- 共通関数: 設定を読み込んでタグを整形 ---
    const formatTags = (tagsRaw, options) => {
        return tagsRaw.map(tag => {
            let t = tag;
            // 設定: アンダースコアをスペースに (デフォルトは true)
            if (options.useSpace !== false) {
                t = t.replace(/_/g, ' ');
            }
            // 設定: カッコをエスケープ (デフォルトは true)
            if (options.useEscape !== false) {
                t = t.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            }
            return t;
        });
    };

    // --- 共通関数: クリップボード処理 ---
    const copyToClipboard = async (text, buttonElement) => {
        if (!text) {
            alert('タグがありません');
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            const originalText = buttonElement.innerText;
            buttonElement.innerText = "OK!";
            setTimeout(() => buttonElement.innerText = originalText, 1000);
        } catch (err) {
            console.error('コピー失敗:', err);
            alert('コピー失敗');
        }
    };

    // --- メイン処理 ---
    const tagLists = sidebar.querySelectorAll('ul');

    tagLists.forEach(ul => {
        // 1. チェックボックス追加
        const listItems = ul.querySelectorAll('li');
        if (listItems.length === 0) return;

        listItems.forEach(li => {
            const link = li.querySelector('a.search-tag');
            if (!link) return;
            const tagName = li.getAttribute('data-tag-name') || link.getAttribute('data-tag-name') || link.innerText;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'dtc-checkbox';
            checkbox.style.marginRight = '5px';
            checkbox.style.cursor = 'pointer';
            checkbox.dataset.tag = tagName;
            li.insertBefore(checkbox, li.firstChild);
        });

        // 2. 操作パネル作成（横並びレイアウト）
        const panel = document.createElement('div');
        // Flexboxで横並び、gapで隙間調整
        panel.style.cssText = "margin: 4px 0 8px 0; display: flex; flex-direction: row; gap: 4px;";

        // ボタン共通スタイル (flex:1 で3等分)
        const btnStyle = "flex: 1; cursor: pointer; font-size: 10px; padding: 4px 0; border: 1px solid #ccc; background: #f9f9f9; border-radius: 3px; text-align: center; white-space: nowrap;";
        // 選択コピーだけ少し色を変える
        const btnPrimaryStyle = btnStyle + " font-weight: bold; background-color: #eef;";

        panel.innerHTML = `
            <button class="dtc-copy-selected" style="${btnPrimaryStyle}">選択コピー</button>
            <button class="dtc-copy-all" style="${btnStyle}">全コピー</button>
            <button class="dtc-select-all" style="${btnStyle}">全選択</button>
            <button class="dtc-clear" style="${btnStyle}">全解除</button>
        `;
        
        ul.parentNode.insertBefore(panel, ul);

        // --- クリックイベント ---
        
        // 設定を読み込むためのヘルパー
        const getOptionsAndCopy = (tagsRaw, btn) => {
            // chrome.storageから設定を取得（デフォルトは true）
            chrome.storage.local.get(['useSpace', 'useEscape'], (result) => {
                // 保存されていない場合はデフォルト値を適用
                const options = {
                    useSpace: result.useSpace !== undefined ? result.useSpace : true,
                    useEscape: result.useEscape !== undefined ? result.useEscape : true
                };
                
                const formatted = formatTags(tagsRaw, options);
                copyToClipboard(formatted.join(', '), btn);
            });
        };

        // [選択コピー]
        panel.querySelector('.dtc-copy-selected').addEventListener('click', (e) => {
            const checked = ul.querySelectorAll('.dtc-checkbox:checked');
            if (checked.length === 0) {
                alert('選択してください');
                return;
            }
            const tags = Array.from(checked).map(cb => cb.dataset.tag);
            getOptionsAndCopy(tags, e.target);
        });

        // [全コピー]
        panel.querySelector('.dtc-copy-all').addEventListener('click', (e) => {
            const all = ul.querySelectorAll('.dtc-checkbox');
            const tags = Array.from(all).map(cb => cb.dataset.tag);
            getOptionsAndCopy(tags, e.target);
        });

        // [全選択]
        panel.querySelector('.dtc-select-all').addEventListener('click', () => {
            ul.querySelectorAll('.dtc-checkbox').forEach(cb => cb.checked = true);
        });

        // [全解除]
        panel.querySelector('.dtc-clear').addEventListener('click', () => {
            ul.querySelectorAll('.dtc-checkbox').forEach(cb => cb.checked = false);
        });
    });
})();
