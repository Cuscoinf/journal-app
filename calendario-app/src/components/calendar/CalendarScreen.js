import React, { useState } from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiCloseModal, uiOpenModal } from '../../actions/actions'
import { eventAddNew, eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'

moment.locale('es')
const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fad732',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Cristiand'
    }
  }]

export const CalendarScreen = () => {
    
    const dispatch = useDispatch();

    const state = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }
    }

    return (
        <div>
            <Navbar />
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            view={lastView}
            components={{
                event: CalendarEvent,
            }}
            />

            <AddNewFab />
            
            <CalendarModal/>
        </div>
    )
}
