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
この設定によりGraphQL操作文字列（query, mutation）が自動生成コードに読み込まれる
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
`CodegenConfig`で`documents: ['src/**/*.tsx']`を設定しているため、GraphQL操作文字列をsrc配下の.tsxに定義します  
以下のようなGraphQL操作文字列を定義しました
```ts
import { gql } from "../__generated__";

const GET_CLIENTS = gql ( `   
    query GetClients {
        allClients {
            id
            name
            created_at
            updated_at
        }
    }
` );
``` 

定義ができたら自動生成を再実行し、GraphQL操作文字列を読み込んだコードを生成します  
```shell
npm run generate
```

## 5. 生成したコードをApolloClientで使う
ここまで（1. ~ 4.まで）でGraphQL操作を含んだコードを生成することができたので、生成したコードをAplloClientで使ってみます

以下のコマンドでApolloClientをインストール
```shell
npm install @apollo/client
```
レスポンスを表示するだけのクライアントコンポーネントを作成します  
クライアントコンポーネントでApolloClientを使用する場合は、useQueryを使用します  
以下のような、コンポーネントを作成します
```ts
import { gql } from "../../../__generated__";
import { useQuery } from "@apollo/client"

const GET_CLIENTS = gql ( `   
    query GetClients {
        allClients {
            id
            name
            created_at
            updated_at
        }
    }
` );

const AllClients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
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

以上の実装でpage.tsxを配置したpathにアクセスすると、レスポンスが表示されます  
今回の場合、app/client/page.tsxにページを作成したので`http://localhost:3000/client`にアクセスすることで画面が表示されます

参考:
- https://www.apollographql.com/tutorials/client-side-graphql-react/05-codegen
- https://the-guild.dev/graphql/codegen/docs/guides/react-vue
