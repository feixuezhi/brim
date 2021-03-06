/* @flow */

import {Node, type NodeAttrs} from "./Node"

export default class Tree {
  root: Node

  constructor(nodeData: NodeAttrs) {
    this.root = new Node(nodeData)
  }

  getRoot() {
    return this.root
  }

  isEmpty() {
    return this.getRoot() === null
  }

  toJSON() {
    return this.root.toJSON()
  }

  getNodeAt(indexPath: number[]) {
    let node = this.getRoot()
    if (node) {
      for (var index of indexPath) node = node.children[index]
    }
    return node
  }

  contains(node: Node) {
    while (node.parent) {
      node = node.parent
    }
    return node === this.root
  }

  remove(node: Node) {
    if (!this.contains(node)) return

    if (node.isRoot()) {
      throw new Error("Not able to remove the root node")
    } else {
      if (node.parent) {
        node.parent.children.splice(node.childIndex(), 1)
      }
      node.parent = null
    }
  }

  find(data: *) {
    let node = null
    this.bfSearch((n) => {
      if (n && n.data === data) node = n
    })
    return node
  }

  dfSearch(callback: Function) {
    this.recursiveDfSearch(this.root, callback)
  }

  recursiveDfSearch(node: ?Node, callback: Function) {
    if (node) {
      callback(node)
      node.children.forEach((c) => this.recursiveDfSearch(c, callback))
    }
  }

  bfSearch(callback: Function) {
    let queue = [this.getRoot()]
    while (queue.length != 0) {
      let node = queue.shift()
      if (node) {
        callback(node)
        node.children.forEach((c) => queue.push(c))
      }
    }
  }
}
