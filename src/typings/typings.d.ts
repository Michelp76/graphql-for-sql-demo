interface tAirportCode {
  airportCode: string;
}

export interface tAirportName {
  airportName: {
    en: string;
    ru: string;
  };
}

interface tBooking {
  id: string;
}

export interface tCity {
  city: {
    en: string;
    ru: string;
  };
}

export interface tContext {
  req: tReq;
  res?: object;
}

export interface tCoordinates {
  coordinates: {
    x: number;
    y: number;
  };
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
