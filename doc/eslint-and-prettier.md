# Next.jsでESLintとPrettierを設定
## 拡張機能のインストール
VSCodeでESLintとPrettierを使用するため、拡張機能をインストールします。  
拡張機能をインストール後に`settings.json`を設定することで、エディターでlintとformatterを使用できるようになります。  
[ESLintの拡張機能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
[Prettierの拡張機能](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Prettierをフォーマッターに設定し、ESLintで自動整形するようにするため以下のようなsettings.jsonを作成します
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.addMissingImports": "always",
    "source.fixAll.eslint": "always"
  },
  "files.insertFinalNewline": true
}

```

## Next.jsのESLint
Next.jsではプロジェクト作成時にESLintを使用するか選択することができます  
ESLintを使用するを選択すると`eslint-config-next`がデフォルトでインストールされます  
`eslint-config-next`はESLintの推奨設定が含まれたパッケージのようです  
>eslint-config-nextでは以下のESLintプラグインの推奨ルールセットを使用します：
>
>- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)  
>- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)  
>- [eslint-plugin-next](https://www.npmjs.com/package/@next/eslint-plugin-next)
>
>※引用：[https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config](https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config)

## ESLintの設定ファイル作成
https://eslint.org/docs/latest/use/configure/configuration-files

## .eslintignoreファイルの作成

## ESLintの拡張と追加

