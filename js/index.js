//轮播图效果
class Slideshow {
    // index = 0;
    // lastIndex = 0;
    // timer = '';
    constructor() {
        //获取节点
        this.ulLisObj = this.$('.banner_y .slideshow ul li');
        this.olLisObj = this.$('.banner_y .slideshow ol li');
        this.prev = this.$('.banner_y .slideshow .goPrev');
        this.next = this.$('.banner_y .slideshow .goNext');

        //当前图片下标
        this.index = 0;
        //上一张图片下标
        this.lastIndex = 0;

        this.slideshow();
        this.autoShow();
        this.stopShow();

    }
    slideshow() {
        //遍历所有数字,添加点击换图事件
        this.olLisObj.forEach((li, key) => {
            // console.log(li, key);
            li.onclick = function () {
                // console.log(this.index);
                this.lastIndex = this.index;
                this.index = key;
                // console.log(this.lastIndex,this.index);
                this.change();
            }.bind(this);//改变this指向全局
        })
        //点击切到上一张图片
        this.prev.onclick = function () {
            this.lastIndex = this.index;
            this.index--;
            //当图片切到第一张时,下一次切到最后一张
            if (this.index < 0) {
                this.index = this.olLisObj.length - 1;
            }
            this.change();
        }.bind(this);
        //点击切到下一张图片
        this.next.onclick = function () {
            this.lastIndex = this.index;
            this.index++;
            //图片为最后一张时,下一次切到第一张
            if (this.index > this.olLisObj.length - 1) {
                this.index = 0;
            }
            this.change();
        }.bind(this);

    }
    //实现每隔1.5秒自动跳转到下一张图片
    autoShow() {
        this.timer = setInterval(() => {
            this.next.onclick();
        }, 1500)
    }
    //当鼠标移入时清除自动播放
    //鼠标移出打开自动播放
    stopShow() {
        this.next.parentElement.onmouseover = function () {
            clearInterval(this.timer);
        }.bind(this);
        this.next.parentElement.onmouseout = function () {
            this.autoShow();
        }.bind(this);
    }


    //实现图片切换效果
    change() {
        this.olLisObj[this.lastIndex].className = '';
        this.ulLisObj[this.lastIndex].className = '';
        this.olLisObj[this.index].className = 'show';
        this.ulLisObj[this.index].className = 'show';
    }

    //获取节点方法
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Slideshow;

//倒计时实现
class Countdown {
    constructor() {
        //设置倒计时总时间,秒为单位
        this.totalTime = 3600;
        this.timer = '';
        this.count();
    }
    count() {
        //创建定时器,每秒倒计时执行一次
        this.timer = setInterval(function () {
            if (this.totalTime >= 0) {
                this.hours = Math.floor(this.totalTime / 60 / 60);//剩多少小时
                this.minutes = Math.floor((this.totalTime - 3600 * this.hours) / 60);//剩多少分钟
                this.seconds = parseInt(this.totalTime % 60);//剩多少秒
                // console.log(this.hours,this.minutes,this.seconds);
                //当时间剩个位数时 前面加0
                this.hours = this.hours >= 10 ? this.hour : '0' + this.hours;
                this.minutes = this.minutes >= 10 ? this.minutes : '0' + this.minutes;
                this.seconds = this.seconds >= 10 ? this.seconds : '0' + this.seconds;
                //将时间追加到页面中
                this.$('.danpin .main #shangou .hours').innerHTML = this.hours;
                this.$('.danpin .main #shangou .minutes').innerHTML = this.minutes;
                this.$('.danpin .main #shangou .seconds').innerHTML = this.seconds;
                //总时间每次减1
                this.totalTime--;
            } else {
                //倒计时轮完 ,再来一圈
                this.totalTime = 3600;
            }
        }.bind(this), 1000)

    }
    //获取节点方法
    $(tar) {
        let res = document.querySelectorAll(tar);
        return res.length == 1 ? res[0] : res;
    }
}
new Countdown;
