export const SESSION_KEY = 'sessionAuth'
export const saveSession = (session) => {
  window.session = session
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const loadSession = () => {
  const json = localStorage.getItem(SESSION_KEY)
  if (json) {
    const session = JSON.parse(json)
    if (session) {
      window.session = session
    } else {
      window.session = null
    }
  }
}

export const getTokenSession = () => {
  const json = localStorage.getItem(SESSION_KEY)
  if (json) {
    const session = JSON.parse(json)
    if (session) {
      return session.token
    }
  }
  return null
}

export const getSession = () => {
  const json = localStorage.getItem(SESSION_KEY)
  if (json) {
    const session = JSON.parse(json)
    if (session) {
      return session
    }
  }
  return null
}
