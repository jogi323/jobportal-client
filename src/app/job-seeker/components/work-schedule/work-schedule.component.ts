import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-work-schedule',
    templateUrl: './work-schedule.component.html',
    styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {

    events: any[];
    header: any;
    start: any;
    event: MyEvent;
    dialogVisible: boolean = false;
    idGen: number = 100;
    minDate: any;
    minDateAlert: boolean;
    calendarminDate: any;
    startTime: any;
    endTime: any
    times: any;
    constructor(private cd: ChangeDetectorRef) {
        this.minDate = new Date();
        this.calendarminDate = new Date();
        this.times = ['12:00', '12:30', '13:00', '13:30', '14:00'];
    }

    ngOnInit() {
        // this.eventService.getEvents().then(events => {this.events = events;});
        this.events = [
            {
                "title": "All Day Event",
                "start": "2017-10-01"
            },
            {
                title: 'Meeting',
                start: '2017-10-01T10:30:00',
                end: '2017-10-01T12:30:00'
            }
        ];
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: ''
            // right: 'month,agendaWeek,agendaDay'
        };
        //this.minDate = '';
        this.minDate = this.formatDate();
    }

    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    handleDayClick(event) {
        console.log(event);
        if (event.date.format() < this.minDate) {
            alert('please select from today onwards');
        }
        else {
            this.start = event.date._d;
            //console.log(new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
            this.event = new MyEvent();
            this.event.start = event.date.format();
            this.dialogVisible = true;
            //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
            this.cd.detectChanges();
        }
    }

    handleEventClick(e) {
        console.log("handle event click");
        if (e.calEvent.start.format() < this.minDate) {
            alert('outdated event');
        }
        else {
            this.event = new MyEvent();
            this.event.title = e.calEvent.title;

            let start = e.calEvent.start;
            let end = e.calEvent.end;

            if (e.view.name === 'month') {
                start.stripTime();
            }

            if (end) {
                end.stripTime();
                this.event.end = end.format();
            }

            this.event.id = e.calEvent.id;
            this.event.start = start.format();
            this.event.allDay = e.calEvent.allDay;
            this.dialogVisible = true;
        }
    }

    saveEvent() {
        // if(!this.event.end){
        //     this.event.end = this.event.start + 'T' + this.endTime;
        // }
        // else{
        //     this.event.end = this.event.end + 'T' + this.endTime;
        // }
        // this.event.start = this.event.start + 'T' + this.startTime;

        if (this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        }
        //new
        else {
            this.event.id = this.idGen++;
            if (this.event.allWeek) {
                this.event.end = this.start.setDate(this.start.getDate() + 7);
                this.events.push(this.event);
                this.event = null;
            }
            if (this.event.allMonth) {
                let startDate = new Date(this.event.start);
                let start = startDate.getDate();
                let last = (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59)).getDate();
                this.events.push(this.event);
                let a = this.event;
                let eventsArray = [];
                while (start <= last) {
                    start = start + 7;
                    var date;
                    var event = new MyEvent();
                    event.title = a.title;
                    date = new Date(startDate.setDate(startDate.getDate() + 7));
                    event.start = date;
                    this.events.push(event);
                }
                this.event = null;
            }
            else {
                this.events.push(this.event);
                this.event = null;
            }
            //this.events.push(this.event);

        }


        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
}
export class MyEvent {
    id: number;
    title: string;
    start: any;
    end: any;
    allDay: boolean;
    allWeek: boolean;
    allMonth: boolean;

}
