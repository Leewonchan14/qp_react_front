export default class RefreshManager {
  static getInstance() {
    if (!RefreshManager.instance) {
      RefreshManager.instance = new RefreshManager();
    }
    return RefreshManager.instance;
  }

  static instance: RefreshManager;
  isRefreshing = false;
  subscribers: (() => void)[] = [];

  addSubscribers(callback: () => void) {
    return new Promise((resolve) => {
      this.subscribers.push(() => resolve(callback()));
    });
  }

  excuteSubscribers() {
    this.isRefreshing = false;
    this.subscribers.forEach((callback) => callback());
    this.clearSubscribers();
  }

  clearSubscribers() {
    this.isRefreshing = false;
    this.subscribers = [];
  }
}
