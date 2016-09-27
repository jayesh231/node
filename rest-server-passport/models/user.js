var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});