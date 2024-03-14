# Trello風画面作成においてのライブラリ選定
react-draggableを選択する場合の観点
- メンテナンスの観点
    - 最終Commitが6ヶ月前になっているため、メンテナンスはされてそう
    - Contributorsは64人いるが、ほとんどのコミットは一人に偏っている
- Trello風アプリ実装の観点
    - ドラッグを可能にする機能だけが用意されている
        - カスタマイズはしやすそう
        - ドラッグ時の並べ替えなどを実装する場合、判定処理を位置情報（x,y）から自力実装していくことになりそう

# react-draggable
[react-draggable](https://github.com/react-grid-layout/react-draggable)とは、コンポーネントをドラッグ可能にするライブラリです   
どのようなことができそうかは[react-draggableのDemo](https://react-grid-layout.github.io/react-draggable/example/)を確認

コンポーネントを`<Draggable>`でラップすることで、コンポーネントをドラッグ可能にします  

`<Draggable>`はCSS Transformが使用されてます  
そのため、ドラッグするコンポーネントにすでにCSS Transformが適用されている場合、`<Draggable>`によって上書きされることになります  
`<Draggable>`での上書きを防ぐためには中間ラッパー (`<Draggable><span>...</span></Draggable>`) を使用します

## 基本的な使い方
1. ライブラリをインストール
```shell
npm install react-draggable
```
2. `<Draggable>`でコンポーネントをラップ
```ts
import Draggable from 'react-draggable';
...

            <Draggable>
                <Card>動く文字</Card>
            </Draggable>
...
```

## `<Draggable>`で用意されているProps
| props名 | propsの型 | 説明 |
| --- | --- | --- |
| allowAnyClick | boolean | `true`にすると左クリック以外でのドラッグを可能にする |
| axis | string | ドラッグ可能な軸を決定します <br> デフォルトでは水平方向と垂直方向の移動を許可します <br> `"x"`は水平方向の移動を制限する <br> `"y"`は垂直方向の動きを制限する <br> `"none"`は全ての動きを制限する|
| bounds |  {left?: number, top?: number, right?: number, bottom?: number} \| string | 移動できる範囲を指定する <br> `"parent"`はノードのoffsetParent内での移動を制限する <br> `left, top, right, bottom`は各方向どれだけ移動できるかを設定する |
| cancel | string | ドラッグの初期化を防ぐために使用するセレクタを指定します <br> Element.matchesに渡されるので、`.first, .second`のように複数のセレクタを使うことができる <br> 例：`".body"` |
| defaultClassName <br> defaultClassNameDragging <br>  defaultClassNameDragged | string <br> string <br> string | ドラッグ可能なUIのクラス名 <br> デフォルトは <br> `"react-draggable"` <br> `"react-draggable-dragging"` <br> `"react-draggable-dragged"` です |
| defaultPosition | {x: number, y: number} | `<Draggable>`の開始位置を指定します <br> これは一般的に使用する必要はありません (子アイテムの絶対配置または相対配置を直接使用できます) <br> しかし、コールバックやCSSトランスフォームで統一するために役立ちます。  |
| disabled | boolean | `true`の場合、ドラッグハンドラを呼びません |
| grid | [number, number] | ドラッグがスナップする x と y を指定します <br> ドラッグがスナップするxとyは、ドラッグ操作中に要素が自動的に整列する位置のことです|
| handle | string | ドラッグを開始するハンドルとして使用するセレクタを指定します <br> 例: `".handle"` |
| offsetParent | HTMLElement | 必要であれば、ドラッグ計算のために独自の offsetParent を指定できます <br> デフォルトでは、Dragable の offsetParent を使用します <br> これは、奇妙なdisplay typesやfloatsを持つ要素に便利です |
| onMouseDown | (e: MouseEvent) => void | ユーザーがマウスを下に動かすたびに呼び出される <br> handleやdisabledステータスに関係なく呼び出される |
| onStart | DraggableEventHandler | ドラッグ開始時に呼び出される <br> いずれかのハンドラが `false` を返した場合、アクションはキャンセルされる |
| onDrag | DraggableEventHandler | ドラッグ中に呼び出される |
| onStop | DraggableEventHandler | ドラッグが止まったときに呼び出される |
| nodeRef | React.Ref<typeof React.Component> |  |
| position | {x: number, y: number} | Reactのフォーム要素のように、このプロパティが存在する場合、アイテムは'制御された'状態になり、ユーザーの入力に反応しなくなります <br> 要素を直接制御したい場合は `position` を使用してください |
| positionOffset | {x: number \| string, y: number \| string} | 位置オフセット <br> 要素に初期位置を与えるのに便利 <br> `defaultPosition`との違いは、ドラッグ可能なコールバックで返される位置に影響を与えないことと `{x: "10%", y: "10%"}`のような文字列を受け付けるという点です |
| scale | number | 要素をドラッグするキャンバスのスケールを指定します <br> これにより、例えば、この要素の親要素のトランスフォームやマトリックスを使用してズームインまたはズームアウトしているときに、正しいドラッグデルタを取得することができます |
