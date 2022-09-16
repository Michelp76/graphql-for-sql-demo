import { gql } from 'apollo-server';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

export const typeDefs = [
  ...scalarTypeDefs,
  gql`
    """
    Classes of service
    """
    enum FareConditions {
      Business
      Comfort
      Economy
    }

    """
    The *current* status of a flight
    """
    enum FlightStatus {
      Departed
      Arrived
      On
      Time
      Cancelled
      Delayed
      Scheduled
    }
    """
    Represents a kind of aircraft (not to be confused with a particular *instance* of an aircraft)
    """
    type Aircraft {
      """
      For the purpose of this demo the id is the aircraftCode
      """
      id: ID!
      """
      A string representing the type of aircraft
      """
      aircraftCode: String
      """
      The model of the aircraft, in the language requested by the client
      """
      model: String
      """
      The range of this type of aircraft in miles
      """
      range: NonNegativeInt
    }

    """
    An airport is the source and destination for flights
    """
    type Airport {
      """
      For the purpose of this demo the id is the same as the airportCode
      """
      id: ID!
      """
      The 3 letter airport code, globally unique
      """
      airportCode: String
      """
      The name of the airport in the language requested by the client
      """
      airportName: String
      """
      The name of the city that the airport serves in the language requested by the client
      """
      city: String
      coordinates: Point
      timeZone: TimeZone
    }

    """
    Represents a financial transaction involving 1 or more tickets
    """
    type Booking {
      """
      For the purpose of this demo the id of the booking is the same as the reference
      """
      id: ID!
      """
      The date the booking was made
      """
      bookedAt: DateTime!
      """
      The classic 6 character code (it cannot be unique once the number of bookings exceeds 308M)
      """
      reference: String!
      """
      The amount paid. In the demo database this happens to be in Rubles
      """
      totalAmount: Float!
      """
      The ticket(s) that are linked to this booking
      """
      tickets: [Ticket]
    }

    """
    A flight represents an aircraft flying between two airports on a particular date
    """
    type Flight {
      id: ID!
      actual: TimeInterval
      aircraft: Aircraft!
      arrivalAirport: Airport!
      departureAirport: Airport!
      """
      The flight number is a string where the first 2 characters represent the airline and the remaining digits represent the route
      """
      flightNo: String!
      scheduled: TimeInterval!
      status: FlightStatus!
    }

    """
    Represents a passenger's journey from one airport to another on a given flight.
    """
    type Leg {
      id: ID!
      amount: Float!
      boardingNo: NonNegativeInt
      fareConditions: FareConditions!
      flight: Flight!
      seatNo: String
      ticket: Ticket!
      Passenger: Passenger!
    }

    """
    The coordinates of a place on earth
    """
    type Point {
      latitude: Latitude
      longitude: Longitude
    }

    """
    An aircraft has a number of seats each with their own number-letter code
    """
    type Seat {
      seatNo: String
      aircraft: Aircraft
      fareConditions: FareConditions!
    }

    """
    A person who is traveling
    """
    type Passenger {
      id: ID!
      email: EmailAddress
      name: String!
      phone: PhoneNumber
    }

    """
    A ticket is issued to an individual Passenger. It may include 1-N legs
    """
    type Ticket {
      id: ID!
      booking: Booking!
      ticketFlights: [Leg]
      ticketNo: String!
      Passenger: Passenger!
    }

    """
    The TimeInterval type is a pair of departure and arrival times.
    It can be used for either scheduled or actual time pairs.
    """
    type TimeInterval {
      depart: DateTime
      arrive: DateTime
    }

    type Query {
      allAirports: [Airport]
    }
  `,
];
