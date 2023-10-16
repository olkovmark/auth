class Confirm {
  static #list = []
  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode = () => Math.floor(Math.random() * 9000) + 1000

  static create = (data) => {
    this.#list.push(new Confirm(data))

    setTimeout(() => {
      this.delete(code)
    }, 24 * 3600000)

    console.log(this.#list)
  }

  static delete = (code) => {
    this.#list = this.#list.filter((item) => item.code !== code)
  }

  static getData = (code) => this.#list.find((item) => item.code === code).data || null
}

module.exports = {
  Confirm,
}
