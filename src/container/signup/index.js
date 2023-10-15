import { Form } from '../../script/form'
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form'
class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
    ROLE: 'role',
    CONFIRM: 'isConfirm',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Поле пусте',
    IS_BIG: 'Long',
    EMAIL: 'Email not correct',
    PASSWORD: 'Password error',
    PASSWORD_AGAIN: 'Password again',
    NOT_CONFIRM: 'Error confirm',
    ROLE: 'Error role',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL
      }
    }
    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
      }
    }
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      if (String(value) !== this.value[this.FIELD_NAME.PASSWORD]) {
        return this.FIELD_ERROR.PASSWORD_AGAIN
      }
    }
    if (name === this.FIELD_NAME.ROLE) {
      if (isNaN(value)) {
        return this.FIELD_ERROR.ROLE
      }
    }

    if (name === this.FIELD_NAME.CONFIRM) {
      if (Boolean(value) !== true) {
        return this.FIELD_ERROR.NOT_CONFIRM
      }
    }
  }
  submit = async () => {
    this.checkValid()
    this.setAlert('progress', 'Loading..')

    console.log(this.convertData())
    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.convertData(),
      })

      const data = await res.json()
      if (res.ok) {
        this.setAlert('success', data.message)
      } else {
        this.setAlert('error', data.message)
      }
    } catch (error) {
      this.setAlert('error', error.message)
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
      [this.FIELD_NAME.ROLE]: this.value[this.FIELD_NAME.ROLE],
    })
  }
}

window.signupForm = new SignupForm()
