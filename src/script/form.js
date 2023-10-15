export const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
export const REG_EXP_PASSWORD = new RegExp(/^[a-zA-Z]\w{3,14}$/)

export class Form {
  FIELD_NAME = {}
  FIELD_ERROR = {}

  value = {}
  error = {}
  disabled = false

  change = (name, value) => {
    const error = this.validate(name, value)
    this.value[name] = value
    this.checkValid(name, value)
  }

  setError = (name, error) => {
    const span = document.querySelector(`.form__error[name="${name}"]`)
    const field = document.querySelector(`.validation[name="${name}"]`)
    if (span) {
      span.classList.toggle('form__error--active', Boolean(error))
      span.innerText = error || ''
    }
    if (field) {
      field.classList.toggle('validation--active', Boolean(error))
    }
  }

  checkValid = (name, value) => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
        disabled = true
        this.error[name] = error
      } else {
        this.setError(name, null)
        delete this.error[name]
      }
    })

    const el = document.querySelector('.button')

    if (el) {
      el.classList.toggle('button--disabled', Boolean(disabled))
    }

    this.disabled = disabled
  }

  setAlert = (status, text) => {
    const el = document.querySelector('.alert')

    if (status === 'progress') {
      el.className = 'alert alert--progress'
    } else if (status === 'success') {
      el.className = 'alert alert--success'
    } else if (status === 'error') {
      el.className = 'alert alert--error'
    } else {
      el.className = 'alert alert--disabled'
    }

    if (text) el.innerText = text
  }
}
