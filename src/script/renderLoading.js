export const renderLoading = (popup, isLoading = false, title = 'Сохранить', loadingTitle = 'Загрузка...') => {
  const button = popup.querySelector('.popup__button')

  button.textContent = isLoading ? loadingTitle : title
}
