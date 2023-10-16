import { Component, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
//import { INITIAL_EVENTS, createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/es';
import { MatDialog } from '@angular/material/dialog';
import { PlaneacionDialogComponent } from './planeacion-dialog/planeacion-dialog.component';
import { BigDataSerivce } from '../service/bigdata.service';
//import { INITIAL_EVENTS } from './event-utils';


@Component({
  selector: 'app-planeacion',
  templateUrl: './planeacion.component.html',
  styleUrls: ['./planeacion.component.scss']
})
export class PlaneacionComponent { calendarVisible = true;
 public  INITIAL_EVENTS :EventInput[];
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    displayEventTime:true,
    height:750,
    handleWindowResize:true,
    aspectRatio:1.35,
    defaultAllDay: false,   
    displayEventEnd:true,
    weekNumbers:true,   
    
    
      slotMinTime:'08:00',
      slotMaxTime:'19:00',
      
    firstDay:0,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridWeek,listWeek'
    },
    initialView: 'dayGridWeek',
    
    
   // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    
     locales: [ esLocale, frLocale ],
      locale: 'es',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,public dialog:MatDialog,
    public bigdataservice:BigDataSerivce
    ) {
      let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
     bigdataservice.getplaneacionesporusuario(suserbigdata[0].usuario_id).subscribe((res)=>{
      this.INITIAL_EVENTS=res;
      this.calendarOptions.events=this.INITIAL_EVENTS;
     })
  }

  replacehtmlwblc(text:string)
  {
    return text.replace("<br>",'').replace("<b>","").replace("</b>","").replace("<br>",'').replace("<br>",'').replace("<br>",'');

  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    //const title = prompt('Porfavor escriba un titulo');
    //const calendarApi = selectInfo.view.calendar;
       //alert("hola"+ selectInfo.startStr);

    const dialogRef = this.dialog.open(PlaneacionDialogComponent, {
     width:"400px",
      data: {
        id:0,
        fechaseleccionada:selectInfo.startStr,
      
        
        //stores: this.stores
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 

      
      
     
    });


    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
       
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    //}
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${this.replacehtmlwblc( clickInfo.event.title)}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
   // console.log(events);
    this.currentEvents = events;
    this.changeDetector.detectChanges();
    console.log
  }
}
