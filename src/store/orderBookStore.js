import { create } from 'zustand';

const useOrderBookStore = create((set) => ({
  orderBook: { bids: [], asks: [] },
  buyDetails: [],
  sellDetails: [],
  connectionStatus: 'connected',
  searchTerm: '',
  timeframe: 'lastHour', 

  updateOrderBook: (data) => set({
    orderBook: { bids: data.bids, asks: data.asks },
    buyDetails: data.buyDetails,
    sellDetails: data.sellDetails,
  }),

  updateConnectionStatus: (status) => set({ connectionStatus: status }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setTimeframe: (timeframe) => set({ timeframe }),

}));


export default useOrderBookStore;
