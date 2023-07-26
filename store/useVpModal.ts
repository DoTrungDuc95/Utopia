import { create } from 'zustand';

export type VpModal = {
  isVpModalOpen: boolean;
  openVpModal: () => void;
  closeVpModal: () => void;
};

export const useVpModal = create<VpModal>((set) => ({
  isVpModalOpen: false,
  openVpModal: () => set((state: VpModal) => ({ isVpModalOpen: true })),
  closeVpModal: () => set((state: VpModal) => ({ isVpModalOpen: false })),
}));
