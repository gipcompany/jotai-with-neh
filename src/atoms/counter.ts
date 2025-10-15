import { atom } from 'jotai';

// 📚 atomについての詳細: https://jotai.org/docs/core/atom
// 📚 useAtomについての詳細: https://jotai.org/docs/core/use-atom
//
// counter の型: PrimitiveAtom<number> & WithInitialValue<number>
// - PrimitiveAtom<number>: 
//   プリミティブ（基本的な）atom で、number型の値を持つことを示します
//   読み取りと書き込みの両方が可能な、最もシンプルなatomの型です
// - WithInitialValue<number>:
//   初期値が設定されていることを示す型です
//   初期値がある場合は、Provider なしでも使用できます
// - &: TypeScriptの交差型（Intersection Type）
//   両方の型の特性を併せ持つことを意味します
//
// ★ atomはコンポーネントの外で定義するのが一般的です。その理由:
// 1. Reactの再レンダリング時に新しいatomインスタンスが作成されるのを防ぐ
//    - コンポーネント内で定義すると、再レンダリングごとに別のatomが作られてしまう
//    - これはuseStateとの重要な違いです（useStateは内部で同一性を保持する）
// 2. 複数のコンポーネント間で同じ状態を共有できる
//    - グローバルな状態管理として使える
// 3. atomの参照の一貫性を保つ
//    - 同じatomオブジェクトを参照することで、状態が正しく同期される
//
// このファイルからエクスポートすることで、
// 複数のコンポーネントから同じcounterAtomをインポートして使用できます
export const counterAtom = atom(0);
