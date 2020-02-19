const graphql = require('graphql');
const _ = require('lodash');
const Doctor = require('../models/doctor');
const Plan = require('../models/plan')

const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//     // For each insurance plan, the 'docId' must correspond to
//     // the 'id' of the doctor that takes that insurance.


// DoctorType sets up the schema for our provider. A model
// for what data the doctor carries. The types must be
// GraphQLString because... That's just how GraphQL
// works. shrug.
// GraphQLObjectType defines that it's an object.

// Wrapping the 'fields' in a function prevents the code from
// trying to execute, before the entirety of the file is
// run. 

const DoctorType = new GraphQLObjectType({
    name: 'Doctor',
    fields: () => ({
        id: { type: GraphQLString },
        doctorName: { type: GraphQLString },
        city: { type: GraphQLString },
        specialty: { type: GraphQLString },
        insuranceAccepted: {
            type: new GraphQLList(InsuranceType),
            resolve(parent, args) {
                // return _.filter(plans, { docId: [parent.id] })
                // return plans.filter(item =>  {
                //     console.log(item)
                //     return item.docId.some(docId => {
                //         console.log(docId, parent.id)
                //         return docId === parent.id
                //     })
                // })
                return Plan.find({ docId: parent.id })
            }
        }
    })
});

const InsuranceType = new GraphQLObjectType({
    name: 'Insurance',
    fields: () => ({
        id: { type: GraphQLID },
        insName: { type: GraphQLString },
        usualCoPay: { type: GraphQLString },
        doctorsAccepting: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                // return _.filter(doctors, { insId: [parent.id] })
            //     return doctors.filter(item => {
            //         console.log(item)
            //         return item.insId.some(insId => {
            //             console.log(insId, parent.id)
            //             return insId === parent.id
            //         })
            //     })
            return Doctor.find({ insId: parent.id })
            }
        }
    })
    // add a doctors field and filter through
});

// The root query defines how we will be querying the Dr.
// and insurance to get the object's data.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        doctor: {
            type: DoctorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // Code to get data from DB or other source
                // return _.find(doctors, { id: args.id });
                return Doctor.findById(args.id)
            }
        },
        insurance: {
            type: InsuranceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(insurance, { id: args.id });
                return Plan.findById(args.id)
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                // return doctors
                return Doctor.find({})
            }
        },
        plans: {
            type: new GraphQLList(InsuranceType),
            resolve(parent, args) {
                // return plans
                return Plan.find({})
            }
        }
    }
});


// Must find a way to add an array of 'docId's and 'insId's
// to their respective mutations.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDoctor: {
            type: DoctorType,
            args: {
                doctorName: { type: new GraphQLNonNull(GraphQLString) },
                city: { type: new GraphQLNonNull(GraphQLString) },
                specialty: { type: new GraphQLNonNull(GraphQLString) },
                insId: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args){
                let doctor = new Doctor({
                    _id: args._id
                    doctorName: args.doctorName,
                    city: args.city,
                    specialty: args.specialty,
                    insId: args.insId
                });
                return doctor.save();
            }
        },
        addPlan: {
            type: InsuranceType,
            args: {
                insName: { type: new GraphQLNonNull(GraphQLString) },
                usualCoPay: { type: new GraphQLNonNull(GraphQLString) },
                docId: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args){
                let plan = new Plan({
                    insName: args.insName,
                    usualCoPay: args.usualCoPay,
                    docId: args.docId
                });
                return plan.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});