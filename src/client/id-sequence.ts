export default class IdSequence {
  private next = 101

  getNext(): number {
    return this.next++
  }
}
