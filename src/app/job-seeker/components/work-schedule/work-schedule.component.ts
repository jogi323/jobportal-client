import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { JobseekerService } from '../../../shared/services/jobseeker.service';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';

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
    startTimes: any;
    endTimes: any;    
    repeatDay: string;
    constructor(private cd: ChangeDetectorRef, public apiservice: ApiService, public jobseekerservice: JobseekerService, private notificationsService: NotificationsService,
        private loaderService: LoaderService) {
        this.minDate = new Date();
        this.calendarminDate = moment(this.minDate).format('MM/DD/YYYY');
        this.startTimes = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00', '14:00', '15:00', '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
        this.endTimes = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00', '14:00', '15:00', '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];        
        this.events = [{
            id: null,
            Date: null
        }]
        this.eventsToStoreInitialize();
        this.JobSchedules();        
    }
    // Initialize events to store scope
    eventsToStoreInitialize() {
        this.eventToStore = [{
            Date: null,
            Time_Start: '',
            Time_Finish: '',
            Hours_Guaranteed: null,
            Date_Submitted: null
        }];
    }
    // set end time function
    setEndTime(startTime){
        this.endTimes = this.startTimes.slice(this.startTimes.indexOf(startTime)+1);
        // console.log(this.endTime.substr(0,2)-this.startTime.substr(0,2));
    }
    JobSchedules() {
        this.loaderService.display(true);
        this.jobseekerservice.getJobSchedules().subscribe(res => {
            this.events = [{
                id: null,
                Date: null
            }]
            // this.events = res.data;
            for (let index = 0; index < res.data.length; index++) {
                let eventToshow = {
                    id: res.data[index]._id,
                    start: this.formatDate(res.data[index].Date),
                    title: 'Available Time\n' + res.data[index].Time_Start + '-' + res.data[index].Time_Finish
                }
                this.events.push(eventToshow);
            }
            this.loaderService.display(false);
        },
            err => {
                this.loaderService.display(false);
                this.notificationsService.error(
                    err.title,
                    err.error.message,
                    environment.options
                )
            }
        )
    }

    ngOnInit() {
        // this.eventService.getEvents().then(events => {this.events = events;});
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: ''
            // right: 'month,agendaWeek,agendaDay'
        };
        //this.minDate = '';
        this.minDate = this.formatDate(new Date());
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    handleDayClick(event) {
        if (event.date.format() < this.minDate) {
            alert('Please select a future date');
        }
        else {
            this.start = event.date._d;
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
        this.loaderService.display(true);
        if (data.length > 1) {
            data.splice(0, 1);
        }
        this.jobseekerservice.postJobSchedules(data).subscribe(res => {
            if (res) {
                this.loaderService.display(false);
                this.notificationsService.success(
                    'Success',
                    res.message,
                    environment.options
                )
                this.JobSchedules();
            }
        },
            err => {
                this.loaderService.display(false);
                this.notificationsService.error(
                    err.title,
                    err.error.message,
                    environment.options
                )
            }
        )
        this.event = null;
        this.eventsToStoreInitialize();
    }

    saveEvent() {
        let startDate = new Date(this.event.start);
        let startDay = startDate.getDate();
        if (this.event.allMonth) {
            let lastDay = (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59)).getDate();
            let diff = startDay + (lastDay - startDay);
            let b = 0;
            for (let i = startDay; (i < diff); i += 7) {
                if (b == 0) {
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 0)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: this.endTime.substr(0,2)-this.startTime.substr(0,2)
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
                        Hours_Guaranteed: this.endTime.substr(0,2)-this.startTime.substr(0,2)
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
                if (a == 0) {
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 0)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: this.endTime.substr(0,2)-this.startTime.substr(0,2)
                    }
                    this.eventToStore.push(eventToSave);
                    a++;
                }
                else {
                    let eventToSave = {
                        Date: new Date(startDate.setDate(startDate.getDate() + 1)),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: this.endTime.substr(0,2)-this.startTime.substr(0,2)
                    }
                    this.eventToStore.push(eventToSave);
                }
                // startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            }
            this.postEvent(this.eventToStore);
        }
        else {
            this.eventToStore[0].Date = new Date(this.event.start);
            this.eventToStore[0].Time_Start = this.startTime;
            this.eventToStore[0].Time_Finish = this.endTime;
            this.eventToStore[0].Hours_Guaranteed = this.endTime.substr(0,2)-this.startTime.substr(0,2);
            this.eventToStore[0].Date_Submitted = new Date();
            this.postEvent(this.eventToStore);
        }
        this.dialogVisible = false;
    }

    deleteEvent(id) {
        this.jobseekerservice.deleteScheduledJob(id).subscribe(res => {
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
