import { makeAutoObservable } from "mobx";

class ErrorStore {
  errorMessage = null;

  constructor() {
    makeAutoObservable(this)
  }

  setError(message) {
    this.errorMessage = message;
  }
}
const errorStore = new ErrorStore();
export default errorStore;
