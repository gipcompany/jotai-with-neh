import { useAtom } from 'jotai';
import { counterAtom } from '../atoms/counter';

// カウンターをインクリメントするコンポーネント
// counterAtomに値を書き込む
// useAtomの戻り値の1つ目（現在の値）は使わないので _ で無視しています
export function IncrementButton() {
  const [, setCounter] = useAtom(counterAtom);
  return (
    <button onClick={() => setCounter(prev => prev + 1)}>
      +1 インクリメント
    </button>
  );
}
