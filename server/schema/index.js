const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// @axios
const axios = require("axios");

// some hardcoded data
/* **
const customers = [
    {
        id: '1',
        name: 'ELBEQQAL',
        email: 'keep@keep.com',
        age: 25
    },
    {
        id: '2',
        name: 'FATIMA',
        email: 'fatima@fatima.com',
        age: 22
    },
    {
        id: '3',
        name: 'KAMAL',
        email: 'kamal@kamal.com',
        age: 10
    },
];

// some hardcoded data
const cars = [
    {
        id: '1',
        name: 'HQL',
        model: 'BMW',
        age: 2
    },
    {
        id: '2',
        name: 'FAA',
        model: 'QST',
        age: 10
    },
    {
        id: '3',
        name: 'KAA',
        model: 'BGT',
        age: 5
    },
];
 */

// Customer type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  // type of each field in our Object
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// car type
const CareType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// @root query
const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // our fields
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        /*for(let i = 0; i < customers.length; i++){
                    if(customers[i].id === args.id){
                        return customers[i]
                    }
                }*/

        // get data with axios
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },

    car: {
      type: CareType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        /*for(let i = 0; i < cars.length; i++){
                    if(cars[i].id === args.id){
                        return cars[i]
                    }
                }*/
        // get data with axios
        return axios
          .get(`http://localhost:3000/cars/${args.id}`)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },

    customers: {
      type: new GraphQLList(CustomerType),
      resolve: (parent, args) => {
        /*return customers*/
        // return data using axios
        return axios
          .get("http://localhost:3000/customers")
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },

    cars: {
      type: new GraphQLList(CareType),
      resolve: (parent, args) => {
        /*return cars*/

        // return data using axios
        return axios
          .get("http://localhost:3000/cars")
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add customer
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: (parent,args) => {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        }).then(res => res.data)
        .catch(err => console.log(err));
      }
    },

    // edit customer
    editCustomer: {
         type: CustomerType,
         args: {
           id: {
             type: new GraphQLNonNull(GraphQLString)
           },
           name: {
             type: GraphQLString
           },
           email: {
             type: GraphQLString
           },
           age: {
             type: GraphQLInt
           }
         },
         resolve: (parent,args) => {
           return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
           .then(res => res.data)
           .catch(err => console.log(err));
         }
    },

    //delete customer
    deleteCustomer: {
      type: CustomerType,
      args: {
        id : {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (parent, args) => {
        return axios.delete(`http://localhost:3000/customers/${args.id}`)
        .then(res => res.data)
        .catch(err => console.log(err));
      }
    }
    
  }
}) 

module.exports = new GraphQLSchema({
  // ... root Query
  query: rootQuery,
  mutation
});
