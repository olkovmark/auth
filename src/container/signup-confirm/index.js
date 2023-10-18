import { Form } from '../../script/form'
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form'
import { getTokenSession, saveSession } from '../../script/session'
class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Поле пусте',
    IS_BIG: 'Long',
    CODE: 'Code not correct',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }
  }

  submit = async () => {
    this.checkValid()
    this.setAlert('progress', 'Loading..')
    try {
      const res = await fetch('http://localhost:3000/signup-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.convertData(),
      })

      const data = await res.json()
      if (res.ok) {
        this.setAlert('success', data.message)
        saveSession(data.session)
        location.assign('/')
      } else {
        this.setAlert('error', data.message)
      }
    } catch (error) {
      this.setAlert('error', error.message)
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
      token: getTokenSession(),
    })
  }
}

window.signupConfirmForm = new SignupConfirmForm()
