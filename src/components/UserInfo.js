export default class UserInfo {
  constructor({ userName, userJob,id,avatarSelector }) {
      this._userName = document.querySelector(userName);
      this._userJob = document.querySelector(userJob);
      this._userID = id;
      this._avatarSelector = document.querySelector(avatarSelector);
  }


  getUserInfo() {
      const dataUser = {};
      dataUser.name = this._userName.textContent;
      dataUser.job = this._userJob.textContent;
      this._userID = _id;
      avatarSelector = this._avatarSelector
      return ;
  }


  setUserInfo({ name, job,id,avatarSelector }) {
      this._userName.textContent = name;
      this._userJob.textContent = job;
      this._userID = _id;
      this._avatarSelector.src = avatarSelector;
  }
}
