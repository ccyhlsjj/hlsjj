class Getdetail {
    constructor() {
        this.getDetail();
    }
    //拿到商品ID
    getDetail() {
        // console.log(location.search); 
        let goods_id = location.search.slice(1, location.search.length);
        // console.log(goods_id);

        axios.get('http://localhost:8888/goods/item?' + goods_id).then(res => {
            // console.log(res);
            let { data, status } = res;
            // console.log(data,status);
            let html_left = `<div class="small" id="small">
                <img src="${data.info.img_big_logo}" width="400" alt="" />
                <div class="mask" id="mask"></div>
                </div>
                <div class="big" id="big">
                <img src="${data.info.img_big_logo}" width="800" alt="" id="img" />
                </div>`
            this.$('.jieshao .left').innerHTML = html_left;

            let html_right = `<div class="h3 ml20 mt20">${data.info.category}</div>
            <div class="jianjie mr40 ml20 mt10">${data.info.title}</div>
            <div class="jiage ml20 mt10">${data.info.price}元</div>
            <div class="ft20 ml20 mt20">选择颜色</div>
            <div class="xzbb ml20 mt10">
                <div class="banben">
                    <a>
                        <span class="yuandian"></span>
                        <span class="yanse">亮黑色</span>
                    </a>
                    <a>
                        <span class="yuandian"></span>
                        <span class="yanse">银白色</span>
                    </a>
                </div>
            </div>
            <div class="xqxq mt20 ml20">
                <div class="top1 mt10">
                    <div class="left1 fl">${data.info.title}</div>
                    
                    <div class="clear"></div>
                </div>
                <div class="bot mt20 ft20 ftbc">总计：${data.info.price}元</div>
            </div>
            <div class="xiadan ml20 mt20">
					<a href="./liebiao.html" class="jrgwc" id="choose">立即选购</a>
					<a href="#none" class="jrgwc" id="shop">加入购物车</a>	
				</div>`
            this.$('.jieshao .right').innerHTML = html_right;
            //调用放大镜方法
            this.zoom();

        })

    }
    //获取追加节点及绑定事件
    zoom(){
        this.leftObj = this.$('.jieshao .left');
            this.smallObj = this.$('.jieshao .left .small');
            this.maskObj = this.smallObj.lastElementChild;
            this.bigObj = this.smallObj.nextElementSibling;
            this.bigImg = this.$('.jieshao .left #img');
            this.shop = this.$('.jieshao .right #shop');
            // console.log(this.leftObj);
            // console.log(this.smallObj);
            // console.log(this.maskObj);
            // console.log(this.bigObj);
            // console.log(this.bigImg);
            // console.log(this.$('.jieshao .right #shop'));
            this.smallObj.onmouseenter = this.enterFn.bind(this);
            //绑定鼠标移出事件,隐藏小盒子大图
            this.smallObj.onmouseleave = this.leaveFn.bind(this);
            //绑定鼠标移动事件,实现放大镜效果
            this.smallObj.onmousemove = this.moveFn.bind(this);
            //点击加入购物
            this.$('.jieshao .right #shop').addEventListener('click',this.detail.bind(this));
    }
    enterFn() {
        this.maskObj.style.display = 'block';
        this.bigObj.style.display = 'block';
    }
    leaveFn() {
        this.maskObj.style.display = 'none';
        this.bigObj.style.display = 'none';
    }
    moveFn(eve) {
        // console.log(eve);
        //获取鼠标相对于可视区的坐标 
        let clix = eve.pageX;
        let cliy = eve.pageY;
        let leftL = this.leftObj.offsetLeft;
        let leftT = this.leftObj.offsetTop;
        // console.log(clix,cliy);
        // console.log(leftL,leftT);
        //获取mask的宽度和高度
        let maskW = this.maskObj.offsetWidth;
        let maskH = this.maskObj.offsetHeight;
        // console.log(maskW,maskH);
        //获取鼠标相对于大盒子的坐标
        let cx = clix - leftL - maskW / 2;
        let cy = cliy - leftT - maskH / 2;
        //设置mask盒子移动边框
        //左上
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        //右下
        let maskMW = this.smallObj.offsetWidth - maskW;
        let maskMH = this.smallObj.offsetHeight - maskH;
        if (cx > maskMW) cx = maskMW;
        if (cy > maskMH) cy = maskMH;
        //让mask盒子跟着鼠标移动
        this.maskObj.style.left = cx + 'px';
        this.maskObj.style.top = cy + 'px';
        //获取大图移动的最大距离
        let bigIX = this.bigObj.offsetWidth - this.bigImg.offsetWidth;
        let bigIY = this.bigObj.offsetHeight - this.bigImg.offsetHeight;
        //让大图跟着鼠标显示
        let bmX = cx / maskMW * bigIX;
        let bmY = cy / maskMH * bigIY;
        this.bigImg.style.left = bmX + 'px';
        this.bigImg.style.top = bmY + 'px';
    }
    detail(eve){
        let goods_id = location.search.slice(4, location.search.length);
        console.log(goods_id);
        let id = localStorage.getItem('user_id');
        let token = localStorage.getItem('token');
        // console.log(id);
        let data = `id=${id}&goodsId=${goods_id}`
        axios.defaults.headers.common['Authorization'] = token;
        axios.post('http://localhost:8888/cart/add',data).then(res=>{
            // console.log(res);
            let {data,status} = res;
            if(status==200){
                if(data.code==1){
                    location.assign('./gouwuche.html')
                }
            }

        })
    }
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Getdetail;



//放大镜效果实现



