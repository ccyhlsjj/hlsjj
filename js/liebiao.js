class Liebiao {
    constructor() {
        this.getData();
        // console.log(this.$('.main')); 
        this.$('.danpin .main').addEventListener('click', this.addGwcFn.bind(this))
        this.bindEve();
    }
    async getData() {
        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1');
        // console.log(data,status);
        if (status == 200) {
            let html = '';
            data.list.forEach(goods => {
                // console.log(goods);
                html += `<div class="mingxing fl mb20" data-id="${goods.goods_id}" style="border:2px solid #fff;width:230px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'">
                <div class="sub_mingxing"><a href="javascript:;"><img src="${goods.img_big_logo}" alt="" class="details"></a></div>
                <div class="pinpai"><a href="javascript:;">${goods.title}</a></div>
                <div class="jiage">￥${goods.price}</div>
                <a href="javascript:;" class="piao">
                    立即抢购
                </a>
        </div>
            </div>`
            });
            // console.log(this.$('.danpin .main'));
            this.$('.danpin .main').innerHTML = html;
        }
    }
    async addGwcFn(eve) {
        // console.log(eve.target);
        let token = localStorage.getItem('token');
        if (!token) {
            location.assign('./login.html?ReturnUrl=./liebiao.html')
        }
        //获取商品id
        // console.log(eve.target);
        if (eve.target.classList.contains('piao')) {
            let listObj = eve.target.parentNode;
            // console.log(listObj);
            let goods_id = listObj.dataset.id;
            // console.log(goods_id);
            let userId = localStorage.getItem('user_id');
            // console.log(userId);
            //两个id必须都要有
            let datum = `id=${userId}&goodsId=${goods_id}`;
            if (!goods_id || !userId) throw new Error('两个ID至少有一个不存在');
            axios.defaults.headers.common['Authorization'] = token;
            let { data, status } = await axios.post('http://localhost:8888/cart/add', datum)
            // console.log(data);
            if (status == 200) {
                // console.log(data);
                if (data.code == 1) {
                    layer.open({
                        title: '加入购物车提示'
                        , content: '加入购物车成功'
                        , btn: ['去结算', '留下来']
                        , yes: function (index, layero) {
                            //按钮【按钮一】的回调
                            location.assign('./gouwuche.html')
                        }
                        , btn2: function (index, layero) {
                            //按钮【按钮二】的回调
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                    });
                }
            }

        }
    }
    //点击列表图片挑战商品详情
    bindEve() {
        // console.log(this.$('#shopDetail'));
        
        this.$('#shopDetail').addEventListener('click',this.detail.bind(this));
    }
    detail(eve){
        // console.log(eve.target.parentNode.parentNode.parentNode.dataset.id);
        let goods_id = eve.target.parentNode.parentNode.parentNode.dataset.id;
        if(eve.target.className=='details'){
            // console.log(1);
            location.assign('./details.html?id='+goods_id);
        }
    }
    //获取节点方法


    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Liebiao;