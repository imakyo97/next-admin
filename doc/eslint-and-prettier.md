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

### eslint-plugin-unused-import

[eslint-plugin-unused-import](https://www.npmjs.com/package/eslint-plugin-unused-imports)は未使用の import を見つけて削除します。

私はプラグインを入れただけだと未使用の import を見つけて削除することはできず、実際には`eslint --fix`を実行するかまたは settings.json で`"source.fixAll.eslint": "always"`を設定する必要がありました。

以下のコマンドでパッケージをインストールします

```shell
npm i -D eslint-plugin-unused-imports
```

インストールができたら`.eslintrc.js`に以下の設定を追加します

```diff
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
+  plugins: ["@typescript-eslint", "unused-imports"],
+  rules: {
+    "@typescript-eslint/no-unused-vars": "off",
+    "unused-imports/no-unused-imports": "error",
+    "unused-imports/no-unused-vars": [
+      "warn",
+      {
+        vars: "all",
+        varsIgnorePattern: "^_",
+        args: "after-used",
+        argsIgnorePattern: "^_",
+      },
+    ],
+  },
};
```

参考：[eslint-plugin-unused-imports(github)](https://github.com/sweepline/eslint-plugin-unused-imports)

### eslint-plugin-import

[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)は import のファイルパスや import 名のスペルミスをチェックします

eslint-plugin-import と合わせて eslint-import-resolver-alias もインストールし、パスエイリアスを設定します

以下のコマンドでパッケージをインストールします

```shell
npm i -D eslint-plugin-import eslint-import-resolver-alias
```

インストールができたら`.eslintrc.js`に以下の設定を追加します

```diff
const path = require("path");

module.exports = {
  ...
+  settings: {
+    "import/resolver": {
+      alias: {
+        map: [
+          ["generated", path.resolve(__dirname, "./src/__generated__")],
+          ["app", path.resolve(__dirname, "./src/app")],
+          ["components", path.resolve(__dirname, "./src/components")],
+          ["generated_rest", path.resolve(__dirname, "./src/generated_rest")],
+          ["gqls", path.resolve(__dirname, "./src/gqls")],
+        ],
+        extensions: [".ts", ".tsx", ".js", ".jsx"],
+      },
+    },
+    "import/ignore": "node_modules",
+  },
  ...
  rules: {
    ...
+    "import/order": [
+      "error",
+      {
+        groups: [
+          "builtin",
+          "external",
+          "internal",
+          "sibling",
+          "parent",
+          "index",
+        ],
+        "newlines-between": "always",
+        alphabetize: {
+          order: "asc",
+          caseInsensitive: true,
+        },
+      },
+    ],
  },
};
```

参考:

- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-import-resolver-alias](https://www.npmjs.com/package/eslint-import-resolver-alias)
- [Next.js で import の alias を貼るのに割とハマった話](https://qiita.com/282Haniwa/items/76d56a6a7e9d0db95a33#%E3%81%BE%E3%81%A8%E3%82%81)
- [Configure ESLint, Prettier and path aliases with Next.js](https://dev.to/luis_sserrano/configure-eslint-prettier-and-path-aliases-with-nextjs-37do)

## husky と lint-staged の設定

husky と lint-staged を使用してコミット前に lint を強制するようにします  
lint を強制することにより lint を通過しないコードは commit できないようにします

[husky](https://typicode.github.io/husky/)とは、Git フックで任意のプログラムを実行するための npm ライブラリです  
[lint-staged](https://github.com/lint-staged/lint-staged)とは、ステージングされたファイルに対して lint を実行するための npm ライブラリです

以下のコマンドでパッケージをインストールします

```shell
npm i -D husky lint-staged
```

パッケージがインストールできたら以下を実行します

```shell
npx husky init
```

すると`package.json`に以下が追加されます。

```diff
  "scripts": {
    ...
+    "prepare": "husky"
  },
```

次に .husky/pre-commit で lint-staged を実行するように設定します  
まず、package.json を以下のように修正します

```diff
  "scripts": {
    ...
+    "lint-staged": "lint-staged"
  },
  ...
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint"
    ]
  }
```

追加できたので、.husky/pre-commit を`npm run lint-staged`に修正します

```shell
echo "npm run lint-staged" > .husky/pre-commit
```

これで`git commit`時にステージングされた`js,ts,jsx,tsx`に対して ESLint を実行できるようになります

参考：[【2024/01 最新】husky + lint-staged でコミット前に lint を強制する方法](https://zenn.dev/risu729/articles/latest-husky-lint-staged)
