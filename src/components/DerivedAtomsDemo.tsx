import { useAtom, useAtomValue } from 'jotai';
import {
  priceAtom,
  quantityAtom,
  subtotalAtom,
  taxAmountAtom,
  totalAtom,
  todosAtom,
  filterAtom,
  filteredTodosAtom,
  completedCountAtom,
  activeCountAtom,
  completionRateAtom,
} from '../atoms/derivedDemo';

// ========================================
// 例1: ショッピングカートの計算
// ========================================
function ShoppingCartExample() {
  const [price, setPrice] = useAtom(priceAtom);
  const [quantity, setQuantity] = useAtom(quantityAtom);
  
  // ✅ Derived Atomsは useAtomValue で読み取り専用として使う
  // これらは自動計算されるので、書き込む必要がない
  const subtotal = useAtomValue(subtotalAtom);
  const taxAmount = useAtomValue(taxAmountAtom);
  const total = useAtomValue(totalAtom);

  return (
    <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
      <h2>例1: ショッピングカート計算</h2>
      <p style={{ color: '#666', fontSize: '0.95em' }}>
        Derived Atomsの基本: 他のatomから自動計算される値
      </p>

      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            価格: ¥{price.toLocaleString()}
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            数量: {quantity}個
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '5px',
          border: '2px solid #4CAF50'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>小計:</strong> ¥{subtotal.toLocaleString()}
            <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9em' }}>
              (price × quantity で自動計算)
            </span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>税額 (10%):</strong> ¥{taxAmount.toLocaleString()}
            <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9em' }}>
              (subtotal × 0.1 で自動計算)
            </span>
          </div>
          <div style={{ fontSize: '1.2em', color: '#4CAF50', fontWeight: 'bold' }}>
            <strong>合計:</strong> ¥{total.toLocaleString()}
            <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.8em', fontWeight: 'normal' }}>
              (subtotal + tax で自動計算)
            </span>
          </div>
        </div>

        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#fffacd', 
          borderRadius: '5px',
          fontSize: '0.9em'
        }}>
          <strong>💡 ポイント:</strong> price や quantity を変更すると、
          subtotal, taxAmount, total が自動的に再計算されます。
          手動で計算する必要はありません！
        </div>
      </div>
    </section>
  );
}

// ========================================
// 例2: ToDoリストのフィルタリングと統計
// ========================================
function TodoListExample() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  
  // ✅ Derived Atoms: フィルタリング結果と統計を自動計算
  const filteredTodos = useAtomValue(filteredTodosAtom);
  const completedCount = useAtomValue(completedCountAtom);
  const activeCount = useAtomValue(activeCountAtom);
  const completionRate = useAtomValue(completionRateAtom);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff0f5', borderRadius: '8px' }}>
      <h2>例2: ToDoリストのフィルタリングと統計</h2>
      <p style={{ color: '#666', fontSize: '0.95em' }}>
        複数のDerived Atomsを組み合わせた実用例
      </p>

      {/* 統計情報 */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          flex: 1, 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '5px',
          textAlign: 'center',
          border: '2px solid #2196F3'
        }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#2196F3' }}>
            {completionRate}%
          </div>
          <div style={{ fontSize: '0.9em', color: '#666' }}>完了率</div>
        </div>
        <div style={{ 
          flex: 1, 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '5px',
          textAlign: 'center',
          border: '2px solid #4CAF50'
        }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#4CAF50' }}>
            {completedCount}
          </div>
          <div style={{ fontSize: '0.9em', color: '#666' }}>完了</div>
        </div>
        <div style={{ 
          flex: 1, 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '5px',
          textAlign: 'center',
          border: '2px solid #ff9800'
        }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ff9800' }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '0.9em', color: '#666' }}>未完了</div>
        </div>
      </div>

      {/* フィルターボタン */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === f ? '#2196F3' : '#ddd',
              color: filter === f ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: filter === f ? 'bold' : 'normal',
            }}
          >
            {f === 'all' ? 'すべて' : f === 'active' ? '未完了' : '完了済み'}
          </button>
        ))}
      </div>

      {/* ToDoリスト */}
      <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px' }}>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: todo.completed ? '#e8f5e9' : '#fff3e0',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              border: `2px solid ${todo.completed ? '#4CAF50' : '#ff9800'}`,
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px', cursor: 'pointer' }}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#666' : '#000',
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#fffacd', 
        borderRadius: '5px',
        fontSize: '0.9em'
      }}>
        <strong>💡 ポイント:</strong> フィルターを変更すると filteredTodosAtom が自動更新。
        ToDoの完了状態を変更すると、完了率・完了数・未完了数が自動計算されます。
      </div>
    </section>
  );
}

// ========================================
// メインコンポーネント
// ========================================
export function DerivedAtomsDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Derived Atoms（派生atom）チュートリアル</h1>
      
      <div style={{ 
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        marginBottom: '30px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ marginTop: 0, marginBottom: 0 }}>Derived Atomsとは？</h2>
          <a 
            href="https://jotai.org/docs/guides/composing-atoms" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '0.9em',
              fontWeight: '500',
            }}
          >
            📚 公式ドキュメント
          </a>
        </div>
        <p style={{ margin: '10px 0', fontSize: '1.05em' }}>
          <strong>他のatomの値から自動的に計算される、読み取り専用のatom</strong>です。
        </p>
        <ul style={{ marginLeft: '20px', textAlign: 'left', lineHeight: '1.8' }}>
          <li>依存するatomが変更されると、自動的に再計算される</li>
          <li>手動で更新する必要がない（常に最新の計算結果）</li>
          <li>複数のatomを組み合わせて複雑な計算も可能</li>
          <li>メモ化されているので、パフォーマンスも良い</li>
        </ul>
        
        <div style={{ 
          marginTop: '15px', 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '5px',
          border: '2px solid #2196F3',
          maxWidth: '800px'
        }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '1.1em' }}>
            📝 基本構文:
          </div>
          <pre style={{ 
            margin: '0',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.95em',
            lineHeight: '1.8',
            overflowX: 'auto',
            whiteSpace: 'pre',
            textAlign: 'left',
          }}>
{`// 他のatomから計算されるatom
const derivedAtom = atom((get) => {
  const value1 = get(atom1);
  const value2 = get(atom2);
  return value1 + value2; // 計算ロジック
});`}
          </pre>
        </div>
      </div>

      <ShoppingCartExample />
      <TodoListExample />

      {/* まとめ */}
      <section style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        marginTop: '30px'
      }}>
        <h2>まとめ</h2>
        <div style={{ fontSize: '0.95em' }}>
          <h3>Derived Atomsの利点</h3>
          <ol style={{ paddingLeft: '20px', textAlign: 'left' }}>
            <li style={{ marginBottom: '8px' }}><strong>自動更新:</strong> 依存atomが変わると自動で再計算</li>
            <li style={{ marginBottom: '8px' }}><strong>コードの簡潔性:</strong> 計算ロジックを一箇所に集約</li>
            <li style={{ marginBottom: '8px' }}><strong>再利用性:</strong> 複数のコンポーネントで同じ計算結果を使える</li>
            <li style={{ marginBottom: '8px' }}><strong>パフォーマンス:</strong> メモ化により無駄な再計算を防ぐ</li>
            <li style={{ marginBottom: '8px' }}><strong>テスタビリティ:</strong> 計算ロジックを独立してテストできる</li>
          </ol>

          <h3 style={{ marginTop: '20px' }}>使い分け</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#ddd' }}>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>種類</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>用途</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>基本atom</strong></td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>ユーザーが直接変更する値</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>価格、数量、入力値</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Derived atom</strong></td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>他の値から計算される値</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>合計、フィルター結果、統計</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
