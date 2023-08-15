import {create} from 'zustand';
import {IMessage} from '../types/message.ts';

interface UserState {
  messages: IMessage[];
  setNewMessage: (value: IMessage) => void;
}

const useMessagesStore = create<UserState>((set) => ({
  messages: [],
  setNewMessage: (value) => set((state) => ({messages: [...state.messages, value]}))
}));

export default useMessagesStore;
