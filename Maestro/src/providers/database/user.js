export var User = (function () {
    function User(firstname, lastname, email, password, salt) {
        this.name = { firstname: firstname, lastname: lastname };
        this._id = email;
        this.credentials = { password: password, salt: salt };
    }
    return User;
}());
//# sourceMappingURL=user.js.map