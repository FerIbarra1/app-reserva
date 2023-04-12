import { useEffect, useState } from "react";
import { Perks } from "../Perks"
import { PhotosUploader } from "../PhotosUploader"
import { AccountNav } from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export const PlacesFormPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    const inputHeader = (text) => {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    const inputDescription = (text) => {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    const savePlace = async (ev) => {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        };
        if (id) {
            //Actualizar
            await axios.put('/places', {
                id, ...placeData

            });
            setRedirect(true);

        } else {
            //Crear Nuevo
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Titulo', 'El título para su lugar. debe ser corto y pegadizo como un anuncio')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Titulo, Por Ejemplo: Mi Hermoso Apartamento" />
                {preInput('Dirección', 'Dirección del lugar')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Dirección" />
                {preInput('Fotos', 'Más = Mejor')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Descripción', 'Descripción del Lugar')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Beneficios', 'Selecciona todos los beneficios del lugar')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Información Adicional', 'Reglas de la casa, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check In & Check Out', 'Añadir hora de Check In y Check Out. Recuerde tener una ventana de tiempo para limpiar la habitación entre invitados.')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Hora de Check In</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="8:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Hora de Check Out</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="14:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Número Máximo de Invitados</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Precio por Noche</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className="primary my-4">Guardar</button>
            </form>
        </div>
    )
}
