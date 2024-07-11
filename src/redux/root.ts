import { DataCollectionState } from "./data-collection/interface";

export interface StoreInterface {
  DataCollection: DataCollectionState;
}

export type RootState = {
  DataCollection: StoreInterface["DataCollection"];
};
