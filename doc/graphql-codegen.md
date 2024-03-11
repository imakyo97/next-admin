# GraphQLからTSファイルを自動生成
GraphQL Code Generatorを使ってクライアントのコード（TS）を自動生成する
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
codegenファイルは`.ts`以外に`.yaml`として使用することができる。<br>
しかしtypescriptの方がyamlと比べて機能が充実しており、記法としても新しいため本プロジェクトではtypescriptに自動生成の設定を記載する。  
[参考資料](https://zenn.dev/layerx/articles/028cb518cffd61)

プロジェクトのルートに以下のようなcodegen.tsファイルを作成
```ts
import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
    schema: 'http://localhost:8000/graphql',
    documents: ['src/**/*.graphql'],
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
最後に、`.graphql`で終わるファイルのみをスキャンするように設定します  
この設定によりGraphQL操作（query, mutation）が自動生成コードに読み込まれる

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

## 4. GraphQL操作を定義して、自動生成を実行
GraphQL操作を自動生成に読み込む方法として、自動生成された`gql()`関数に書き込んだ文字列を読み込む方法と.graphql定義から読み込む方法の2通りがあります  
今回は以下の理由から.graphqlで定義します  
- .graphqlを用意することでschema駆動開発のメリットを享受できる

`CodegenConfig`で`documents: ['src/**/*.graphql']`を設定しているため、GraphQL操作をsrc配下の.graphqlに定義します  
以下のようなGraphQL操作を定義しました
```graphql
query Clients {
    allClients {
        id
        name
        created_at
        updated_at
    }
}
``` 

定義ができたら自動生成を再実行し、GraphQL操作を読み込んだコードを生成します  
```shell
npm run generate
```

## 5. 生成したコードをApolloClientで使う
ここまで（1. ~ 4.まで）でGraphQL操作を含んだコードを生成することができたので、生成したコードをAplloClientで使ってみます

以下のコマンドでApolloClientをインストール
```shell
npm install @apollo/client
```
次に、レスポンスを表示するだけのクライアントコンポーネントを作成します  
### クライアントコンポーネント
クライアントコンポーネントでApolloClientを使用する場合は、useQueryを使用します  
以下のような、コンポーネントを作成します
```ts
import { useQuery } from "@apollo/client";
import { GetClientsDocument } from "@/__generated__/graphql";

const AllClients = () => {
    const { loading, error, data } = useQuery(GetClientsDocument);
    console.log(data?.allClients)
  
    if (loading) return "Loading...";
  
    if (error) return `Error! ${error.message}`;
  
    return JSON.stringify(data?.allClients);
};

export default AllClients;
```

ApolloProviderをルートに持つページ（page.tsx）を作成します  
以下のような、ページを作成します
```ts
"use client"; 


import AllClients from "../../components/apollo_client/clients/AllClients";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

const TestClient = () => {    
    return (
        <ApolloProvider client={client}>
            <AllClients />
        </ApolloProvider>
    )
}

export default TestClient;
```

### サーバーコンポーネント
サーバーコンポーネントでApolloClientを使用する場合は、client.queryを使用します  
以下のような、コンポーネント(page.tsx)を作成します
```ts
import { GetClientsDocument } from "@/__generated__/graphql";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

const TestClient = async () => {
    const { loading, error, data } = await client.query({ query: GetClientsDocument }); 
    return JSON.stringify(data.allClients);
}

export default TestClient;
```

### 画面に表示されるか確認
以上の実装でpage.tsxを配置したpathにアクセスすると、レスポンスが表示されます  
今回の場合、app/client/page.tsxにページを作成したので`http://localhost:3000/client`にアクセスすることで画面が表示されます

参考:
- https://www.apollographql.com/tutorials/client-side-graphql-react/05-codegen
- https://the-guild.dev/graphql/codegen/docs/guides/react-vue

# GraphQL Codegenのバンドルサイズを最適化
自動生成で作成されたファイル（gql.ts）のコメントにもあるように、preset-clientを使用する場合は`babel`もしくは`swc`を使ってバンドルサイズを最適化する必要があります

> This map has several performance disadvantages:
> 1. It is not tree-shakeable, so it will include all operations in the project.
> 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
> 3. It does not support dead code elimination, so it will add unused operations.
> 
> Therefore it is highly recommended to use the babel or swc plugin for production.

## babelとswcどちらを採用するか
以下の観点からswcを使用します  
- swcはRustで書かれた高速で最新のJavaScript/TypeScriptコンパイラーである
- Next.jsではswcが使用されるようになった
- IEに対応する必要がある場合にbabelが使用されていたが、現状IE対応は不要になった

## swcプラグインの使用方法
以下のコマンドでプラグインをインストール
```shell
npm install -D @graphql-codegen/client-preset-swc-plugin
```

`next.config.js`に以下の設定を追加
```js
const nextConfig = {
  // ...
  experimental: {
    swcPlugins: [
      [
        '@graphql-codegen/client-preset-swc-plugin',
        { artifactDirectory: './src/gql', gqlTagName: 'graphql' }
      ]
    ]
  }
}
```
以上でswcがファイルをコンパイルするときに、プラグインは生成されたコードを自動的に最適化します

参考:
- https://the-guild.dev/blog/optimize-bundle-size-with-swc-and-graphql-codegen
- https://www.apollographql.com/docs/react/performance/babel
