import { atom } from 'jotai';

// ========================================
// Provider デモ用のatom
// 📚 Providerについての詳細: https://jotai.org/docs/core/provider
// ========================================

export const messageAtom = atom('デフォルトメッセージ');
export const colorAtom = atom('blue');
