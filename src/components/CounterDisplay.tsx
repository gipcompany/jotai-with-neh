import { useAtom } from 'jotai';
import { counterAtom } from '../atoms/counter';

// カウンターの値を表示するコンポーネント
// counterAtomから値を読み取るだけ（書き込みはしない）
// 他のコンポーネントでcounterAtomが更新されると、
// このコンポーネントも自動的に再レンダリングされます
export function CounterDisplay() {
  const [count] = useAtom(counterAtom);
  return (
    <div>
      <h1>現在のカウント: {count}</h1>
    </div>
  );
}
