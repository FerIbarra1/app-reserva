import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [cel, setCel] = useState('')
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    if (name) {
        useEffect(() => {
            setName(user.name);
        }, []);
    }


    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }
    const bookThisPlace = async () => {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, cel,
            place: place._id,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Precio: ${place.price} MXN / Por Noche
            </div>
            <div className="border rounded-2xl">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check In: </label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check Out: </label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div>
                    <div className="py-3 px-4 border-l">
                        <label>Numero de Invitados: </label>
                        <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                    </div>
                    {numberOfNights > 0 && (
                        <div>
                            <div className="py-3 px-4 border-l">
                                <label>Nombre Completo: </label>
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Numero Celular: </label>
                                <input type="tel" value={cel} onChange={ev => setCel(ev.target.value)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Reservar
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>

    );
}
