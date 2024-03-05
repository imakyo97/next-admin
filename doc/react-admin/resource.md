# <Resource/>のpropsにスプレット構文でコンポーネントを渡す
react-adminのドキュメントで、リソースプロパティを別のファイルに移動させることがお勧めされていた
> アプリのメイン コンポーネントをより簡潔にするために、リソース プロパティを別のファイルに移動することをお勧めします。たとえば、前の例は次のように書き換えることができます。  
※ 引用: https://marmelab.com/react-admin/Admin.html

以下のExampleを参考に、このプロジェクトでもリソースプロパティを別ファイルに移動させて定義している  
https://github.com/marmelab/react-admin/blob/master/examples/demo/src/App.tsx

該当のコード
```ts
    return (
        <Admin dataProvider= { dataProvider } >
            <Resource name="Client" {...clients} />
        </Admin>
    );
```
`{...clients}`で props をまとめて渡すようにしている
