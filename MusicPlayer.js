var log = function() {
    console.log.apply(console, arguments)
}

var start = $('.glyphicon-play')
var pause = $('.glyphicon-pause')
var back = $('.glyphicon-backward')
var next = $('.glyphicon-forward')

//获取audio元素
var audio = $('#player')[0]

//获取当前播放的时间点
var getTime = function() {
    var time = audio.currentTime
    return time;
}

//点击按钮播放
var start = function() {
    $('.glyphicon-play').on('click',function(){
        audio.play()

        auto()
    })
}

//点击按钮暂停
var pause = function() {
    $('.glyphicon-pause').on('click', function(){
        audio.pause()
        //取消进度条加载
        clearInterval(at)

    })
}

//进度条前进
var Poagress = function() {
    //获取当前播放时间点
    var long = getTime()
    // log(long)
    //给value赋值，改变进度条
    $('.long').val(long)
}

//auto加载进度条
var auto = function() {
                at = setInterval(function(){
                            Poagress()
                        },1000)
            }

//跳跃加载
var jump = function() {
    var time = $('.long')
    time.on('click', function() {
        var nowTime = time.val()
        audio.currentTime = nowTime
        log('input click')
        audio.play()
    })

}

//主函数
var __main = function() {
    start()
    pause()
    jump()
}
__main()
