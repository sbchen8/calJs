class Calendar {
  constructor(calendar_container, calendar_id) {
    this.calendar_container = document.getElementById(calendar_container);
    this.calendarId = calendar_id;						
    this.weekday = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
    this.month = new Array("January","February","March", "April","May","June","July","August","September","October","November","December");
    this.finalHtml = '';
    this.dateObject = new Date(2017,2,2);
    this.initGui();
  }
    
  initGui (){
    var D = this.dateObject, monthString = this.month[(D.getMonth()>0)?D.getMonth()-1:11], yearString = (D.getMonth()>0)?D.getFullYear():D.getFullYear() - 1;
    var html = '<a href="#" id="calendar_prev_btn"><</a>'+monthString+' '+yearString+'<a href="#" id="calendar_next_btn">></a><table><thead><tr>';
    for(var i=0;i<this.weekday.length; i++)
        html += '<th>'+this.weekday[i]+'</th>';
    
    this.finalHtml = html; 
    this.buildCalendar(D.getFullYear(),D.getMonth());
  }
    
  buildCalendar (year, month){
      
      var calHtml = '';
      if(month > 0) month--; else { month =11;year--;}
      
      var maxDaysInMonth = 32 - new Date(year,month, 32).getDate(), firstDay = this.weekday[new Date(year,month,0).getDay()], skipDays = new Date(year,month,0).getDay()+1, lineElements = 0, currentDate = 1;
      
      while(currentDate<maxDaysInMonth+1){
        
        if(lineElements == this.weekday.length){
            calHtml += '</tr></thead><tbody><tr>';
            lineElements = 0;
        }
        lineElements++;
        if(!skipDays < 1){
            skipDays --;
            calHtml += '<td></td>';
        } else {
            calHtml += '<td><a href="#" class="date_link" data-date="'+currentDate+'"><div class="day_on_month">'+currentDate+'</div></a></td>';
            currentDate++;
        }
      }
      
      this.finalHtml += '</tr>'+calHtml+'</tbody></table>';
      this.calendar_container.innerHTML = this.finalHtml;
      this.nextMonthInit(this);
      this.prevMonthInit(this);
      this.DateClickInit(this);
      this.fireEvent('calendar_ready');
  }
    
  nextMonthInit(calendarObject){
      document.getElementById('calendar_next_btn').addEventListener('click', function(res){
          calendarObject.dateObject.setMonth(calendarObject.dateObject.getMonth()+1);
          calendarObject.initGui();
        });
  }
    
  prevMonthInit (calendarObject){
      document.getElementById('calendar_prev_btn').addEventListener('click', function(res){
          calendarObject.dateObject.setMonth(calendarObject.dateObject.getMonth()-1);
          calendarObject.initGui();
        });
  }
  DateClickInit (calendarObject){
      var dateLinks = document.getElementsByClassName('date_link');
      for(var i=0;dateLinks.length> i; i++){
          var dateNum = dateLinks[i].getElementsByClassName('day_on_month')[0].innerHTML;
          dateLinks[i].addEventListener('click', function(res){
             console.log(this.getAttribute('data-date'));
            });
      }
  }
    
  fireEvent(eventTypeName){
      var event; // The custom event that will be created

      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventTypeName, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = eventTypeName;
      }

      event.eventName = eventTypeName;

      if (document.createEvent) {
        this.calendar_container.dispatchEvent(event);
      } else {
        this.calendar_container.fireEvent("on" + event.eventType, event);
      }
  }
  
  
    
    
}

