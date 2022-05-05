class Login {
    constructor() {
        // console.log(this.$('.login_submit .submit'));
        this.$('.login_submit .submit').addEventListener('click', this.loginFn.bind(this))

    }
    loginFn() {
        // console.log(location.search.split('=')[1]);
        // console.log(this);
        let forms = document.forms[0].elements;
        // console.log(forms);
        let username = forms.username.value;
        let password = forms.password.value;
        // console.log(!username.trim());
        if (!username.trim() || !password.trim() || !forms.yanzhengma.value.trim()) {
            throw new Error('can not be null');
        }
        // console.log(username);
        // console.log(password);
        let data = `username=${username}&password=${password}`;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(' http://localhost:8888/users/login', data).then(res => {
            // console.log(res);
            let { status, data } = res;
            if (status == 200) {
                if (data.code == 1) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_id', data.user.id);
                    location.search.split('=')[1] ? location.assign(location.search.split('=')[1]) : location.assign('./liebiao.html');
                } else {
                    layer.open({
                        title: '登录提示'
                        , content: '用户名或密码错误,请重新输入'
                        , btn: ['确认', '取消']
                        , yes: function () {
                            //按钮【按钮一】的回调
                            // console.log(index);
                            // console.log(username,password);
                            // console.log(index);
                            // console.log(layero);
                            location.reload();
                        }
                        
                    });
                }

                // location.assign(location.search.split('=')[1]);
            }


        })
    }
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Login;