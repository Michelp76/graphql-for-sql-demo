/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/graphql/apollo/context.ts":
/*!***************************************!*\
  !*** ./src/graphql/apollo/context.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "context": () => (/* binding */ context)
/* harmony export */ });
/* harmony import */ var _logGraphQlQueries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logGraphQlQueries */ "./src/graphql/apollo/logGraphQlQueries.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const context = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    req.language = req.acceptsLanguages('en', 'ru') || 'en';
    if (process.env.LOG_GRAPHQL !== 'none')
        (0,_logGraphQlQueries__WEBPACK_IMPORTED_MODULE_0__.logGraphQlQueries)({ req });
    return { req, res };
});


/***/ }),

/***/ "./src/graphql/apollo/executableSchema.ts":
/*!************************************************!*\
  !*** ./src/graphql/apollo/executableSchema.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graphql-tools/schema */ "@graphql-tools/schema");
/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mutations */ "./src/graphql/mutations/index.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resolvers */ "./src/graphql/resolvers/index.ts");
/* harmony import */ var graphql_scalars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql-scalars */ "graphql-scalars");
/* harmony import */ var graphql_scalars__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_scalars__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _typeDefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../typeDefs */ "./src/graphql/typeDefs.ts");





const schema = (0,_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0__.makeExecutableSchema)({
    typeDefs: _typeDefs__WEBPACK_IMPORTED_MODULE_4__.typeDefs,
    resolvers: Object.assign(Object.assign(Object.assign({}, graphql_scalars__WEBPACK_IMPORTED_MODULE_3__.resolvers), _resolvers__WEBPACK_IMPORTED_MODULE_2__.resolvers), _mutations__WEBPACK_IMPORTED_MODULE_1__.mutations),
});


/***/ }),

/***/ "./src/graphql/apollo/logGraphQlQueries.ts":
/*!*************************************************!*\
  !*** ./src/graphql/apollo/logGraphQlQueries.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logGraphQlQueries": () => (/* binding */ logGraphQlQueries)
/* harmony export */ });
const logGraphQlQueries = ({ req }) => {
    var _a;
    try {
        if (process.env.LOG_GRAPHQL === 'verbose') {
            if (req.body.query)
                console.log(req.body.query);
            if (req.body.variables)
                console.log(req.body.variables);
        }
        else if (process.env.LOG_GRAPHQL === 'compact') {
            const queryName = req.body.query
                .split('\n')[1]
                .trim()
                .split(' ')[0]
                .split('(')[0];
            const operationName = req.body.query.split(' ')[0];
            const userString = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)
                ? `for user ${req.user.id}`
                : '(unauthenticated)';
            console.log(`${operationName} ${queryName} ${userString}`);
        }
    }
    catch (error) {
        console.error(error.name);
    }
};


/***/ }),

/***/ "./src/graphql/mutations/index.ts":
/*!****************************************!*\
  !*** ./src/graphql/mutations/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mutations": () => (/* binding */ mutations)
/* harmony export */ });
const mutations = () => { };


/***/ }),

/***/ "./src/graphql/resolvers/index.ts":
/*!****************************************!*\
  !*** ./src/graphql/resolvers/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolvers": () => (/* binding */ resolvers)
/* harmony export */ });
const resolvers = () => { };


/***/ }),

/***/ "./src/graphql/typeDefs.ts":
/*!*********************************!*\
  !*** ./src/graphql/typeDefs.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "typeDefs": () => (/* binding */ typeDefs)
/* harmony export */ });
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_scalars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-scalars */ "graphql-scalars");
/* harmony import */ var graphql_scalars__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_scalars__WEBPACK_IMPORTED_MODULE_1__);


const typeDefs = [
    ...graphql_scalars__WEBPACK_IMPORTED_MODULE_1__.typeDefs,
    apollo_server__WEBPACK_IMPORTED_MODULE_0__.gql `
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
      timeZone: TimeZone
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
      passenger: Passenger!
    }

    """
    The coordinates of a place on earth
    """
    type Point {
      latitude: Latitude
      longitude: Longitude
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
      legs: [Leg]
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
      allAirports: [Airport]
    }
  `,
];


/***/ }),

/***/ "@graphql-tools/schema":
/*!****************************************!*\
  !*** external "@graphql-tools/schema" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@graphql-tools/schema");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("apollo-server");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "graphql-scalars":
/*!**********************************!*\
  !*** external "graphql-scalars" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("graphql-scalars");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "server": () => (/* binding */ server)
/* harmony export */ });
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphql_apollo_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql/apollo/context */ "./src/graphql/apollo/context.ts");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphql_apollo_executableSchema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphql/apollo/executableSchema */ "./src/graphql/apollo/executableSchema.ts");




dotenv__WEBPACK_IMPORTED_MODULE_2___default().config();
const server = new apollo_server__WEBPACK_IMPORTED_MODULE_0__.ApolloServer({
    schema: _graphql_apollo_executableSchema__WEBPACK_IMPORTED_MODULE_3__.schema,
    context: _graphql_apollo_context__WEBPACK_IMPORTED_MODULE_1__.context,
    cors: { origin: true, credentials: true },
    introspection: "development" !== 'production',
});
void server.listen(process.env.PORT).then(() => {
    console.log(`🚀 Server ready at http://${process.env.HOST}:${process.env.PORT}`);
});
if (false) {}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map