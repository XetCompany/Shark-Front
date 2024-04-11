import { makeAutoObservable } from "mobx";

class PathsStore {
  rowSelectionModel = [];
  isShowModalGraph = false;

  constructor() {
    makeAutoObservable(this);
  }

  setRowSelectionModel(rowSelectionModel) {
    this.rowSelectionModel = rowSelectionModel;
  }

  setIsShowModalGraph(isShowModalGraph) {
    this.isShowModalGraph = isShowModalGraph;
  }

  openModalGraph() {
    this.isShowModalGraph = true;
  }

  closeModalGraph() {
    this.isShowModalGraph = false;
  }
}

export const pathsStore = new PathsStore();
