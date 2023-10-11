class BackButton {
  static back() {
    return windows.history.back()
  }
}

window.backButton = BackButton
