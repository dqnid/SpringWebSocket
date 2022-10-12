var actualDate=[0,0,0];

const events = [
    {
        "nombre":"uno",
        "fecha":[2022,9,22],
    },
    {
        "nombre":"dos",
        "fecha":[2022,9,10]
    },
    {
        "nombre":"tres",
        "fecha":[2022,9,10]
    },
    {
        "nombre":"cuatro",
        "fecha":[2022,9,10]
    },
    {
        "nombre":"cinco",
        "fecha":[2022,9,10]
    },
    {
        "nombre":"cinco",
        "fecha":[2022,8,7]
    }
];

function fillMonth(year,month){
    const monthNames = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    let month_name=document.getElementById("month");
    month_name.textContent=monthNames[month];
    let year_name = document.getElementById("year");
    year_name.textContent=year;

    let today = getToday();
    actualDate[0]=year;
    actualDate[1]=month;
    actualDate[2]=today[2];

    let x=getDayOfWeek(year,month,1);
    let y=1;
    let mX=7;
    let days=getDaysMonth(year,month);
    let view = document.getElementById("cal_days");
    for (let i=1;i<=days;i++){
        let nY = y + 1;
        let nX = x + 1;
        
        if (today[2]===i && today[1]===month && today[0]===year)
        {
            view.innerHTML += '<a onClick="setFocusDay(' + i + ')" style="grid-row-start:'+y+';grid-row-end:'+nY+ ';grid-column-start:' + x + ';grid-column-end:' + nX + ';background-color:#023e7d">' + i +'</a>';
        } else {
            view.innerHTML += '<a onClick="setFocusDay(' + i + ')" style="grid-row-start:'+y+';grid-row-end:'+nY+ ';grid-column-start:' + x + ';grid-column-end:' + nX + '">' + i +'</a>';
        }
        x+=1;
        if (x>mX){
            x=1;
            y+=1;
        }
    }
    fillEventList(year,month,events);
    markEventsInCalendar(events);
}

function fillEventList(year,month,event_list){
    clearEventList();
    let event_list_view = document.getElementById("cal_event_list");
    let length = event_list.length;
    let counter = 0;
    while (counter < length){
        if (actualDate[0] === event_list[counter].fecha[0] && actualDate[1] === event_list[counter].fecha[1]){
            event_list_view.innerHTML += '<a>' + event_list[counter].nombre + ', ' + formatDate(event_list[counter].fecha) + '</a>';
        }
        counter+=1;
    }
}

function markEventsInCalendar(event_list){
    let days_view = document.getElementById("cal_days");
    var element = days_view.getElementsByTagName('a');

    let length = event_list.length;
    let counter = 0;
    while (counter < length){
        let date = event_list[counter].fecha;
        if (date[0] === actualDate[0] && date[1] === actualDate[1]){
            //element[date[2]-1].setAttribute("class","dayMarked");
            element[date[2]-1].style.color = "orange";
        }
        counter+=1;
    }
}

function formatDate(date){
    return date[2] + "/" + date[1] + "/" + date[0];
}

function loadNextMonth(){
    let month = actualDate[1]+1;
    let year = actualDate[0];
    if (month>12){
        month = 1;
        year += 1;
    } else if (month < 1){
        month = 12;
        year -= 1;
    }
    let view = document.getElementById("cal_days");
    var element = view.getElementsByTagName('a');
    var counter = 0;
    while(element.length){
      element[counter].parentNode.removeChild(element[counter])
    }
    fillMonth(year,month);
}

function loadPrevMonth(){
    let month = actualDate[1]-1;
    let year = actualDate[0];
    if (month>12){
        month = 1;
        year += 1;
    } else if (month < 1){
        month = 12;
        year -= 1;
    }
    let view = document.getElementById("cal_days");
    var element = view.getElementsByTagName('a');
    var counter = 0; //nunca cambia
    while(element.length){
      element[counter].parentNode.removeChild(element[counter]);
    }
    fillMonth(year,month);
}

function clearEventList(){
     let view = document.getElementById("cal_event_list");
    var element = view.getElementsByTagName('a');
    var counter = 0; //nunca cambia
    while(element.length){
      element[counter].parentNode.removeChild(element[counter]);
    }
}

function getDaysMonth(year,month){
    const days = [31,29,31,30,31,30,31,31,30,31,30,31];
    let temp = (year-2000)%4;
    if (temp != 0){
        days[1] = 28;
    }
    return days[month-1];
}

function getDayOfWeek(year,month,day){
    let temp = year%100;
    let y = parseInt((temp+(temp/4))%7);
    let c = 6;
    const ml = [0,3,3,6,1,4,6,2,5,0,3,5];
    let m = ml[month-1];
    let l=0;

    if ((year%4)===0 && year%100!=0){
        if (month === 1 || month === 2){
            l = 1;
        }
    }
    let res = (y+m+c+day-l)%7;
                
    let view = document.getElementById("cal_days");
    if (res === 0)
    {
        return 7;
    } else {
        return res;
    }
}

function getToday(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let today = [year,month+1,day];
    return today;
}

function setFocusDay(day){
    let view = document.getElementById("cal_days");
    var element = view.getElementsByTagName('a');
    let counter = 0;
    while(counter < element.length){
        if (counter === getToday()[2]-1){
            element[counter].style.color = "white";
            element[counter].style.backgroundColor = "#023e7d";

        } else {
            element[counter].style.color = "white";
            element[counter].style.backgroundColor = "transparent";
        }
        counter++;
    }
    element[day-1].style.color = "black";
    element[day-1].style.backgroundColor = "white";
    
    actualDate[2]=day;

    markEventsInCalendar(events);
    /**
     * Destacar evento
     **/
}

/**
 * Websocket conection
 **/
var stompClient = null;

function connect() {
    var socket = new SockJS('/oz-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/events', function (messageOutput) {
            //Cuando llegue información a /topic/events ejecuto setEvents
            setEvents(messageOutput);
        });
        //Después de establecer la conexión, envío una petición
        sendRequest();
    });
    //asyncSleep(2000).then(()=>{
    //})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncSleep(ms){
    await sleep(ms);
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendUpdateRequest() {
    stompClient.send("/app/event", {}, JSON.stringify({'request':'event'}));
}

 function setEvents(messageOutput) {
    let year = JSON.parse(messageOutput.body).year;
    let month = JSON.parse(messageOutput.body).month;
    let day = JSON.parse(messageOutput.body).day;
    let name = JSON.parse(messageOutput.body).name;
    event = {"nombre":name, "fecha":[year,month,day]};
    events.push(event);

    //No funciona bien, borra los colores de los días marcados
    fillEventList(actualDate[0],actualDate[1],events);
    markEventsInCalendar(events);
}

function sendRequest(){
    stompClient.send("/app/oz-websocket",{},JSON.stringify({'request':'events'}));
}
