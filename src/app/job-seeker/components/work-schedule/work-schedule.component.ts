import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {

  events: any[];
  
  header: any;
  start:any;
  
  event: MyEvent;
  
  dialogVisible: boolean = false;
  
  idGen: number = 100;
  
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
      // this.eventService.getEvents().then(events => {this.events = events;});
      this.events = [
        {
            "title": "All Day Event",
            "start": "2017-10-01"
        },
        {
            "title": "Long Event",
            "start": "2017-02-07",
            "end": "2017-10-10"
        }
    ];
      this.header = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };
  }
  
  
  handleDayClick(event) {      
      this.start = event.date._d;
      //console.log(new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
      this.event = new MyEvent();
      this.event.start = event.date.format();       
      this.dialogVisible = true;
      //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
      this.cd.detectChanges();
  }
  
  handleEventClick(e) {
      this.event = new MyEvent();
      this.event.title = e.calEvent.title;
      
      let start = e.calEvent.start;
      let end = e.calEvent.end;
      
      if(e.view.name === 'month') {
          start.stripTime();
      }
      
      if(end) {
          end.stripTime();
          this.event.end = end.format();
      }

      this.event.id = e.calEvent.id;
      this.event.start = start.format();
      this.event.allDay = e.calEvent.allDay;
      this.dialogVisible = true;
  }
  
  saveEvent() {
      //update
      console.log(this.event);
      if(this.event.id) {
          let index: number = this.findEventIndexById(this.event.id);
          if(index >= 0) {
              this.events[index] = this.event;
          }
      }
      //new
      else {
          this.event.id = this.idGen++;
          if(this.event.allWeek){
              this.event.end = this.start.setDate(this.start.getDate()+7);
          }
          if(this.event.allMonth){
              // var lastDay = new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
               var start = this.start.getDate();
               var last = (new Date(this.start.getFullYear(), this.start.getMonth() + 1, 0, 23, 59, 59)).getDate();
               this.event.end = this.start.setDate(this.start.getDate()+(last-start)+1);
          }
          this.events.push(this.event);
          this.event = null;
      }
      

      this.dialogVisible = false;
  }
  
  deleteEvent() {
      let index: number = this.findEventIndexById(this.event.id);
      if(index >= 0) {
          this.events.splice(index, 1);
      }
      this.dialogVisible = false;
  }
  
  findEventIndexById(id: number) {
      let index = -1;
      for(let i = 0; i < this.events.length; i++) {
          if(id == this.events[i].id) {
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
  start: string;
  end: string;
  allDay: boolean = true;
  allWeek: boolean;
  allMonth: boolean;   

}
