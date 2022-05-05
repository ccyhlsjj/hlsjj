class Gouwuche {
    constructor() {
        this.checkLogin();
        this.getGwc();
        this.bindEve();
    }
    //判断用户是否登录
    async checkLogin() {
        const TOKEN = localStorage.getItem('token');
        //验证是否登录过期
        axios.defaults.headers.common['Authorization'] = TOKEN;
        let user_id = localStorage.getItem('user_id');
        let { data, status } = await axios.get('http://localhost:8888/users/info/' + user_id);
        // console.log(data,status);
        if (!TOKEN || data.code == 401) {
            location.assign('./login.html?ReturnUrl=./gouwuche.html')
        }
    }
    //添加购物车数据
    async getGwc() {
        const TOKEN = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        axios.defaults.headers.common['Authorization'] = TOKEN;
        let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + user_id);
        // console.log(res);
        if (status == 200) {
            // console.log(data);
            //登录超过有效期则跳转登录页
            if (data.code == 401) location.assign('./login.html?ReturnUrl=./gouwuche.html')
            if (data.code == 1) {
                // console.log(data.cart);
                let html = '';
                data.cart.forEach(ele => {

                    html += `<div class="content2 center" data-id = "${ele.goods_id}">
                    <div class="sub_content fl " >
                        <input type="checkbox" value="danxuan" class="danxuan" />
                    </div>
                    <div class="sub_content fl"><img src="${ele.img_small_logo}"></div>
                    <div class="sub_content fl ft20" id="title">${ele.title}</div>
                    <div class="sub_content fl ">${ele.price}</div>
                    <div class="sub_content fl">
                        <input class="shuliang" type="number" value="${ele.cart_number}" step="1" min="1">
                    </div>
                    <div class="sub_content fl subtotal">${(ele.price * ele.cart_number-0).toFixed(2)}</div>
                    <div class="sub_content fl"><a href="javascript:;" class="dell">×</a></div>
                    <div class="clear"></div>
                    </div>`
                });
                // console.log(this.$('.gwcxd .content2')[1]);
                this.$('.gwcxd .content_2').innerHTML = html;
            }
        }

    }
    //绑定事件
    bindEve() {
        this.$('.content_2').addEventListener('click', this.distEve.bind(this));
        //绑定全选事件
        this.$('.sub_top .quanxuan').addEventListener('click', this.allCheck.bind(this));
        //改变商品数量,重新计算小计
        // console.log(this.$('.content_2'));
        this.$('.content_2').addEventListener('input', this.changeNum.bind(this));
    }
    //删除按钮事件
    distEve(eve) {
        let that = this;
        let { target } = eve;
        // console.log(target);
        //判断点击按钮是否是删除按钮
        if (target.classList.contains('dell')) {
            // console.log(target);
            //弹框确认删除
            let layerDell = layer.confirm('你确认不是手贱点了一下么', { title: '删除提示' }, function () {
                let boxObj = target.parentNode.parentNode;
                // console.log(boxObj);
                //商品ID
                let id = boxObj.dataset.id;
                // console.log(id);
                //用户ID
                let userId = localStorage.getItem('user_id');
                // console.log(userId);
                axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + id)
                    .then(res => {
                        let { data, status } = res;
                        // console.log(data,status);
                        if (data.code == 1) {
                            //关闭弹出框
                            layer.close(layerDell);
                            //删除成功框
                            layer.msg('删除成功');
                            //删除对应商品
                            boxObj.remove();
                            //获取选中商品的数量价格
                            that.getNumPrice();

                        }
                    })
            })


        }
        //获取单选按钮
        if (eve.target.classList.contains('danxuan')) {
            //执行单选按钮回调函数
            this.oneCheckChecked(eve.target);
            //获取选中商品的数量价格
            this.getNumPrice();
        }

    }
    //单选按钮回调函数
    //根据单选按钮状态,设置全选按钮是否选中
    oneCheckChecked(target) {
        //存在一个单选按钮没选中,则全选不选
        if (!target.checked) {
            // console.log(this.$('.sub_top .quanxuan'));
            this.$('.sub_top .quanxuan').checked = false;
        }
        //当单选按钮全都选中,全选按钮选中
        if (target.checked) {
            // console.log(this.$('.danxuan'));
            //返回未选中的单选按钮
            let res = Array.from(this.$('.danxuan')).find(danxuan => {
                // console.log(danxuan.checked);
                return !danxuan.checked;
            })
            // console.log(res);
            //
            //没有未选中的单选按钮,即单选全部选中,则全选按钮选中
            if (!res) {
                this.$('.sub_top .quanxuan').checked = true;
            }
        }
    }
    //全选按钮事件
    allCheck(eve) {
        // console.log(eve.target);
        //全选按钮状态
        let checked = eve.target.checked;
        // console.log(checked);

        this.oneCheck(checked);

        //计算商品数量价格函数
        this.getNumPrice();

        //改变商品数量,重新计算小计
        // console.log(this.$('.content_2'));
        this.$('.content_2').addEventListener('input', this.changeNum.bind(this));
    }
    //让所有单选按钮状态跟随全选按钮状态,实现全选按钮功能
    oneCheck(oneChecked) {
        let danxuanList = document.querySelectorAll('.content_2 .danxuan');
        // console.log(danxuanList,oneChecked);
        danxuanList.forEach(danxuan => {
            // console.log(danxuan);
            danxuan.checked = oneChecked;
        })
    }
    //获取已选中的商品数量价格
    getNumPrice() {
        let goods = document.querySelectorAll('.content_2 .content2');
        // console.log(goods);
        let totNum = 0;
        let totPrice = 0;

        goods.forEach(single => {
            // console.log(single);
            if (single.firstElementChild.firstElementChild.checked) {
                // console.log(single);
                // console.log(single.querySelector('.shuliang').value);
                let singleNum = single.querySelector('.shuliang').value - 0;
                totNum += singleNum;
                // console.log(single.querySelector('.subtotal').innerHTML-0);
                let singlePrice = single.querySelector('.subtotal').innerHTML - 0;
                totPrice += singlePrice;
            }
            // console.log(totNum);
            // console.log(totPrice);
            // console.log(totalNum);

        })
        // console.log(this.$('.jiesuandan .num'));
        this.$('.jiesuandan .num').innerHTML = totNum;
        this.$('.jiesuanjiage span').innerHTML = totPrice + '元';
    }
    //改变商品数量,重新计算小计
    changeNum(ele) {
        // console.log(ele);
        //判断点击的是不是改变数量的input
        if (ele.target.classList.contains('shuliang')) {
            // console.log(ele.target.value);
            // console.log(ele.target.parentNode.parentNode.dataset.id);
            //获取用户ID
            let id = localStorage.getItem('user_id');
            //获取商品ID
            let goodsId = ele.target.parentNode.parentNode.dataset.id;
            //获取商品改变数量
            let cnum = ele.target.value - 0;
            let data = `id=${id}&goodsId=${goodsId}&number=${cnum}`;
            axios.post('http://localhost:8888/cart/number', data)
                .then(res => {
                    // console.log(res);
                    let { data, status } = res;
                    // console.log(data,status);
                    if (status == 200) {
                        if (data.code == 1) {
                            //获取商品单价
                            let onePrice = ele.target.parentNode.previousElementSibling.innerHTML - 0;
                            // console.log(onePrice);
                            //获取小计
                            let totalPrice = ele.target.parentNode.nextElementSibling.innerHTML;
                            // console.log(totalPrice);
                            //计算改变数量后的小计
                            totalPrice = (cnum * onePrice).toFixed(2);
                            ele.target.parentNode.nextElementSibling.innerHTML = totalPrice;
                            //计算商品数量价格函数
                            this.getNumPrice();
                        }
                    }
                })
        }
    }
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Gouwuche();