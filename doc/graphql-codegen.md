# GraphQLからTSファイルを自動生成
Apollo Clientを使ってクライアントのコード（TS）を自動生成する
## 1. パッケージのインストール
以下のコマンドで`@graphql-codegen`のパッケージをインストール
```shell
npm install -D @graphql-codegen/cli @graphql-codegen/client-preset
```
インストールが完了したら、package.jsonにスクリプトを追加する
```json
"scripts": {
  ...
  "generate": "graphql-codegen"
},
```

## 2. 構成ファイルの定義
プロジェクトのルートに以下のようなcodegen.tsファイルを作成
```ts
import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
    schema: 'http://localhost:8000/graphql',
    documents: ['src/**/*.tsx'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true, 
};
 
export default config
```
### schema
GraphQLサーバーのエンドポイントを定義する  
graphql-codegenはこのアドレスを参照して、サーバーのスキーマ内の型とフィールドを読み込みます  
### documents
graphql-codegenがフロントエンドの型を生成する際に考慮すべきドキュメントを定義する  
コードはすべてsrcフォルダーに含まれており、srcのすべてのサブフォルダーのファイルも探すようにします    
最後に、.tsxで終わるファイルのみをスキャンするように設定します  
### generates
生成したコードをどこに出力するかを定義する    
`src`の下に`__generated__`というフォルダを作成し、生成したコードを配置する

`preset: 'client'`でpreset-clientを設定する  
preset-clientはGraphQLクライアントと完全に統合することで、GraphQLを操作するコードを生成する設定  
以前は使用するGraphQLクライアントに合わせてカスタムフックを生成するプラグインが必要だったが、preset-clientを使用することでそのプラグインが不要になるとのこと  
詳しくは[preset-client](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)を確認

preset-clientについて参考:
- https://zenn.dev/mh4gf/articles/graphql-codegen-client-preset
- https://zenn.dev/layerx/articles/028cb518cffd61

`gqlTagName: "gql"`でクエリを操作する関数名を`gql`に設定する  
設定しない場合、デフォルトでの関数名が`graphql`になる  

## 3. 自動生成の実行
codegen.tsファイルに`ignoreNoDocuments: true`を設定することで、コード生成時にフロントエンドのコードでGraphQL操作が見つからなくても無視するように設定できる  

`ignoreNoDocuments: true`を設定したら、以下のコマンドを実行しコードを生成する
```shell
npm run generate
```

参考:
- https://www.apollographql.com/tutorials/client-side-graphql-react/05-codegen
- https://the-guild.dev/graphql/codegen/docs/guides/react-vue
