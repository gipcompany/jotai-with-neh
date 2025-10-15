import './App.css'
import { useState } from 'react'
import { CounterDisplay } from './components/CounterDisplay'
import { IncrementButton } from './components/IncrementButton'
import { DecrementButton } from './components/DecrementButton'
import { ResetButton } from './components/ResetButton'
import { ProviderDemo } from './components/ProviderDemo'
import { DerivedAtomsDemo } from './components/DerivedAtomsDemo'

// ★ 複数のコンポーネント間で状態を共有する例
// CounterDisplay、IncrementButton、DecrementButton、ResetButton
// これらすべてのコンポーネントが同じ counterAtom (atoms/counter.ts) を参照しています
// どのコンポーネントから状態を更新しても、すべてのコンポーネントが
// 自動的に再レンダリングされ、最新の値が表示されます
//
// これがjotaiの主な利点です：
// - propsのバケツリレー（prop drilling）が不要
// - 状態を使いたいコンポーネントで直接useAtomを呼び出すだけ
// - コンポーネントの階層構造に関係なく状態を共有できる
//
// ファイル構成:
// - src/atoms/counter.ts: counterAtomの定義（リアクティブなグローバル状態）
// - src/components/CounterDisplay.tsx: 値を読み取って表示
// - src/components/IncrementButton.tsx: 値をインクリメント
// - src/components/DecrementButton.tsx: 値をデクリメント
// - src/components/ResetButton.tsx: 値をリセット
// - src/components/ProviderDemo.tsx: Providerの使い方のチュートリアル
// - src/components/DerivedAtomsDemo.tsx: Derived Atoms（派生atom）のチュートリアル

function App() {
  const [showDemo, setShowDemo] = useState<'counter' | 'provider' | 'derived'>('counter');

  return (
    <div style={{ padding: '20px' }}>
      {/* デモ切り替えボタン */}
      <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setShowDemo('counter')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: showDemo === 'counter' ? '#4CAF50' : '#ddd',
            color: showDemo === 'counter' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: showDemo === 'counter' ? 'bold' : 'normal',
          }}
        >
          基本のカウンター
        </button>
        <button 
          onClick={() => setShowDemo('provider')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: showDemo === 'provider' ? '#4CAF50' : '#ddd',
            color: showDemo === 'provider' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: showDemo === 'provider' ? 'bold' : 'normal',
          }}
        >
          Provider チュートリアル
        </button>
        <button 
          onClick={() => setShowDemo('derived')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: showDemo === 'derived' ? '#4CAF50' : '#ddd',
            color: showDemo === 'derived' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: showDemo === 'derived' ? 'bold' : 'normal',
          }}
        >
          Derived Atoms チュートリアル
        </button>
      </div>

      {/* 選択されたデモを表示 */}
      {showDemo === 'counter' ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0 }}>基本のカウンター</h2>
            <a 
              href="https://jotai.org/docs/core/atom" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 16px',
                backgroundColor: '#FF9800',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none',
                fontSize: '0.9em',
                fontWeight: '500',
              }}
            >
              📚 atom公式ドキュメント
            </a>
          </div>
          <CounterDisplay />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <IncrementButton />
            <DecrementButton />
            <ResetButton />
          </div>
        </div>
      ) : showDemo === 'provider' ? (
        <ProviderDemo />
      ) : (
        <DerivedAtomsDemo />
      )}
    </div>
  )
}

export default App
