# Danbooru Tag Helper

Danbooruの投稿ページ（Posts）で、タグを個別に選択してクリップボードにコピーするためのChrome拡張機能です。
以前普及していたツールが動作しなくなったため、同様の機能を持つ代替ツールとして新規に開発しました。

This is a Chrome extension to select and copy tags on Danbooru post pages.
Created as an alternative since the previously popular tool stopped working.

## Features (機能)

* **Checkbox Selection**: 各タグの横にチェックボックスを表示し、必要なタグだけを選択できます。
* **Section Control**: `Artist`, `Character`, `General` などのセクションごとに「選択コピー」「全コピー」「全解除」が可能です。
* **Formatting Options**: 拡張機能のアイコンをクリックして、以下の設定を切り替えられます。
    * アンダースコアをスペースに置換 (`_` -> ` `)
    * 括弧をエスケープ (`(` -> `\(`)

## Installation (インストール方法)

この拡張機能はChromeウェブストアには公開していません。以下の手順で導入してください。
This extension is not on the Chrome Web Store. Please follow the steps below.

### Method A: Git (Recommended)
アップデート管理が簡単です。 / Easier to update.

1.  Clone this repository.
    ```bash
    git clone [https://github.com/YourUserName/danbooru-tag-helper.git](https://github.com/YourUserName/danbooru-tag-helper.git)
    ```
2.  Open Chrome and go to `chrome://extensions/`.
3.  Enable **"Developer mode"** (top right).
4.  Click **"Load unpacked"** and select the cloned folder.

### Method B: ZIP Download
1.  Download the ZIP file from the [Releases](../../releases) page.
2.  Unzip the file.
3.  Open Chrome and go to `chrome://extensions/`.
4.  Enable **"Developer mode"** (top right).
5.  Click **"Load unpacked"** and select the unzipped folder.

## Usage (使い方)

1.  Open a Danbooru post page.
2.  Check the boxes for the tags you want to copy.
3.  Click **"選択コピー (Copy Selected)"** or **"全コピー (Copy All)"** above each tag section.
4.  (Optional) Click the extension icon in the toolbar to toggle formatting settings.

## Credits / Inspiration

このツールは、以下の素晴らしい拡張機能を参考に（リスペクトし）、その代替として作成されました。
This tool is inspired by the following repository and was built as an alternative.

* **[Danbooru-Tags-Exporter](https://github.com/FSpark/Danbooru-Tags-Exporter)** by FSpark

## License

[AGPL-3.0](./LICENSE)