import { Form } from '../../script/form'
import { REG_EXP_EMAIL } from '../../script/form'
class RecoveryForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Поле пусте',
    IS_BIG: 'Long',
    EMAIL: 'Email not correct',
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
  }
  submit = async () => {
    this.checkValid()
    this.setAlert('progress', 'Loading..')

    console.log(this.convertData())
    try {
      const res = await fetch('http://localhost:3000/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.convertData(),
      })

      const data = await res.json()
      if (res.ok) {
        this.setAlert('success', data.message)
        location.assign('/recovery-confirm')
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
    })
  }
}

window.recoveryForm = new RecoveryForm()
