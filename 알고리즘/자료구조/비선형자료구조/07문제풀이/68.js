/* 후위 순회 */

function BinaryTree() {
  this.root = null;
}

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinaryTree.prototype._insertNode = function (node, value) {
  if (node == undefined) {
    node = new Node(value);
  } else if (value < node.value) {
    node.left = this._insertNode(node.left, value);
  } else if (value > node.value) {
    node.right = this._insertNode(node.right, value);
  }

  return node;
};

BinaryTree.prototype.insert = function (value) {
  this.root = this._insertNode(this.root, value);
};

BinaryTree.prototype.postOrderTraverse = function (node, array) {
  if (node === null) {
    return;
  }

  this.postOrderTraverse(node.left, array);
  this.postOrderTraverse(node.right, array);
  array.push(node.value);
};

/* user code */
function answer(strs) {
  let result = [];
  let binaryTree = new BinaryTree();
  for (str of strs) binaryTree.insert(str);

  binaryTree.postOrderTraverse(binaryTree.root, result);

  return result;
}

/* main code */
let input = [
  // TC: 1
  "ABC",

  // TC: 2
  "FBADCEGIH",

  // TC: 3
  "CBAEDFG",
];

for (let i = 0; i < input.length; i++) {
  process.stdout.write(`#${i + 1} `);
  console.log(answer(input[i]));
}
