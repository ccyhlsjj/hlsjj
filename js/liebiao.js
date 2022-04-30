class Liebiao {
    constructor() {
        this.getData();
        // console.log(this.$('.main')); 
    }
    async getData() {
        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1');
        // console.log(data,status);
        if (status == 200) {
            let html = '';
            data.list.forEach(goods => {
                // console.log(goods);
                html += `<div class="mingxing fl mb20" style="border:2px solid #fff;width:230px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'">
                <div class="sub_mingxing"><a href=""><img src="${goods.img_big_logo}" alt=""></a></div>
                <div class="pinpai"><a href="">${goods.title}</a></div>
                <div class="jiage">￥${goods.price}</div>
                <div class="piao">
                <a href="">
                    <span>发货快,选小米</span>
                    <span>立即抢购</span>
                </a>
        </div>
            </div>`
            });
            console.log(this.$('.danpin .main'));
            this.$('.danpin .main').innerHTML = html;
        }
    }
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Liebiao;