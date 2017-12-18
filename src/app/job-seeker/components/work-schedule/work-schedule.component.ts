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
    endTime: any;
    startTime1: any;
    endTime1: any
    startTimes: any;
    endTimes: any;
    startTimes1: any;
    endTimes1: any;
    repeatDay: string;
    eventsData: any = [];
    deleteEventStatus: Boolean = false;
    constructor(private cd: ChangeDetectorRef, public apiservice: ApiService, public jobseekerservice: JobseekerService, private notificationsService: NotificationsService,
        private loaderService: LoaderService) {
        this.minDate = new Date();
        this.calendarminDate = moment(this.minDate).format('MM/DD/YYYY');
        // this.startTimes = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        // this.endTimes = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        // this.startTimes1 = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        // this.endTimes1 = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        this.startTimes = [{ value: '08:00', name: '08:00 AM' }, { value: '09:00', name: '09:00 AM' }, { value: '10:00', name: '10:00 AM' }, { value: '11:00', name: '11:00 AM' }, { value: '12:00', name: '12:00 PM' }, { value: '13:00', name: '01:00 PM' }, { value: '14:00', name: '02:00 PM' }, { value: '15:00', name: '03:00 PM' }, { value: '16:00', name: '04:00 PM' }, { value: '17:00', name: '05:00 PM' }];
        this.endTimes = [{ value: '08:00', name: '08:00 AM' }, { value: '09:00', name: '09:00 AM' }, { value: '10:00', name: '10:00 AM' }, { value: '11:00', name: '11:00 AM' }, { value: '12:00', name: '12:00 PM' }, { value: '13:00', name: '01:00 PM' }, { value: '14:00', name: '02:00 PM' }, { value: '15:00', name: '03:00 PM' }, { value: '16:00', name: '04:00 PM' }, { value: '17:00', name: '05:00 PM' }];
        this.startTimes1 = [{ value: '08:00', name: '08:00 AM' }, { value: '09:00', name: '09:00 AM' }, { value: '10:00', name: '10:00 AM' }, { value: '11:00', name: '11:00 AM' }, { value: '12:00', name: '12:00 PM' }, { value: '13:00', name: '01:00 PM' }, { value: '14:00', name: '02:00 PM' }, { value: '15:00', name: '03:00 PM' }, { value: '16:00', name: '04:00 PM' }, { value: '17:00', name: '05:00 PM' }];
        this.endTimes1 = [{ value: '08:00', name: '08:00 AM' }, { value: '09:00', name: '09:00 AM' }, { value: '10:00', name: '10:00 AM' }, { value: '11:00', name: '11:00 AM' }, { value: '12:00', name: '12:00 PM' }, { value: '13:00', name: '01:00 PM' }, { value: '14:00', name: '02:00 PM' }, { value: '15:00', name: '03:00 PM' }, { value: '16:00', name: '04:00 PM' }, { value: '17:00', name: '05:00 PM' }];
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

    // get time object from array of objects
    getTimeObject(time){
        for (let i = 0; i < this.startTimes.length; i++) {
            if (this.startTimes[i].value == time) {
                return this.startTimes[i];
            }
        }
    }
    // set end time function
    setEndTime(startTime) {
        let object = this.getTimeObject(startTime);
        this.endTimes = this.startTimes.slice(this.startTimes.indexOf(object) + 1);        
        this.endTime = this.endTimes[0].value;
        this.startTimes1 = this.startTimes.slice(this.startTimes.indexOf(object) + 2);
        this.endTimes1 = this.startTimes.slice(this.startTimes.indexOf(object) + 3);
    }
    setStarttime(endtime) {
        let object = this.getTimeObject(endtime);
        this.startTimes1 = this.startTimes.slice(this.startTimes.indexOf(object) + 1);
        this.endTimes1 = this.startTimes.slice(this.startTimes.indexOf(object) + 2);
    }
    setEndTime1(startTime) {
        let object = this.getTimeObject(startTime);        
        this.endTimes1 = this.startTimes1.slice(this.startTimes1.indexOf(object) + 1);
        this.endTime1 = this.endTimes1[0].value;
    }
    // Repeat day or week 
    setWeek(event) {
        if (event) {
            this.event.allMonth = false;
        }
    }
    setMonth(event) {
        if (event) {
            this.event.allWeek = false;
        }
    }
    JobSchedules() {
        this.loaderService.display(true);
        this.jobseekerservice.getJobSchedules().subscribe(res => {
            this.events = [{
                id: null,
                Date: null
            }]
            this.eventsData = res.data;
            // this.events = res.data;
            for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].Time_Start1 && res.data[index].Time_Finish1) {
                    let eventToshow = {
                        id: res.data[index]._id,
                        start: this.formatDate(res.data[index].Date),
                        title: 'Available Time\n Time slot1 \n' + res.data[index].Time_Start + '-' + res.data[index].Time_Finish + '\n Time slot2 \n' + res.data[index].Time_Start1 + '-' + res.data[index].Time_Finish1
                    }
                    this.events.push(eventToshow);
                }
                else {
                    let eventToshow = {
                        id: res.data[index]._id,
                        start: this.formatDate(res.data[index].Date),
                        title: 'Available Time\n Time slot1 \n' + res.data[index].Time_Start + '-' + res.data[index].Time_Finish
                    }
                    this.events.push(eventToshow);
                }
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
    getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }
    handleDayClick(event) {
        this.deleteEventStatus = false;
        if (event.date.format() < this.minDate) {
            alert('Please select a future date');
        }
        else {

            this.start = event.date._d;
            this.event = new MyEvent();
            this.initializeTimes();
            let d = new Date(Date.parse(event.date));
            this.event.start = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
            this.repeatDay = this.getRepeatDay(this.start.getDay());
            this.dialogVisible = true;
            //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
            this.cd.detectChanges();
        }
    }
    // get repeat day function
    getRepeatDay(day) {
        switch (day) {
            case 0:
                return 'Sunday\'s';
            case 1:
                return 'Monday\'s';
            case 2:
                return 'Tuesday\'s';
            case 3:
                return 'Wednesday\'s';
            case 4:
                return 'Thursday\'s';
            case 5:
                return 'Friday\'s';
            default:
                return 'Saturday\'s';
        }
    }
    handleEventClick(e) {
        this.deleteEventStatus = true;
        if (e.calEvent.start.format() < this.minDate) {
            alert('outdated event');
        }
        else {
            this.event = new MyEvent();
            // this.event.title = e.calEvent.title;

            let start = e.calEvent.start;
            // let end = e.calEvent.end;

            // if (e.view.name === 'month') {
            //     start.stripTime();
            // }

            // if (end) {
            //     end.stripTime();
            //     this.event.end = end.format();
            // }
            let d = new Date(Date.parse(e.calEvent.start));
            this.event.id = e.calEvent.id;
            // this.event.start = start.format();
            this.event.start = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
            this.repeatDay = this.getRepeatDay(new Date(this.event.start).getDay());
            this.getEventDetails(e.calEvent.id);
            // this.event.allDay = e.calEvent.allDay;
            this.dialogVisible = true;
        }
    }

    //get Event details on event click
    getEventDetails(id) {
        for (let i = 0; i < this.eventsData.length; i++) {
            if (this.eventsData[i]._id == id) {
                this.startTime = this.eventsData[i].Time_Start;
                this.endTime = this.eventsData[i].Time_Finish;
                if (this.eventsData[i].Time_Start1 && this.eventsData[i].Time_Finish1) {
                    this.startTime1 = this.eventsData[i].Time_Start1;
                    this.endTime1 = this.eventsData[i].Time_Finish1;
                }
                else {
                    this.startTime1 = '';
                    this.endTime1 = '';
                }
                this.startTimes1 = this.startTimes.slice(this.startTimes.indexOf(this.endTime) + 1);
                this.endTimes1 = this.startTimes.slice(this.startTimes.indexOf(this.endTime) + 2);
            }
        }
    }
    //Initialize start & end times
    initializeTimes() {
        this.startTime = this.endTime = this.startTime1 = this.endTime1 = '';
    }

    postEvent(data) {
        this.loaderService.display(true);
        if (data.length > 1) {
            data.splice(0, 1);
        }
        console.log(moment(data[0].Date).format('LL'))
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
        this.initializeTimes();
        this.eventsToStoreInitialize();
    }

    saveEvent() {
        let startDate = new Date(this.event.start);
        let startDay = startDate.getDate();
        if (this.event.allMonth) {
            let lastDay = (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59)).getDate();
            let diff = startDay + (lastDay - startDay);
            let b = 0;
            for (let i = startDay; (i <= diff); i += 7) {
                if (b == 0) {
                    let eventToSave = {
                        Date: moment(new Date(startDate.setDate(startDate.getDate() + 0))).format('LL'),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Time_Start1: this.startTime1,
                        Time_Finish1: this.endTime1,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: (this.endTime.substr(0, 2) - this.startTime.substr(0, 2))
                        // +(this.endTime1.substr(0, 2) - this.startTime1.substr(0, 2))
                    }
                    this.eventToStore.push(eventToSave);
                    b++;
                }
                else {
                    let eventToSave = {
                        Date: moment(new Date(startDate.setDate(startDate.getDate() + 7))).format('LL'),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Time_Start1: this.startTime1,
                        Time_Finish1: this.endTime1,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: (this.endTime.substr(0, 2) - this.startTime.substr(0, 2))
                        // +(this.endTime1.substr(0, 2) - this.startTime1.substr(0, 2))
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
                        Date: moment(new Date(startDate.setDate(startDate.getDate() + 0))).format('LL'),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Time_Start1: this.startTime1,
                        Time_Finish1: this.endTime1,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: (this.endTime.substr(0, 2) - this.startTime.substr(0, 2))
                        // +(this.endTime1.substr(0, 2) - this.startTime1.substr(0, 2))
                    }
                    this.eventToStore.push(eventToSave);
                    a++;
                }
                else {
                    let eventToSave = {
                        Date: moment(new Date(startDate.setDate(startDate.getDate() + 1))).format('LL'),
                        Time_Start: this.startTime,
                        Time_Finish: this.endTime,
                        Time_Start1: this.startTime1,
                        Time_Finish1: this.endTime1,
                        Date_Submitted: new Date(),
                        Hours_Guaranteed: (this.endTime.substr(0, 2) - this.startTime.substr(0, 2))
                        // +(this.endTime1.substr(0, 2) - this.startTime1.substr(0, 2))
                    }
                    this.eventToStore.push(eventToSave);
                }
                // startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            }
            this.postEvent(this.eventToStore);
        }
        else {
            this.eventToStore[0].Date = moment(new Date(this.event.start)).format('LL');
            this.eventToStore[0].Time_Start = this.startTime;
            this.eventToStore[0].Time_Finish = this.endTime;
            this.eventToStore[0].Time_Start1 = this.startTime1;
            this.eventToStore[0].Time_Finish1 = this.endTime1;
            this.eventToStore[0].Hours_Guaranteed = (this.endTime.substr(0, 2) - this.startTime.substr(0, 2))
            // +(this.endTime1.substr(0, 2) - this.startTime1.substr(0, 2));
            this.eventToStore[0].Date_Submitted = new Date();
            this.postEvent(this.eventToStore);
        }
        this.dialogVisible = false;
    }

    deleteEvent(id) {
        this.jobseekerservice.deleteScheduledJob(id).subscribe(res => {
            this.dialogVisible = false;
            if (res.status) {
                this.notificationsService.success(
                    'Success',
                    res.message,
                    environment.options
                )
                this.JobSchedules();
            }
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
