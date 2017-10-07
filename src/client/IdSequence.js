class IdSequence {
  constructor () {
      this.next = 101;
  }

  getNext () {
      return this.next++;
  }
}

export default IdSequence;
