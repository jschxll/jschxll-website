// TreeNode
export class TreeNode {
  val: string;
  children: Map<string, TreeNode>;

  constructor(val: string) {
    this.val = val;
    this.children = new Map();
  }

  addChild(path: string[]): void {
    if (path.length === 0) return;
    // i.e. slug=["some", "test"], head would be "some" and rest would be "test"
    const [head, ...rest] = path;

    // if "some" doesn't already exists, create a new node
    if (!this.children.has(head)) {
      this.children.set(head, new TreeNode(head));
    }

    // add the rest ("test") as child to the (new) node
    this.children.get(head)!.addChild(rest);
  }

  getChildren(): TreeNode[] {
    return Array.from(this.children.values());
  }
}