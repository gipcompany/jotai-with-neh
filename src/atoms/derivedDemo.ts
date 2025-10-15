import { atom } from 'jotai';

// ========================================
// Derived Atoms（派生atom）のデモ
// 📚 公式ドキュメント: https://jotai.org/docs/guides/composing-atoms
// ========================================

// ========================================
// 基本のatom（プリミティブatom）
// ========================================

// 商品の価格
export const priceAtom = atom(1000);

// 商品の数量
export const quantityAtom = atom(1);

// 税率（10%）
export const taxRateAtom = atom(0.1);

// ========================================
// Derived Atoms（派生atom）
// ========================================

// Derived Atom 1: 小計（価格 × 数量）
// get関数を使って他のatomの値を読み取り、計算結果を返す
// priceAtom か quantityAtom が変更されると、自動的に再計算される
export const subtotalAtom = atom((get) => {
  const price = get(priceAtom);
  const quantity = get(quantityAtom);
  return price * quantity;
});

// Derived Atom 2: 税額（小計 × 税率）
// 派生atomから更に派生させることもできる
export const taxAmountAtom = atom((get) => {
  const subtotal = get(subtotalAtom);
  const taxRate = get(taxRateAtom);
  return Math.floor(subtotal * taxRate);
});

// Derived Atom 3: 合計金額（小計 + 税額）
export const totalAtom = atom((get) => {
  const subtotal = get(subtotalAtom);
  const tax = get(taxAmountAtom);
  return subtotal + tax;
});

// ========================================
// 実用例: ToDoリスト
// ========================================

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// ToDoリストの配列
export const todosAtom = atom<Todo[]>([
  { id: 1, text: 'jotaiを学ぶ', completed: false },
  { id: 2, text: 'Derived Atomsを理解する', completed: false },
  { id: 3, text: 'チュートリアルを完成させる', completed: true },
]);

// フィルター（'all' | 'active' | 'completed'）
export const filterAtom = atom<'all' | 'active' | 'completed'>('all');

// Derived Atom: フィルタリングされたToDoリスト
// todosAtom と filterAtom の両方を監視し、フィルタリング結果を返す
export const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);

  if (filter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }
  if (filter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }
  return todos; // 'all'
});

// Derived Atom: 完了したToDoの数
export const completedCountAtom = atom((get) => {
  const todos = get(todosAtom);
  return todos.filter((todo) => todo.completed).length;
});

// Derived Atom: 未完了のToDoの数
export const activeCountAtom = atom((get) => {
  const todos = get(todosAtom);
  return todos.filter((todo) => !todo.completed).length;
});

// Derived Atom: 完了率（パーセンテージ）
export const completionRateAtom = atom((get) => {
  const todos = get(todosAtom);
  if (todos.length === 0) return 0;
  const completed = get(completedCountAtom);
  return Math.round((completed / todos.length) * 100);
});
