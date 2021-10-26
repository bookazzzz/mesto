export default class UserInfo {
  constructor({ userName, userJob,id,avatarSelector }) {
      this._userName = document.querySelector(userName);
      this._userJob = document.querySelector(userJob);
      this._id = id;
      this._avatarSelector = document.querySelector(avatarSelector);
  }


  getUserInfo() {
      const dataUser = {};
      dataUser.name = this._userName.textContent;
      dataUser.job = this._userJob.textContent;
      dataUser.id = this._id;
      dataUser.avatarSelector = this._avatarSelector
      return dataUser;
  }


  setUserInfo({ name, job,id,avatarSelector }) {
      this._userName.textContent = name;
      this._userJob.textContent = job;
      this._id = id;
      this._avatarSelector.src = avatarSelector;
  }
}
