import { useAtom } from 'jotai';
import { counterAtom } from '../atoms/counter';

// カウンターをリセットするコンポーネント
// counterAtomに直接値を設定する
// prev => prev + 1 のような関数ではなく、直接0を渡しています
export function ResetButton() {
  const [, setCounter] = useAtom(counterAtom);
  return (
    <button onClick={() => setCounter(0)}>
      リセット
    </button>
  );
}
