var log = function() {
    console.log.apply(console, arguments)
}

var start = $('.glyphicon-play')
var pause = $('.glyphicon-pause')
var back = $('.glyphicon-backward')
var next = $('.glyphicon-forward')
var string = [
    {
        id: 0,
        name: '卡农',
        author: 'abo',
    },
    {
        id: 1,
        name: 'StayLive',
        author: 'abo',
    },
    {
        id: 2,
        name: 'abo',
        author: 'abo',
    },
]

//获取audio元素
var audio = $('#player')[0]

var play = function() {
    audio.play()
    // audio.setAttribute('data-id',)
    auto()
    //给第一首个加载播放状态
    // if($('.start').hasClass('glyphicon-pause')) {
    //     $($('.name')[0]).addClass('active')
    // }
    // log($('.name')[0])
}
//点击按钮播放/暂停
var start = function() {
    $('.start').on('click',function(){
        // log('click')
        if(audio.paused == true){
            $('.start').removeClass('glyphicon-play')
            $('.start').addClass('glyphicon-pause')
            play()
        } else{
            $('.start').addClass('glyphicon-play')
            $('.start').removeClass('glyphicon-pause')
            //取消进度条加载
            audio.pause()
            clearInterval(at)

        }

    })
}
//点击按钮暂停
// var pause = function() {
//     $('.glyphicon-pause').on('click', function(){
//         audio.pause()
//         //取消进度条加载
//         clearInterval(at)
//
//     })
// }

//静音开关
var volicTogg = function() {
    $('.vol').on('click', function() {
        // log('volice click')
        //设置静音

        if(audio.muted === false){
            audio.muted = true
            $('.vol').addClass('glyphicon-volume-off')
            $('.vol').removeClass('glyphicon-volume-up')
        } else {
            audio.muted = false
            $('.vol').removeClass('glyphicon-volume-off')
            $('.vol').addClass('glyphicon-volume-up')
        }
    })
}

//跳跃加载
var jump = function() {
    var time = $('.long')
    time.on('click', function() {
        var nowTime = time.val()
        audio.currentTime = nowTime
        log('input click')
        if(audio.paused = false) {
            audio.play()
        }
    })
}

//歌曲切换
var songSwitch = function(n) {
    // $('.glyphicon-forward').on('click', function() {
        var l = string.length
        var id = ($('.active').data('id') + n + l) % l
        log('id',id)
        // log($('.name')[id])
        var path = $('.name')[id].dataset.path
        log('path')
        audio.src = path
        audio.play()
        //歌名加状态
        $('.active').removeClass('active')
        $($('.name')[id]).addClass('active')
    // })
}

//上一首
var playBackward = function() {
    $('.glyphicon-backward').on('click', function() {
        songSwitch(-1)
    })}

//下一首
var playNext = function() {
    $('.glyphicon-forward').on('click', function() {
        songSwitch(1)
    })
}

//加载播放列表
var list = function() {
    for (var i = 0; i < string.length; i++) {
        var t = `<p class='name' data-id='${string[i].id}' data-path='music/${string[i].name}-${string[i].author}.mp3'>${string[i].name}-${string[i].author}</p>`
        $('.list').append(t)
    }
}

//给播放歌曲添加播放状态
var active = function() {

}

//点击歌曲播放
var SongPlay = function() {
    $('.list').on('click', '.name', function(event) {
        var t = $(event.target)
        //给播放歌曲添加状态
        $('.active').removeClass('active')
        t.addClass('active')
        var song = t.text()
        var path = `music/${song}.mp3`
        audio.src = path
        //给播放的歌曲设定ID
        var id = $('.active').data('id')
        audio.setAttribute('data-id',id)
        //通过监听播放按钮图标，决定切换时是否播放。
        if($('.start').hasClass('glyphicon-pause')) {
            audio.play()
        }
    } )
}

//auto加载进度条
var auto = function() {
    at = setInterval(function(){
        //设置进度条最大值
        $('.long')[0].max = audio.duration
        //获取当前播放时间点
        var long = audio.currentTime
        // log(long)
        //给value赋值，改变进度条
        $('.long').val(long)
        //改变进度条时间
        setTime()
            },1000)
}

//播放时间转换
var timeChange = function(time) {
    var min = Math.floor(time / 60)
    var s = Math.floor(time % 60)
    if(s < 10) {
        s = `0${s}`
    }
    var t = `${min}:${s}`
    return t
}

//设置进度条首尾时间
var setTime = function() {
    //当前播放时间
    var timeLeft = timeChange(audio.currentTime)
    //总时间
    var timeRight = timeChange(audio.duration)

    $('.time-left').text(timeLeft)
    $('.time-right').text(timeRight)
}

//事件绑定集合
var bind = function() {
    //播放按钮
    start()

    //静音按钮
    volicTogg()

    //滑动条监听
    jump()

    //点击歌曲名播放歌曲
    SongPlay()

    //上一首
    playBackward(-1)

    //下一首
    playNext(1)
}

//初始化操作
var load = function() {
    //加载播放列表
    list()
    //给第一首歌加载播放状态
    $($('.name')[0]).addClass('active')
}
//主函数
var __main = function() {
    //绑定事件
    bind()
    //初始化
    load()
}
__main()
