import axios from 'axios';
import {statusMap} from "../config/statusMap";
/**
 * v: Object
 * @param v
 */
function handleState(v) {
    this.setState({
        ...v
    })
}

/***
 * v: function
 * @param v
 */
function handleAdvancedState(v) {
    this.setState(v);
}

/**
 * 处理canvas
 * @param ref
 */
function handleCanvas(ref) {
    const canvas = ref;
    const ctx = canvas.getContext('2d')

    const cw = canvas.width = window.innerWidth
    const ch = canvas.height = window.innerHeight

    ctx.fillStyle = '#ECE9E6'
    const linesNum = 16
    const linesRy = []
    var requestId = null

    function Line (flag) {
        this.flag = flag
        this.a = {}
        this.b = {}
        if (flag === 'v') {
            this.a.y = 0
            this.b.y = ch
            this.a.x = randomIntFromInterval(0, ch)
            this.b.x = randomIntFromInterval(0, ch)
        } else if (flag === 'h') {
            this.a.x = 0
            this.b.x = cw
            this.a.y = randomIntFromInterval(0, cw)
            this.b.y = randomIntFromInterval(0, cw)
        }
        this.va = randomIntFromInterval(25, 100) / 150
        this.vb = randomIntFromInterval(25, 100) / 150

        // 线条颜色
        this.draw = function () {
            ctx.strokeStyle = '#eef2f3'
            ctx.beginPath()
            ctx.moveTo(this.a.x, this.a.y)
            ctx.lineTo(this.b.x, this.b.y)
            ctx.stroke()
        }

        this.update = function () {
            if (this.flag === 'v') {
                this.a.x += this.va
                this.b.x += this.vb
            } else if (flag === 'h') {
                this.a.y += this.va
                this.b.y += this.vb
            }
            this.edges()
        }

        this.edges = function () {
            if (this.flag === 'v') {
                if (this.a.x < 0 || this.a.x > cw) {
                    this.va *= -1
                }
                if (this.b.x < 0 || this.b.x > cw) {
                    this.vb *= -1
                }
            } else if (flag === 'h') {
                if (this.a.y < 0 || this.a.y > ch) {
                    this.va *= -1
                }
                if (this.b.y < 0 || this.b.y > ch) {
                    this.vb *= -1
                }
            }
        }
    }

    for (let i = 0; i < linesNum; i++) {
        var flag = i % 2 === 0 ? 'h' : 'v'
        var l = new Line(flag)
        linesRy.push(l)
    }

    function Draw () {
        requestId = window.requestAnimationFrame(Draw)
        ctx.clearRect(0, 0, cw, ch)

        for (let i = 0; i < linesRy.length; i++) {
            l = linesRy[i]
            l.draw()
            l.update()
        }
        for (let i = 0; i < linesRy.length; i++) {
            let l = linesRy[i]
            for (let j = i + 1; j < linesRy.length; j++) {
                var l1 = linesRy[j]
                Intersect2lines(l, l1)
            }
        }
    }

    function Init () {
        linesRy.length = 0
        for (var i = 0; i < linesNum; i++) {
            var flag = i % 2 === 0 ? 'h' : 'v'
            var l = new Line(flag)
            linesRy.push(l)
        }
        if (requestId) {
            window.cancelAnimationFrame(requestId)
            requestId = null
        }
        Draw()
    }

    setTimeout(function () {
        Init()
        window.addEventListener('resize', Init, false)
    }, 15)

    function Intersect2lines (l1, l2) {
        const p1 = l1.a
        const p2 = l1.b
        const p3 = l2.a
        const p4 = l2.b
        const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y)
        const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator
        const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator
        const x = p1.x + ua * (p2.x - p1.x)
        const y = p1.y + ua * (p2.y - p1.y)
        if (ua > 0 && ub > 0) {
            markPoint({
                x: x,
                y: y
            })
        }
    }

    function markPoint (p) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI)
        ctx.fillStyle = '#8e9eab'
        ctx.fill()
    }

    function randomIntFromInterval (mn, mx) {
        return ~~(Math.random() * (mx - mn + 1) + mn)
    }
}

async function httpGet(url) {
    try {
        let {data} = await axios({
            method: 'GET',
            url,
        });
        return data;
    } catch(e) {
        return e;
    }
}

async function httpPost(url, args) {
    try {
        let {data} = await axios({
            method: 'POST',
            url,
            data: {
                ...args
            }
        });
        return data;
    } catch(e) {
        return e;
    }
}

function checkHttpStatus(o) {
    if (o.hasOwnProperty('code') && o.code === '000') {
        return {status: true};
    } else {
        if(statusMap.hasOwnProperty(o.code)) {
            return {status: false, message: statusMap[o.code]};
        } else {
            return {status: false};
        }
    }
}

export {
    handleAdvancedState,
    handleState,
    handleCanvas,
    httpGet,
    httpPost,
    checkHttpStatus
}
