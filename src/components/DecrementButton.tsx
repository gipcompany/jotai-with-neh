import { useAtom } from 'jotai';
import { counterAtom } from '../atoms/counter';

// カウンターをデクリメントするコンポーネント
// counterAtomに値を書き込む
export function DecrementButton() {
  const [, setCounter] = useAtom(counterAtom);
  return (
    <button onClick={() => setCounter(prev => prev - 1)}>
      -1 デクリメント
    </button>
  );
}
