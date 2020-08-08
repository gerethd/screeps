interface WorkerTask {

  class: string;
  requirements: Map<string, number>;
  outputs: Map<string, number>;

  creep: RoomObject | undefined;
  storageLocation: Structure | undefined;
  sourceLocation: RoomObject | undefined;
  priority: number | undefined;

  execute(): boolean;

  assign(creep: RoomObject): void;

  isAssigned(): boolean;
}
