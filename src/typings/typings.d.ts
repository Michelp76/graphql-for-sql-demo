interface tAirportCode {
  airportCode: string;
}

export interface tAirport {
  airportName: {
    en: string;
    ru: string;
  };
  city: {
    en: string;
    ru: string;
  };
  coordinates: {
    x: number;
    y: number;
  };
}

interface tBooking {
  id: string;
}

export interface tContext {
  req: tReq;
  res?: object;
}

export interface tFlight {
  actualArrival: Date;
  actualDeparture: Date;
  aircraftCode: string;
  arrivalAirport: string;
  departureAirport: string;
  flightNo: string;
  flightId: string;
  scheduledArrival: Date;
  scheduledDeparture: Date;
  status: string;
}

export interface tPassenger {
  passengerId: string;
  passengerName: string;
  contactData?: {
    email: string;
    phone: string;
  };
}

export interface tReq {
  acceptsLanguages: (...args: string[]) => string;
  body: { query?: string; variables?: string };
  headers: object;
  language?: string;
  user?: { id: string };
}

export interface tTicket {
  ticketNo: string;
  bookRef: string;
  passengerId: number;
  passengerName: string;
  contactData: object;
}
