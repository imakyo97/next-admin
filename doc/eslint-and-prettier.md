# Next.js で ESLint と Prettier を設定

## 拡張機能のインストール

VSCode で ESLint と Prettier を使用するため、拡張機能をインストールします  
拡張機能をインストール後に`settings.json`を設定することで、エディターで lint と formatter を使用できるようになります  
[ESLint の拡張機能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
[Prettier の拡張機能](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Prettier をフォーマッターに設定し、ESLint で自動整形するようにするため以下のような settings.json を作成します

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

## Next.js の ESLint

Next.js ではプロジェクト作成時に ESLint を使用するか選択することができます  
ESLint を使用するを選択すると`eslint-config-next`がデフォルトでインストールされます  
`eslint-config-next`は ESLint の推奨設定が含まれたパッケージのようです

> eslint-config-next では以下の ESLint プラグインの推奨ルールセットを使用します：
>
> - [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
> - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
> - [eslint-plugin-next](https://www.npmjs.com/package/@next/eslint-plugin-next)
>
> ※引用：[https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config](https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config)

## ESLint の設定ファイル作成

ESLint の設定ファイル(`.eslintrc.*`)を作成します  
`.eslintrc.*`は同じディレクトリに複数の設定ファイルがある場合、ESLint は一つのみを使用します  
`.eslintrc.js`から順に優先するようになっているため、デフォルトで作成される.`eslintrc.json`は削除し`.eslintrc.js`を作成します

```js
module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  plugins: [],
  rules: {},
};
```

参考：[設定ファイル(ESLint ドキュメント)](https://eslint.org/docs/latest/use/configure/configuration-files)

## .eslintignore ファイルの作成

ESLint を実行から特定のファイルとディレクトリを無視するように設定します  
設定方法は 2 通りあり、

- ignorepatterns を`.eslintrc.*`に追加する方法
- .eslintingnore ファイルを作成する方法

の 2 通りがあります

今回は.eslintignore ファイルを作成する方法で設定を行います  
プロジェクトのルートディレクトリに.eslintignore を作成します

```.eslintignore
.next/*
env/*
node_modules/*
public/*
```

参考：[ファイルを無視する(ESLint ドキュメント)](https://eslint.org/docs/latest/use/configure/ignore)

## ESLint パッケージ追加

eslint-config-next 以外の必要なパッケージを追加していきます。

### typescript-eslint

[typescript-eslint](https://typescript-eslint.io)は ESLint と Prettier が TypeScript をサポートできるようにするツールです  
以下のコマンでパッケージをインストールします  
[ドキュメント](https://typescript-eslint.io/getting-started/legacy-eslint-setup)では`@typescript-eslint/parser`, `eslint`, `typescript`もコマンドに記載されていますが、Next.js プロジェクトにすでに含まれているため以下のコマンドには含めていません

```shell
npm i -D @typescript-eslint/eslint-plugin
```

インストールができたら`.eslintrc.js`に以下の設定を追加します

```diff
module.exports = {
  root: true,
+  parser: "@typescript-eslint/parser",
+  extends: ["plugin:@typescript-eslint/recommended", "next/core-web-vitals"],
+  plugins: ["@typescript-eslint"],
  rules: {},
};

```

各設定についての解説

> - `parser: '@typescript-eslint/parser'`ESLint に、インストールした`@typescript-eslint/parser` パッケージを使用してソース ファイルを解析するように指示します。
>   - これは必須です。そうでない場合、ESLint は TypeScript コードを通常の JavaScript であるかのように解析しようとしてエラーをスローします。
> - `plugins: ['@typescript-eslint']`ESLint に`@typescript-eslint/eslint-plugin` パッケージをプラグインとしてロードするように指示します。
>   - これにより、コードベース内で typescript-eslint のルールを使用できるようになります。
> - `extends: [ ... ]`あなたの設定が指定された設定を拡張することを ESLint に伝えます。
>   - `plugin:@typescript-eslint/recommended` は「推奨」構成です。これは `eslint:recommended`と似ていますが、プラグインから TypeScript 固有のルールを有効にする点が異なります。
> - `root: true` このファイルがプロジェクトで使用されるルートレベルのファイルであり、ESLint がこのディレクトリを超えて構成ファイルを検索しないことを示すのは、一般的に良い ESLint の実践方法です。  
>   ※引用：[https://typescript-eslint.io/getting-started/legacy-eslint-setup](https://typescript-eslint.io/getting-started/legacy-eslint-setup)

参考：[従来の ESLint セットアップ(ドキュメント)](https://typescript-eslint.io/getting-started/legacy-eslint-setup)

### prettier

[prettier](https://prettier.io/docs/en/)はコードを一貫したスタイルに統一するためのコードフォーマッタです  
ESLint で Prettier を使用できるようにするため以下 2 つのパッケージをインストールします

- `eslint-plugin-prettier`：Prettier を ESLint のルールとして実行できるようにするパッケージ
- `eslint-config-prettier`：Prettier と競合する ESLint ルールをオフにするパッケージ

以下のコマンドでパッケージをインストールします

```shell
npm i -D eslint-plugin-prettier eslint-config-prettier
npm i -D -E prettier
```

インストールができたら`.eslintrc.js`に以下の設定を追加します  
`extends`の最後に`"plugin:prettier/recommended"`を追加します

```diff
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
+    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {},
};
```

参考：[eslint-plugin-prettier(github)](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file)

###
