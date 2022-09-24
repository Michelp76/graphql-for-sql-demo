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
      For the purpose of this demo the id == the aircraftCode
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
      For the purpose of this demo the id == the airportCode
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
      timezone: String
    }

    """
    Represents a financial transaction involving 1 or more tickets
    """
    type Booking {
      """
      For the purpose of this demo the id of the booking == the reference
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
    Model the relationships between a flight, a ticket and a boarding pass
    """
    type BookingLeg {
      flight: Flight!
      ticket: Ticket!
      fareConditions: String!
      amount: Float!
      boardingNo: NonNegativeInt
      seatNo: String
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
    The coordinates of a place on earth. x and y are used as names because the knex driver automatically
    converts postgres POINT geometries to {x,y}.
    """
    type Point {
      x: Longitude
      y: Latitude
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
    An aircraft has a number of seats each with their own number-letter code
    """
    type Seat {
      seatNo: String
      aircraft: Aircraft
      fareConditions: FareConditions!
    }

    """
    A ticket is issued to an individual Passenger. It may include 1-N legs
    """
    type Ticket {
      id: ID!
      booking: Booking!
      passenger: Passenger!
      ticketNo: String!
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
      """
      Return all airports in the database
      """
      allAirports: [Airport]

      """
      Fetch a particular booking
      """
      oneBooking(reference: String!): Booking

      """
      Fetch a particular leg - could be used for a passenger manifest
      """
      fetchItinerary(reference: String!): [BookingLeg]
    }
  `,
];
