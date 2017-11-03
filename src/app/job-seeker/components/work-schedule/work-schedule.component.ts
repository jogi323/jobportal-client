import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { JobseekerService } from '../../../shared/services/jobseeker.service';

@Component({
    selector: 'app-work-schedule',
    templateUrl: './work-schedule.component.html',
    styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {
    events: any[];
    eventToStore: any;
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
    repeatDay: string;
    constructor(private cd: ChangeDetectorRef, public apiservice: ApiService, public jobseekerservice : JobseekerService) {
        this.minDate = new Date();
        this.calendarminDate = new Date();
        this.times = ['12:00', '12:30', '13:00', '13:30', '14:00'];
        this.eventToStore = [{
            Date: null,
            Time_Start: '',
            Time_Finish: '',
            Hours_Guaranteed: null,
            Date_Submitted: null
        }];
        this.events = [{
            id : null,
            Date : null
        }]
    }

    ngOnInit() {
        // this.eventService.getEvents().then(events => {this.events = events;});
        this.jobseekerservice.getJobSchedules().subscribe(res =>{
            // this.events = res.data;
            for(let index=0; index<res.data.length; index++){
                let eventToshow = {
                    id : res.data[index]._id,
                    start : res.data[index].Date
                }
                this.events.push(eventToshow);
            }
        },
        err =>{
            console.log(err);
        }
    )
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
            switch (this.start.getDay()) {
                case 0:
                    this.repeatDay = 'Sunday\'s';
                    break;
                case 1:
                    this.repeatDay = 'Monday\'s';
                    break;
                case 2:
                    this.repeatDay = 'Tuesday\'s';
                    break;
                case 3:
                    this.repeatDay = 'Wednesday\'s';
                    break;
                case 4:
                    this.repeatDay = 'Thursday\'s';
                    break;
                case 5:
                    this.repeatDay = 'Friday\'s';
                    break;
                default:
                    this.repeatDay = 'Saturday\'s';
                    break;

            }
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

    postEvent(data) {
        this.jobseekerservice.postJobSchedules(data).subscribe(res => {
            console.log(res);
            if(res){
                this.events.push(this.eventToStore);
                console.log(this.events);
            }
        },
            err => {
                console.log(err);
            }
        )
        this.event = null;
    }

    saveEvent() {
        let startDate = new Date(this.event.start);
        let startDay = startDate.getDate();
        if (this.event.allMonth) {
            let lastDay = (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59)).getDate();
            let diff = startDay + (lastDay - startDay);
            let b = 0;
            for (let i = startDay; (i < diff); i+=7) {
                if (b == 0) {
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 0)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: 4
                    }
                    this.eventToStore.push(eventToSave);
                    b++;
                }
                else {
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 7)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: 4
                    }
                    this.eventToStore.push(eventToSave);
                }
                //startDate = new Date(startDate.setDate(startDate.getDate() + 7));
            }
            this.postEvent(this.eventToStore);
        }
        else if (this.event.allWeek) {
            //let start = startDate;
            let lastDay = startDate.getDate() + 7;
            let diff = startDay + (lastDay - startDay);
            let a = 0;
            for (let i = startDay; i < (diff); i++) {
                if(a == 0){
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 0)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: 4
                    }
                    this.eventToStore.push(eventToSave);
                    a++;
                }
                else{
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 1)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: 4
                    }
                    this.eventToStore.push(eventToSave);
                }
                //startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            }
            this.postEvent(this.eventToStore);
        }
        else {
            this.eventToStore[0].Date = this.event.start;
            this.eventToStore[0].Time_Start = this.startTime;
            this.eventToStore[0].Time_Finish = this.endTime;
            this.eventToStore[0].Hours_Guaranteed = 4;
            this.eventToStore[0].Date_Submitted = new Date();
            this.postEvent(this.eventToStore);
        }
        this.dialogVisible = false;
    }

    deleteEvent(id) {
        this.jobseekerservice.deleteScheduledJob(id).subscribe( res => {
            console.log(res);
        })
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
