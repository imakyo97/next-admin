# 環境構築

## Nodejsのプロジェクトの作成
以下のコマンドでプロジェクトを作成
```shell
npx create-next-app@latest next-admin
```

## ReactAdminのパッケージインストール
以下のコマンドでreact-adminとra-data-json-serverを追加
```shell
npm install react-admin ra-data-json-server
```
※ ra-data-json-serverはJSONPlaceholderが提供するテストAPIに接続するために使用する

## ra-data-graphql-simpleをインストール
react-adminでgraphqlとの通信を可能にするため、ra-data-graphql-simpleをインストールする  
以下のコマンドでインストール
```shell
npm install --save graphql ra-data-graphql-simple
```

参考: 
- https://github.com/marmelab/react-admin/blob/master/packages/ra-data-graphql-simple/README.md
- https://marmelab.com/react-admin/Admin.html#dataprovider
