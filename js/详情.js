//放大镜效果实现
class Zoom {
    constructor() {
        this.leftObj = this.$('.jieshao .left');
        this.smallObj = this.$('.jieshao .left .small');
        this.maskObj = this.smallObj.lastElementChild;
        this.bigObj = this.smallObj.nextElementSibling;
        this.bigImg = this.bigObj.firstElementChild;
        // console.log(this.leftObj);
        // console.log(this.smallObj);
        // console.log(this.maskObj);
        // console.log(this.bigObj);
        // console.log(this.bigImg);
        //绑定鼠标移入事件,显示小盒子大图
        this.smallObj.onmouseenter = this.enterFn.bind(this);
        //绑定鼠标移出事件,隐藏小盒子大图
        this.smallObj.onmouseleave = this.leaveFn.bind(this);
        //绑定鼠标移动事件,实现放大镜效果
        this.smallObj.onmousemove = this.moveFn.bind(this);
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
    //获取节点方法
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Zoom;