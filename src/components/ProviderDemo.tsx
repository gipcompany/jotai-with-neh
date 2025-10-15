import { Provider, useAtom, useSetAtom, createStore } from 'jotai';
import { messageAtom, colorAtom } from '../atoms/demo';

// メッセージを表示するコンポーネント
function MessageDisplay() {
  // ✅ useAtom を使用（値を読み取る必要があるため）
  // このコンポーネントは message と color の値を表示するので、
  // atomから値を読み取る必要があります
  // そのため useAtom を使います
  //
  // 【動作】messageAtom や colorAtom が更新されると、
  // このコンポーネントは自動的に再レンダリングされます
  const [message] = useAtom(messageAtom);
  const [color] = useAtom(colorAtom);
  
  return (
    <div style={{ 
      padding: '10px', 
      margin: '10px 0',
      border: `2px solid ${color}`,
      borderRadius: '5px',
      backgroundColor: `${color}22`
    }}>
      <p><strong>メッセージ:</strong> {message}</p>
      <p><strong>カラー:</strong> {color}</p>
    </div>
  );
}

// メッセージを更新するコンポーネント
function MessageEditor() {
  // ✅ useSetAtom を使用（値を書き込むだけで、読み取らないため）
  //
  // 【重要なポイント】このコンポーネントは message や color の値を
  // 表示していません。ただボタンがあって、クリックしたら値を更新するだけです。
  //
  // もし useAtom を使っていたら:
  //   const [message, setMessage] = useAtom(messageAtom); // ❌ 非効率
  //   const [color, setColor] = useAtom(colorAtom);       // ❌ 非効率
  // → message や color が変更されるたびに、このコンポーネントも再レンダリングされる
  // → でもこのコンポーネントは値を表示していないので、再レンダリングは無駄！
  //
  // useSetAtom を使うことで:
  // → atomが変更されても、このコンポーネントは再レンダリングされない
  // → パフォーマンスが向上！
  //
  // 【判断基準】
  // - 値を表示する → useAtom
  // - 値を更新するだけ → useSetAtom（パフォーマンス最適化）
  const setMessage = useSetAtom(messageAtom);
  const setColor = useSetAtom(colorAtom);
  
  return (
    <div style={{ marginTop: '10px' }}>
      <button onClick={() => setMessage('更新されました！')}>
        メッセージを更新
      </button>
      <button onClick={() => setColor('red')} style={{ marginLeft: '5px' }}>
        赤に変更
      </button>
      <button onClick={() => setColor('green')} style={{ marginLeft: '5px' }}>
        緑に変更
      </button>
    </div>
  );
}

// Providerのデモコンポーネント
export function ProviderDemo() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Provider チュートリアル</h1>
        <a 
          href="https://jotai.org/docs/core/provider" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
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
      
      {/* ケース1: Providerなし（グローバル状態） */}
      <section style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f0f0f0' }}>
        <h2>ケース1: Providerなし（グローバル状態）</h2>
        <p>
          Providerを使わない場合、すべてのコンポーネントが同じatomの値を共有します。
          どちらのエディタで更新しても、両方のディスプレイに反映されます。
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h3>表示A</h3>
            <MessageDisplay />
            <MessageEditor />
          </div>
          <div style={{ flex: 1 }}>
            <h3>表示B</h3>
            <MessageDisplay />
            <MessageEditor />
          </div>
        </div>
      </section>

      {/* ケース2: Providerあり（独立した状態） */}
      <section style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff0f0' }}>
        <h2>ケース2: Providerあり（スコープを分離）</h2>
        <p>
          Providerで囲むと、その内側だけで独立した状態を持てます。
          左右のエディタで更新しても、お互いに影響しません。
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Provider>
            <div style={{ flex: 1, border: '2px dashed blue', padding: '10px' }}>
              <h3>独立スコープ A</h3>
              <MessageDisplay />
              <MessageEditor />
            </div>
          </Provider>
          <Provider>
            <div style={{ flex: 1, border: '2px dashed red', padding: '10px' }}>
              <h3>独立スコープ B</h3>
              <MessageDisplay />
              <MessageEditor />
            </div>
          </Provider>
        </div>
      </section>

      {/* ケース3: 初期値を指定したProvider */}
      <section style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f0fff0' }}>
        <h2>ケース3: 初期値を指定したProvider</h2>
        <p>
          Providerに初期値を渡すことで、そのスコープ内だけ異なる初期値を設定できます。
        </p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          ※ jotai v2では、createStoreで初期値を持つstoreを作成し、
          Providerに渡す方法に変更されました
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Provider store={(() => {
            const store = createStore();
            store.set(messageAtom, 'スコープ1の初期値');
            store.set(colorAtom, 'purple');
            return store;
          })()}>
            <div style={{ flex: 1, border: '2px solid purple', padding: '10px' }}>
              <h3>スコープ 1（purple初期値）</h3>
              <MessageDisplay />
              <MessageEditor />
            </div>
          </Provider>
          <Provider store={(() => {
            const store = createStore();
            store.set(messageAtom, 'スコープ2の初期値');
            store.set(colorAtom, 'orange');
            return store;
          })()}>
            <div style={{ flex: 1, border: '2px solid orange', padding: '10px' }}>
              <h3>スコープ 2（orange初期値）</h3>
              <MessageDisplay />
              <MessageEditor />
            </div>
          </Provider>
        </div>
      </section>

      {/* ケース4: Providerのネスト */}
      <section style={{ padding: '15px', backgroundColor: '#f0f0ff' }}>
        <h2>ケース4: Providerのネスト（階層構造）</h2>
        <p>
          Providerは入れ子にできます。内側のProviderは外側のProviderから独立します。
        </p>
        <Provider store={(() => {
          const store = createStore();
          store.set(messageAtom, '外側のProvider');
          store.set(colorAtom, 'teal');
          return store;
        })()}>
          <div style={{ border: '3px solid teal', padding: '15px' }}>
            <h3>外側のProvider</h3>
            <MessageDisplay />
            <MessageEditor />
            
            <Provider store={(() => {
              const store = createStore();
              store.set(messageAtom, '内側のProvider');
              store.set(colorAtom, 'coral');
              return store;
            })()}>
              <div style={{ border: '3px solid coral', padding: '15px', marginTop: '10px' }}>
                <h3>内側のProvider</h3>
                <MessageDisplay />
                <MessageEditor />
              </div>
            </Provider>
          </div>
        </Provider>
      </section>

      {/* まとめ */}
      <section style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fffacd' }}>
        <h2>まとめ</h2>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Providerなし:</strong> グローバルに状態を共有（全コンポーネントが同じ値）</li>
          <li><strong>Provider:</strong> そのスコープ内だけで独立した状態を持つ</li>
          <li><strong>createStore + store:</strong> 初期値を持つstoreを作成してProviderに渡す（jotai v2の方法）</li>
          <li><strong>ネスト:</strong> Providerは入れ子にでき、内側は外側から独立</li>
        </ul>
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
          <h3 style={{ marginTop: 0 }}>初期値の設定方法（jotai v2）</h3>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
{`// createStoreで初期値を設定
const store = createStore();
store.set(myAtom, '初期値');

// Providerに渡す
<Provider store={store}>
  ...
</Provider>`}
          </pre>
        </div>
        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
          Providerの用途: テスト、複数インスタンス、モーダル、タブなど、
          同じコンポーネントを異なる状態で複数表示したい場合に便利です。
        </p>
      </section>
    </div>
  );
}
