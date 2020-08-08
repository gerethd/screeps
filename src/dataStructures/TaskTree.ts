
export class TaskTree {

  private _value: WorkerTask
  // @ts-ignore
  private _children: Array<TaskTree<T>>;

  constructor(value: WorkerTask) {
    this._value = value;
    this._children = [];
  }

  public addChild(child: WorkerTask): TaskTree {
    let task: TaskTree = new TaskTree(child)
    this._children.push(task);
    return task;
  }

  public executeTask(): boolean {
    let stuff = this._children.length > 0;
    _.forEach(this._children, child=> {
      if(child.executeTask()) {
        _.remove(child)
      }
    })
    if(!stuff) {
      return this._value.execute()
    }
    return false;
  }

  get value(): WorkerTask {
    return this._value;
  }

  get children(): Array<TaskTree> {
    return this._children;
  }
}
