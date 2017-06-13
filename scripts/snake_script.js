time = 5;
window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    // setInterval(game,1000/time);
    setTimeout(game,1000/time);
}
//interval = 0;
px=py=10;  // X/Y-Positions
pause=-1;  // Pause-Variable   
gs=20;    // // GRID-SIZE,
tcX=40;  // TILE-COUNT-Y
tcY=22;  // TILE-COUNT-X
ax=ay=15;  // APPLE-X, APPLE-Y
xv=yv=0;   // X-Velocity, Y-Velocity
trail=[];
tail = 5;
function game() {
    if(pause > 0) {
        ctx.font = "100px comic sans";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused",370,120);
    } else {
        px+=xv;
        py+=yv;
        if(px<0) {
            px= tcX-1;
        }
        if(px>tcX-1) {
            px= 0;
        }
        if(py<0) {
            py= tcY-1;
        }
        if(py>tcY-1) {
            py= 0;
        }
        ctx.fillStyle="black";
        ctx.fillRect(0,0,canv.width,canv.height);

        ctx.fillStyle="lime";
        for(var i=0;i<trail.length;i++) {
            ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
            if(trail[i].x==px && trail[i].y==py && tail != 5) {
                tail = Math.max(trail.length-i, 5);
                time = Math.max(time - (tail-5), 5);
            }
        }
        trail.push({x:px,y:py});
        while(trail.length>tail) {
            trail.shift();
        }

        if(ax==px && ay==py) {
            tail++;
            time++;
            _bol = true;
            while(_bol == true) {
                _bol = false;
                ax=Math.floor(Math.random()*tcX);
                ay=Math.floor(Math.random()*tcY);
                for(var i=0;i<trail.length;i++) {
                    if(trail[i].x==ax && trail[i].y==ay) {
                        _bol = true;
                    }
                }
            }
        }
        ctx.fillStyle="red";
        ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
    }
    ctx.font = "20px comic sans";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("level: " + (time-5),40,canv.height-20);
    setTimeout(game,1000/time);
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            if (xv > 0) {
                break;
            }
            xv=-1;yv=0;
            break;
        case 38:
            if (yv > 0) {
                return;
            }
            xv=0;yv=-1;
            break;
        case 39:
           if (xv < 0) {
                break;
            }
            xv=1;yv=0;
            break;
        case 40:
            if (yv < 0) {
                return;
            }
            xv=0;yv=1;
            break;
        case 80:
            pause=-pause;
            break; 
    }
}