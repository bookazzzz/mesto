export default class UserInfo {
  constructor({ userName, userJob }) {
      this._userName = document.querySelector(userName);
      this._userJob = document.querySelector(userJob);
  }


  getUserInfo() {
      const dataUser = {};
      dataUser.fieldone = this._userName.textContent;
      dataUser.fieldtwo = this._userJob.textContent;
      return dataUser;
  }


  setUserInfo({ name, job }) {
      this._userName.textContent = name;
      this._userJob.textContent = job;
  }
}
